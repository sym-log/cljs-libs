(ns sym-log.cljs.pdb)

(defn getPouchDB [evTarget dbName] "constructor functin for pouchDB class"
  (let [ dB (pouchDB. evTarget) ]
    (.open dB dbName)
    (set! (. dB -dbName) dbName)
    dB))
  

(deftype pouchDB [evTarget ] Object
;  Example setup/usage:
;    (def db (getPouchDB (goog.events.EventTarget.) "testdb"))
;    (. db put (js-obj "_id" "mydoc" "title" "coney island"))
;    (. db get "mydoc")  
;    (. db query (fn [doc] (if (. doc -title) (js.emit (. doc -title) nil))))

         
         (listDBs [this] (Pouch.allDbs (fn [err response] (def this.dBlist response))))
         
         (open [ this dbname ] (do
                                 (def this.DB (js.Pouch. dbname))
                                 (. evTarget dispatchEvent "dataBaseReady")))
         
         (put [ this doc ] (this/DB.put doc
                             (fn [err response] ( do
                                                  (def this.response response)
                                                  (. evTarget dispatchEvent "putSuccess")))))
         (get [ this docid ] (this/DB.get docid
                              (fn [err response] (do 
                                                   (def this.response response)
                                                   (. evTarget dispatchEvent "getSuccess")))))

         
         (query [ this vFunc ]
             "vFunc in the format: (fn [doc] (if (. doc -title) (js.emit (. doc -title) nil)))"
           (this/DB.query (js-obj "map" vFunc) (js-obj "reduce" false)
                                (fn [err response] (do              
                                                     (def this.response response)
                                                     (. evTarget dispatchEvent "queryDone")))))

         (replicateTo [this toDB ] (js.Pouch.replicate (. this -dbName) toDB
                                     (fn [err changes] (def this.response changes))))

         (replicateFrom [this fromDB] (js.Pouch.replicate fromDB (. this -dbName)
                                   (fn [err changes] (def this.response changes))))

         )

