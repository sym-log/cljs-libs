(ns symlog.cljs.fs
  (:require [goog.net.FileDownloader]
            [goog.events :as events]
            ) )


(deftype fileFactory [quota evTarget ] Object

; EXAMPLE USAGE         
; (def mark (fileFactory. 5242880 (goog.events.EventTarget.)))
; (.readFile mark "drawing.svg")
; mark.fReader = file contents
;(.addCallback (goog.fs.FileReader.readAsText (.-fReader files)) (fn [txt] (def filestuff txt)))

         

     (readFile [this fname]
         (.addCallback (goog.fs.getTemporary quota)
              (fn [fs] (do (.addCallback
                             (.getFile (.getRoot fs) fname
                                       (. goog.fs.DirectoryEntry.Behavior -CREATE))
                             (fn [fl] (.addCallback (.file fl)
                                            (fn [fc] (do
                                                   (def this.fReader fc)
                                                   (.dispatchEvent evTarget "fReadReady"))))))))))
     (writeFile [ this fname ]
         (.addCallback (goog.fs.getTemporary quota)
              (fn [fs] (do (.addCallback
                             (.getFile (.getRoot fs) fname
                                       (. goog.fs.DirectoryEntry.Behavior -CREATE))
                             (fn [fl] (.addCallback ( .createWriter fl)
                                            (fn [fw] (do
                                                       (def this.fWriter fw)
                                                       (.dispatchEvent evTarget "fWriteReady"))))))))))
 )


