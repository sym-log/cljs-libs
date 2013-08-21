(ns symlog.cljs.util
  (:require [goog.ui.IdGenerator]
            [goog.fx.Dragger])
           
  (:use [symlog.cljs.dom :only [by-id listen]]))


(defn function? [testobj]
  (if (=(type testobj)(type js/Function)) true false))

(defn clj->json
  "Returns a  JSON string from the given
   ClojureScript data."
  [data]
  (JSON/stringify (clj->js data)))

(defn json->clj
  "Returns ClojureScript data for the given JSON string."
  [line]
  (js->clj (JSON/parse line)))

(defn uniqify [prefix]
  "for a given name  previx <string> will assign a unique number to the end"
  (str prefix "_" (goog.string.removeAll (.getNextUniqueId (goog.ui.IdGenerator.getInstance)) ":")))


(defn json->jsob [json targetNS objName ]
  "example usage:;
;         (json->jsob json symlog.cljs.objects (uniquify svg))
    where json is a serialized json object, pontiff.objects is a ready namespace/jsobject
    (uniqify svg) produces a unique name for the object on a given prefix, e.g. svg01

    the object will be instantiated in the pontiff.objects namespace with its given id that
    also can be found at pontiff.objects.svg01.id"       

 (let
     [ jsObj (js.eval (str
                       (str targetNS "." objName " = JSON.parse('"json"');"))) ]
   (set! (. jsObj -id) (str targetNS "." objName))
   
   jsObj))

