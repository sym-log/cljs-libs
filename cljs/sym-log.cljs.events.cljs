(ns sym-log.cljs.events
  (:require [sym-log.cljs.util]
            [goog.events] ))

(defn attach-listeners [jsObj domtag ]
  (let [ listeners (js->clj (. jsObj -listeners))  ]
    (doseq [key (keys listeners) ]
      (set-listener jsObj domtag key (key listeners)))))

(defn set-listener [jsObj domtag eType handler]
  (goog.events.listen  domtag eType (js.eval handler) false jsObj))
   



