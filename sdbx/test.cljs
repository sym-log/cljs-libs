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
             (sym-log.cljs.svg.sanitize-svg filestuff "optimized-inkscape")))))


  
-----------------------------------------------------------------------------------------------
; pouchdb couchdb proof of concept

(set! (.-_id mark) "test")

(def db (sym-log.cljs.pdb.getPouchDB (goog.events.EventTarget.) "testdb"))
(. db put (js-obj "_id" "mydoc2" "title" "coney island"))

(def blind (js-obj "_id" "mydoc12" "title" "coney island" "#" (js-obj "mike" "black")))

(. db put mark)

(. db get "test")  
(. db query (fn [doc] (if (. doc -title) (js.emit (. doc -title) nil))))
(. db replicateFrom "http://localhost:5984/testdb")
(. db replicateTo "http://localhost:5984/testdb")

