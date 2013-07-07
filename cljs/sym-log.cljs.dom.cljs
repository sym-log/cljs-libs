(ns sym-log.cljs.dom
  (:require [goog.dom]
            [goog.events]
  ))

(def by-id goog.dom.getElement)
(def click (.-CLICK goog.events.EventType))
