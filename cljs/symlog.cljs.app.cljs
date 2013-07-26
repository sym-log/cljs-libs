(ns symlog.cljs.app
  (:require [goog.ui.IdGenerator]
            [symlog.cljs.util])
           
  (:use [symlog.cljs.dom :only [by-id]]))

(def objectContainer "symlog.cljs.objects")

(defn init [json container]
  "takes a json string, possibly from a database call, and creates a unique object in
   symlog.cljs.objects according to attributes found within


  JSON string example:"

;(def tjson (symlog.cljs.util.clj->json
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
;             "listeners" {  "mousedown" "symlog.cljs.handlers.mousedown"
;                            "mouseup"   "symlog.cljs.handlers.mouseup"
;                           "mouseout"  "symlog.cljs.handlers.mouseout"
;                            "mousemove" "symlog.cljs.handlers.mousemove"}
;             }
; ))
;   envoke with:  (symlog.cljs.init tjson (symlog.cljs.dom.by-id "containerDiv"))

  
  (let [ jsObj (JSON.parse json) ]
    
    (cond (= (.toLowerCase (. jsObj -type)) "svg")
          (symlog.cljs.svg.initSVGnode
           (symlog.cljs.util.json->jsob json objectContainer (symlog.cljs.util.uniquify "svg"))
           container))))

