(ns symlog.cljs.svg
  (:require [goog.ui.IdGenerator]
            [goog.events]
            [symlog.cljs.util]
            [symlog.cljs.events]

            )
  )

(defn fetchSVGnode [container]
     "takes a reference to a specific dom element, e.g. returned by get getElementById"

     " creates an SVG element in the given container (div,) if one does not already
       exist, with id  <container.id>.svgRoot

       returns a dom reference to said svg element"
  
     (let [svgRoot (or
                    (goog.dom.getElement (str (.-id container) ".svgRoot"))
                    (goog.global.document.createElementNS "http://www.w3.org/2000/svg" "svg")) ]
       (if (not (= (str (.-id container) ".svgRoot") (.-id svgRoot)))
         (do
           (.setAttribute svgRoot "id" (str (.-id container) ".svgRoot"))
           (goog.dom.appendChild container svgRoot)))
       svgRoot
       )
)      


(defn initSVGobject [ jsObj svgContainer objPool ] 
  "this function used whenever a new svg object is to be created from a db template pool"
  (let [ sfx (symlog.cljs.util.uniqify "svg")
         svgTag  (goog.global.document.createElementNS "http://www.w3.org/2000/svg" "svg")
        id (str (. objPool -name) "." sfx) ]
    (aset objPool sfx jsObj)
    (.setAttribute svgTag "id" id)
    (.setAttribute svgTag "overflow" "visible")
    (.appendChild svgTag (.object->node (svgJsObj->domNode.) nil jsObj))
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

  "this function takes a file string and an input type.  The only accepted input time, at this
   time, is optimized-inkscape.  Other types will be added when needed.

   The optimized inkscape file is a file saved to optimized-svg in inkscape.

   This function returns a sanitized file string that is ready for parsing.  the central feature of
   this sanitized string is that the only white spaces are spaces (not tabs, newlines, etc), that there
   are never two spaces in a row, and the ONLY time a white space will be found is between a tag name
   and a tag element, if there is one, and between any two tag elements, if there are such.

   Example output:

<g stroke-dasharray=none stroke-miterlimit=4><g><path opacity=0.27631579 d=m380.51247,442.48566a54.719715,55.140636,0,1,1,-109.43943,0,54.719715,55.140636,0,1,1,109.43943,0z stroke-width=3.20000005 fill=#F0F/><rect opacity=0.27631579 height=105.23022 width=96.811806 y=362.93161 x=343.47144 stroke-width=3.20000005 fill=#0FF/></g><g><path opacity=0.27631579 d=m463.85482,586.01971a53.03603,50.510506,0,1,1,-106.07206,0,53.03603,50.510506,0,1,1,106.07206,0z stroke-width=3.20000005 fill=#0FF/><rect opacity=0.27631579 height=87.551544 width=117.85785 y=500.99365 x=298.01199 stroke-width=3.20000005 fill=#F0F/></g></g>"



  (if (= input-type "optimized-inkscape")
    (let [ cleanStr (goog.string.removeAll ; remove all internal quotes
                      (goog.string.remove ; remove the </svg> tag at the very end
                        (.replace ; remove spaces between tags
                          (goog.string.collapseWhitespace ;ensure no two spaces in a row
                            (goog.string.collapseBreakingSpaces ;remove redundant tabs and spaces
                             (goog.string.trim ; remove space at beginning and end
                               (goog.string.stripQuotes ;remove redundent quotes at beginning and end
                                 (goog.string.stripNewlines filestr)
                               (str "\"")))))
                      (js.RegExp "> <" "g") "><") "</svg>") "\"")       ]
    (.slice cleanStr (+ (.search cleanStr "</metadata>") 11) (.-length cleanStr))))
  )


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
  )
)


(defn svgTags->JSON [tagArray]
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


;(defn svgTagName? [tagStr]
;  (cond (= "closeTag" (tagType? tagStr))
;        (.substring tagStr 2 (.indexOf tagStr ">"))
;
;        :else
;        (if (= -1 (.indexOf tagStr " "))
;          (.substring tagStr 1 (.indexOf tagStr ">"))
;          (.substring tagStr 1 (.indexOf tagStr " ")))
;  ))      

