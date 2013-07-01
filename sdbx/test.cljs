(ns test)

-----------------------------------------------------------------------------------------------
;proof of concept:  svg markup to JSON object
(def files (sym-log.cljs.fs.fileFactory. 5242880 (goog.events.EventTarget.)))
(.readFile files "drawing.svg")
(.addCallback (goog.fs.FileReader.readAsText (.-fReader files)) (fn [txt] (def filestuff txt)))
(def newstr (sym-log.cljs.svg.sanitize-svg filestuff "optimized-inkscape"))
(def mytags (sym-log.cljs.svg.getSvgTags newstr))
(def mark (sym-log.cljs.svg.svgTags->JSONstr mytags))
(def mark2 (JSON.parse mark))

  
      
-----------------------------------------------------------------------------------------------
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
