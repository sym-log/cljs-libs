(ns sym-log.cljs.threads)

(defn create-worker
  "takes two arguments: (1) a function to be performed by the worker when triggered, and (2) a callback function to be called by the parent thread when the worker returns a message.  This function returns a reference to a newly created worker thread.

EXAMPLE:"

;(defn worker-function [param] (js/postMessage "hello from worker"))

;(defn callback-function [event] (set! (.-innerHTML (goog.dom.getElement "div1") (.-data event))))


  
  [task callback]

  (do
    (def worker (js/Worker. (.createObjectURL window/URL (js/Blob. (array (str "onmessage =" task))))))
    (set! (.-onmessage worker) callback)
   
    ;return a reference to the worker to the calling environment
    worker
 ))

