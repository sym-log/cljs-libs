(ns test)


(:require [goog.structs.Map :as Map]
            [goog.structs :as gs]))

(def m (gs/Map. "foo" 10 "bar" 20))

(extend-type gs/Map cljs.core.ILookup
             (-lookup [this key]
               (.get this (name key))))

(get m "foo")


-----------------------------------------------------------------------------------------------
;proof of concept:  svg markup to JSON object

;getting an svg attachment from a remote couchdb

;draw down raw svg blob from remote db and convert to text string
(def mark (symlog.cljs.pdb.pouchDB. "http://localhost:5984/testdb"))
(goog.events.listenOnce mark "attachReady" (fn [evt] (js.console.log "hello")))
(goog.events.listenOnce mark "textReady" (fn [evt] (js.console.log "hello")))
(. mark getAttachment "svg1" "drawing.svg")
(. mark response->text)

;sanity check - convert remote db svg to JS object
(def mark2
        (JSON.parse 
          (symlog.cljs.svg.svgTags->JSON
            (symlog.cljs.svg.getSvgTags
             (symlog.cljs.svg.sanitize-svg (. mark -responseText) "optimized-inkscape")))))

;alternative sanity check - convert to JSON string
(def mark3
          (symlog.cljs.svg.svgTags->JSON
            (symlog.cljs.svg.getSvgTags
             (symlog.cljs.svg.sanitize-svg (. mark -responseText) "optimized-inkscape"))))


;create/fetch local db
(def mark4 (symlog.cljs.pdb.pouchDB. "testdb"))
;save js object and json string to local db
(.put mark4 "test1" mark3)
(.put mark4 "test2" mark2)

;save JS object and JSON string to back to remote db 
(.put mark "test1" mark3)
(.put mark "test2" mark2)

;get js object from local db
(.getDoc mark4 "test2")



(symlog.cljs.svg.initSVGobject (. (. mark4 -response) -object) (goog.dom.getElement "svgRoot") symlog.cljs.objects)
 




------------------------------------------------------------------------------------------

;(. db query (fn [doc] (if (. doc -title) (js.emit (. doc -title) nil))))
;(. db replicateFrom "http://localhost:5984/testdb")
;(. db replicateTo "http://localhost:5984/testdb")
;pouchdb couchdb proof of concept






(symlog.cljs.svg.initSVGnode "containerDiv" anobj)





(def mike (svgJsObj->domNode.))
(def mike2 (. mike object->node (goog.dom.getElement "containerDiv") dbdoc))


(.appendChild (goog.dom.getElement "containerDiv") mike2)

                            


(defn initSvgObject [ jsObj domContainer objPool ] 
  "this function used whenever a new svg object is created from a db template pool"
  (aset objPool (symlog.cljs.util.uniqify "svg") jsObj)
  (

  
  (let [ id (symlog.cljs.util.uniqify "svg")
         svgObj (js.eval (str objPool "." id  " = JSON.parse('"jsObj"');"))
        svgRoot (fetchSVGnode domContainer)  ] ))



(aset symlog.cljs.objects (symlog.cljs.util.uniqify "svg") dbdoc)

(aset symlog.cljs.objects temp "hello")
(def id (symlog.cljs.util.uniqify "svg"))
(def objPool "sym_log.cljs.objects")
(def jsObj dbdoc)
(def temp "testjh")
(symbol temp)
(def my-atom (atom  
(def symlog.cljs.objects.test1 "testing")
(def (symbol temp) "hello")
(set! (symlog.cjs.objects/test) temp)
(def mark2 (js.eval (str objPool "." id  " = JSON.parse('"jsObj"');"))

  (initSvgTemplate dbdoc (goog.dom.getElement "containerDiv") "sym_log.cljs.objects")

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
    (if (. jsObj -listeners) (symlog.cljs.events.attach-listeners jsObj domtag))))



(goog.object.forEach mark1 (fn [val name JsObj] (js.console.log name " " val)))

(def mark2 (svgJsObj->domNode.))

(def mark3 (. mark2 object->node (goog.dom.getElement "containerDiv") mark1))


(set! (js.eval (str "sym_log.cljs.objects" "." (symlog.cljs.util.uniquify "svg") " = {};")) mark1)

(set! (. symlog.cljs.objects -svg_1) mark1)
