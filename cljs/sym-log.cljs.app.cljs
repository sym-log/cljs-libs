(ns sym-log.cljs.app
  (:require [goog.ui.IdGenerator]
            [sym-log.cljs.util])
           
  (:use [sym-log.cljs.dom :only [by-id]]))

(def objectContainer "sym-log.cljs.objects")

(defn init [json container]
  "takes a json string, possibly from a database call, and creates a unique object in
   sym-log.cljs.objects according to attributes found within


  JSON string example:"

;(def tjson (sym-log.cljs.util.clj->json
;            {"type" "svg" "form" "rect"
;             "attributes" {  "height" 100
;                             "width"  200
;                              "xoff"  -100
;                              "yoff"  -25
;                              "x"   "50%"
;                              "y"   "50%"
;                              "rx" 10
;                              "ry" 10
;                              "transform" " translate(-100, -25)" }
;             "listeners" {  "mousedown" "sym-log.cljs.handlers.mousedown"
;                            "mouseup"   "sym-log.cljs.handlers.mouseup"
;                           "mouseout"  "sym-log.cljs.handlers.mouseout"
;                            "mousemove" "sym-log.cljs.handlers.mousemove"}
;             }
; ))
;   envoke with:  (sym-log.cljs.init tjson (sym-log.cljs.dom.by-id "containerDiv"))

  
  (let [ jsObj (JSON.parse json) ]
    
    (cond (= (.toLowerCase (. jsObj -type)) "svg")
          (sym-log.cljs.svg.initSVGnode
           (sym-log.cljs.util.json->jsob json objectContainer (sym-log.cljs.util.uniquify "svg"))
           container))))

