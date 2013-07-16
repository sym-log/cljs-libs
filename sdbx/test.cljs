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
          (sym-log.cljs.svg.svgTags->JSON
            (sym-log.cljs.svg.getSvgTags
             (sym-log.cljs.svg.sanitize-svg filestuff "optimized-inkscape")))))


  
-----------------------------------------------------------------------------------------------
;(. db query (fn [doc] (if (. doc -title) (js.emit (. doc -title) nil))))
;(. db replicateFrom "http://localhost:5984/testdb")
;(. db replicateTo "http://localhost:5984/testdb")

;pouchdb couchdb proof of concept



(set! (. mark -_id ) "test1") ;pouchdb requires "_id:" field for each document - not same as :id
(def db (sym-log.cljs.pdb.getPouchDB (goog.events.EventTarget.) "testdb"))
(. db put mark)
(. db get "test1")

(def mark1 (. db -response))
(set! (. mark1 -_id ) "instanceID")

(defn initSvgTemplate [ jsObj domContainer objPool ] 
  "this function used whenever a new svg object is created from a db template pool"

  (let [ id (sym-log.cljs.util.uniquify "svg")
         svgObj (js.eval (str objPool "." id  " = JSON.parse('"jsObj"');"))
         svgRoot (fetchSVGnode domContainer)  ] ))


(initSvgTemplate mark1 (goog.dom.getElement "containerDiv") "sym_log.cljs.objects")

(str objPool "." id  " = JSON.parse('"jsObj"');"))


    (set! (. svgObj -selected) false)
    (set! (. svgObj -xcord) 0)
    (set! (. svgObj -ycord) 0)
    (set! 
    
    (

    (.setAttribute domtag "id" id)

    (doseq [key (keys attributes) ]
      (.setAttribute domtag key (key attributes)))

    (.appendChild svgRoot domtag)
    (if (. jsObj -listeners) (sym-log.cljs.events.attach-listeners jsObj domtag))))



(goog.object.forEach mark1 (fn [val name JsObj] (js.console.log name " " val)))

(def mark2 (svgJsObj->domNode.))

(def mark3 (. mark2 object->node (goog.dom.getElement "containerDiv") mark1))


(set! (js.eval (str "sym_log.cljs.objects" "." (sym-log.cljs.util.uniquify "svg") " = {};")) mark1)

(set! (. sym-log.cljs.objects -svg_1) mark1)
