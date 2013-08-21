(ns symlog.cljs.svg
  (:require [goog.ui.IdGenerator]
            [goog.events]
            [symlog.cljs.util]
            [symlog.cljs.events]

 ) )


;EXAMPLE OF USING FUNCTIONS IN THIS SECTION
;(def mark2
;        (JSON.parse
;         (svgTagGroup->JSONstring 
;           (symlog.cljs.svg.getSvgTags
;             (symlog.cljs.svg.sanitize-svg (. mark -responseText) "optimized-inkscape")))))


(defn initSVGobject [ jsObj svgContainer objPool ] 
  "this function used whenever a new svg object is to be created from a db template pool"
  (let [ sfx (symlog.cljs.util.uniqify "svg")
         id (str (. objPool -name) "." sfx)
         obj (aset objPool sfx jsObj)
         svgTag  (.object->node (symlog.cljs.svg.svgJsObj->domNode.) nil jsObj) ]

    (set! (.-id obj) id)
    (set! (.-x (.-attributes obj)) 0)
    (set! (.-y (.-attributes obj)) 0)
    (.setAttribute svgTag "x" 0)
    (.setAttribute svgTag "y" 0)
    (.setAttribute svgTag "id" id)
    
    (.appendChild svgContainer svgTag)
    ))


(deftype svgJsObj->domNode [] Object
         
  (object->node [this container jsObj ]
      ( let [ keys (goog.object.getKeys jsObj)
              tag  (goog.global.document.createElementNS
                    "http://www.w3.org/2000/svg" (. jsObj -name)) ]

        (goog.object.forEach jsObj (fn [ val name jsObj ]
          (cond
                                      
           (goog.string.contains  name "attributes")
            (goog.object.forEach (. jsObj -attributes)
               (fn [val name jsObj] (.setAttribute tag name val)))
            
           (goog.string.contains name "_id")
              (.setAttribute tag "id" val)

           (goog.string.contains name "Δ") 
              (.appendChild tag (.object->node this tag val))
           
   ))) tag))
 )

(defn sanitize-svg [ filestr input-type  ]

  (if (= input-type "optimized-inkscape")
    (let [ cleanStr (goog.string.removeAll ; remove all internal quotes
                (.replace ; remove spaces between tags
                   (goog.string.collapseWhitespace ;ensure no two spaces in a row
                     (goog.string.collapseBreakingSpaces ;remove redundant tabs and spaces
                      (goog.string.trim ; remove space at beginning and end
                       (goog.string.stripQuotes ;remove redundent quotes beginning and
                        (goog.string.stripNewlines filestr)
                        (str "\"")))))
                   (js.RegExp "> <" "g") "><")
                "\"")      ]
      (goog.string.buildString  "<svg overflow=visible>" ; stating an attribute for the leadin svg tag ensures it will have an attributes object in JSON, and this will be useful later
            (.slice cleanStr (+ (.search cleanStr "</metadata>") 11) (.-length cleanStr)))
 )))


(defn getSvgTags [strng]
  "make to work on a sanitized SVG file string --use sanitize-svg first
   returns a javascript array of tags"
  
  (let [index (atom 0)  end (.-length strng) target (array) ]
    (loop [char (aget strng @index)]
      (when (> end @index)
        (if (= char "<")
          (goog.array.extend target
            (.substring strng @index (+ (reset! index
              (.indexOf strng ">" @index))1))))
        (recur (aget strng (swap! index + 1)))))
    target))


(defn svgTagType? [tag]
  "make to work on the output of getSvgTags"
  
  (cond
   (= (aget tag 1) "/") "closingTag"

   (and
    (> (.-length tag) 4)
    (= (aget tag (-(.-length tag)2)) "/"))
    "closedTag"

   (and
    (=(aget tag 0) "<")
    (=(aget tag (-(.-length tag)1)) ">"))
   "openTag"

   :else nil

   ))


(defn svgTagGroup->JSONstring [tagArray]
  "takes an array of svgTags (produce with getSvgTags and returns a JSON string"
  
  (let [ index (atom 0)
         eoa (-(.-length tagArray)1)
         JSON (atom (str))
         level (atom 0)
         levelMx (array) ]
  
    (loop [tagStr (aget tagArray @index)]
      (when (>= eoa @index)
        (cond
         
         (= "openTag" (svgTagType? tagStr))
           (do
             (if-not (aget levelMx @level) (aset levelMx @level (array)))
             (let [prefix
                   (if (= 0 (.-length (aget levelMx @level))) (do (aset levelMx @level 0 "\"Δ\":") )
                      (do (aset levelMx @level (.-length (aget levelMx @level))
                        (str "\"" (goog.string.repeat "Δ" (+(.-length (aget levelMx @level))1)) "\":"))
                       (aget levelMx @level (-(.-length (aget levelMx @level)) 1))))     ]

              (if (= 0 @level)
                 (swap! JSON str (svgTag->JSON tagStr))
                 (swap! JSON str "," prefix (svgTag->JSON tagStr)))
               )
             (swap! level inc)
           )

        (= "closedTag" (svgTagType? tagStr))
          (do
             (if-not (aget levelMx @level) (aset levelMx @level (array)))
             (let [prefix
                      (if (= 0 (.-length (aget levelMx @level)))
                       (do (aset levelMx @level 0 "\"Δ\":"))
                       (do (aset levelMx @level (.-length (aget levelMx @level))
                        (str "\"" (goog.string.repeat "Δ" (+(.-length (aget levelMx @level))1)) "\":"))
                            (aget levelMx @level (-(.-length (aget levelMx @level)) 1))))    ]

               (if (= 0 @level)
                 (swap! JSON str (svgTag->JSON tagStr))
                 (swap! JSON str "," prefix (svgTag->JSON tagStr)))
            ))

        (= "closingTag" (svgTagType? tagStr))
            (do    
                (swap! JSON str "}")
                (swap! level dec))
             
        ) ; end cond
       (recur (aget tagArray (swap! index inc)))
      ) ; end when
    ) ; end loop
   @JSON ) ; end let
 ) ; end func

(defn svgTag->JSON [tagStr]
  "a helper function for svgTags->JSON"
  
  (let
      [idx (atom 1) 
       eos (if (= -1 (.indexOf tagStr "/")) (- (.indexOf tagStr ">") 1)
               (- (.indexOf tagStr "/") 1))
       elStr (atom (str))
       markers (array " " "/" ">")
       tagType (svgTagType? tagStr)  ] 

       (reset! elStr (str "{\"name\":\"" (.substring tagStr @idx
               (.indexOf tagStr (symlog.cljs.string.fetch-first-in-string tagStr markers @idx) @idx))
                    "\"" (if-not (= -1 (.indexOf tagStr " " (inc @idx))) ",\"attributes\":{")))
       
       (reset! idx (+ 1 (.indexOf tagStr " " )))
       (if (= 0 @idx) nil;
        (loop [strng (.substring
                    tagStr @idx
                   (.indexOf tagStr (symlog.cljs.string.fetch-first-in-string tagStr markers (inc @idx)) @idx))
              ]

          (when (> eos @idx) 
            (swap! elStr str "\"" (.replace strng "=" "\":\"") "\",")
            (if-not (= -1 (.indexOf tagStr " " (inc @idx)))
              (reset! idx (+ 1 (.indexOf tagStr " " (inc @idx))))
              (swap! idx + eos))
            (recur (.substring
                    tagStr @idx
                    (.indexOf tagStr (symlog.cljs.string.fetch-first-in-string tagStr markers (inc @idx)) @idx))))))
    
       ( cond
        (= tagType "closedTag") 
          (if (> (.search @elStr "\"attributes\":") 0)
           (str (.substring @elStr 0 (-(.-length @elStr)1)) "}}")
           (str (.substring @elStr 0 (-(.-length @elStr)1))) "}")

          (= tagType "openTag")
          (if (> (.search @elStr "\"attributes\":") 0)
               (str (.substring @elStr 0 (-(.-length @elStr)1)) "}")
               (str (.substring @elStr 0 (-(.-length @elStr)1)) "\""))

          
        (= tagType "closingTag")
        (str "}")
        )))

