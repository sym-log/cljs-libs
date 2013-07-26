(ns symlog.cljs.pdb)

(goog.inherits (defn pouchDB [dbName]
 " for local access, dbName = local name, for remote access, dbName = http://..."
                 
;EXAMPLE USAGE                 
;(let [ db (symlog.cljls.pdb/pouchDB. "testdb") ]
;    (goog.events.listenOnce db "docReady"
;          (fn [evt] (let [ nNode (goog.dom.createElement "img")
;                         blob (. (. evt -target)-response) ]
;                         (set! (. nNode -src) (goog.global.URL.createObjectURL blob))
;                           (.appendChild (goog.dom.getElement "logoDiv") nNode))))
;    (. db getAttachment "otherdoc2/ablob"))

                
 (this-as this
    (goog.events.EventTarget.call this)
          
    (set! (. js.Pouch -enableAllDbs) true)
    
    (set! (. this -DB) (js.Pouch. dbName))

    (set! (. this -getAllDocs)
          (fn [] (. (. this -DB) allDocs (js-obj "include_docs" true)
                    (fn [err resp] (do
                                     (set! (. this -docList) resp)
                                     (. this dispatchEvent "docsReady"))))))
    
    (set! (. this -getAttachment)
          (fn [ docId attId ] (. (. this -DB) getAttachment docId attId
                         (fn [err resp] (do
                                          (set! (. this -response) resp)
                                          (. this dispatchEvent "attachmentReady"))))))

    (set! (. this -getResponse) (fn [] (. this -response)))

    (set! (. this -put) (fn [ id jsObj ] (. (. this -DB)
                                            put (js-obj "_id" id "object" jsObj)
                                            (fn [ err resp ]
                                              (. this dispatchEvent "putCompleted")))))
                                              
    (set! (. this -response->text) (fn []
                                  (let [ fReader (js.FileReader.) ]
                                    (set! (. fReader -onload)
                                          (fn [evt] (do
                                                      (set! (. this -responseText) (. (. evt -target) -result))
                                                      (. this dispatchEvent "textReady"))))
                                    (. fReader readAsText (. this -response)))))

    (set! (. this -getDoc) (fn [docId] (. (. this -DB) get docId
                                          (fn [err doc] ( do
                                                          (set! (. this -response) doc)
                                                          (. this dispatchEvent "docReady"))))))
                                            
                                                         
                                          
    this))

  goog.events.EventTarget)

