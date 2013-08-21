(ns test)

(:require [goog.structs.Map :as Map]
            [goog.structs :as gs]))

(def m (gs/Map. "foo" 10 "bar" 20))

(extend-type gs/Map cljs.core.ILookup
             (-lookup [this key]
               (.get this (name key))))

(get m "foo")
-----------------------------------------------------------------------------------------

(def mike ^{:a 1 :b 2} (fn [name] (str "hello" name)))

(meta mike)
-----------------------------------------------------------------------------------------------
;proof of concept:  svg markup to JSON object

;getting an svg attachment from a remote couchdb

;draw down raw svg blob from remote db and convert to text string
(def mark (symlog.cljs.pdb.pouchDB. "http://localhost:5984/testdb"))
(goog.events.listenOnce mark "attachReady" (fn [evt] (js.console.log "hello")))
(goog.events.listenOnce mark "textReady" (fn [evt] (js.console.log "hello")))
(. mark getAttachment "svg2" "drawing.svg")
(. mark response->text)

;sanity check - convert remote db svg to JS object
(def mark2
        (JSON.parse
         (symlog.cljs.svg.svgTagGroup->JSONstring 
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
(.put mark4 "test9" mark3)
(.put mark4 "test11" mark2)

;save JS object and JSON string to back to remote db 
(.put mark "test1" mark3)
(.put mark "test3" mark2)


;get js object from local db
(.getDoc mark4 "test11")


(symlog.cljs.svg.initSVGobject (. (. mark4 -response) -object) (goog.dom.getElement "svgRoot") symlog.cljs.objects)



--------------------------------------------------------------------------------------


(goog.events.listen (goog.dom.getElement "symlog.cljs.objects.svg_0")
                    goog.events.EventType.MOUSEDOWN
                    symlog.cljs.handlers.mousedown
                    true
                    symlog.cljs.objects.svg_0)

(goog.events.listen (goog.dom.getElement "symlog.cljs.objects.svg_0")
                    goog.events.EventType.MOUSEMOVE
                    symlog.cljs.handlers.mousemove
                    true
                    symlog.cljs.objects.svg_0)

(goog.events.listen (goog.dom.getElement "symlog.cljs.objects.svg_0")
                    goog.events.EventType.MOUSEUP
                    symlog.cljs.handlers.mouseup
                    true
                    symlog.cljs.objects.svg_0)

(goog.events.listen (goog.dom.getElement "symlog.cljs.objects.svg_0")
                    goog.events.EventType.MOUSEOUT
                    symlog.cljs.handlers.mouseout
                    true
                    symlog.cljs.objects.svg_0)


--------------------------------------------------------------------------------------


