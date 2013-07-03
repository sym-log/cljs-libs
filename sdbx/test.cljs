(ns test
  (:require [goog.structs.Map :as Map]
            [goog.structs :as gs]))

(def m (gs/Map. "foo" 10 "bar" 20))

(extend-type gs/Map cljs.core.ILookup
             (-lookup [this key]
               (.get this (name key))))

(get m "foo")


-----------------------------------------------------------------------------------------------
;proof of concept:  svg markup to JSON object
(def files (sym-log.cljs.fs.fileFactory. 5242880 (goog.events.EventTarget.)))
(.readFile files "drawing.svg")
(.addCallback (goog.fs.FileReader.readAsText (.-fReader files)) (fn [txt] (def filestuff txt)))

      (def mark
        (JSON.parse 
          (sym-log.cljs.svg.svgTags->JSONstr
            (sym-log.cljs.svg.getSvgTags
             (sym-log.cljs.svg.sanitize-svg filestuff "optimized-inkscape"))))

(def mark2 (JSON.parse mark))

  
-----------------------------------------------------------------------------------------------
(def qlj (gs/Map. mark2))

 (json->jsob json sym-log.cljs.objects (uniquify svg))
(sym-log.cljs.util.json->jsob mark

(defn initSVGnode [ jsObj container ] 

  (let [svgRoot (fetchSVGnode container)
        domtag  (goog.global.document.createElementNS "http://www.w3.org/2000/svg" (. jsObj -form) )
        id (. jsObj -id)
        attributes (js->clj (. jsObj -attributes))  ]

    (set! (. jsObj -selected) false)
    (set! (. jsObj -xcord) 0)
    (set! (. jsObj -ycord) 0)

    (.setAttribute domtag "id" id)

    (doseq [key (keys attributes) ]
      (.setAttribute domtag key (key attributes)))

    (.appendChild svgRoot domtag)
    (if (. jsObj -listeners) (sym-log.cljs.events.attach-listeners jsObj domtag))))



------------------------------------------------------------------------------
;pouchdb couchdb proof of concept
(def dbl (js.Pouch "testdb"))
(def dbr (js.Pouch "http://localhost:5984/testdb"))

(defn fpub [func]
  (str "(test.vla.newfun = " (.toString func) ")"))

 (def vla (js-obj
           "name" "vla"
           "_id" "testdoc10"
           "_rev" "5-f5bf71046d456b85c6b7e1592ed5e746"
           "method" (fpub testfun)
           "init" ))

(.put dbl
      (js-obj
       "_id" "testdoc10"
       "_rev" "5-f5bf71046d456b85c6b7e1592ed5e746"}
       "title" "old"
       "method" "last"
      (fn [err resp] (def response resp)))

(.get dbl "testdoc10" (fn [err resp] (def response resp)))

(js.Pouch.replicate "http://localhost:5984/testdb" "testdb")
