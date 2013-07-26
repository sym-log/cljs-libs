(ns symlog.cljs.idb
  (:require [goog.db :as db]
            [goog.events :as events]
            ) )

(defn IdbWrapper []
  
  "This is a constructor function, it returns:

     1) a method open which takes the following parameters:
          a) a <string> name for the database to be opened or created if needed
          b) an <integer> version number for the database (if the version is greater than the
             current, then the on-upgrade-needed function, below, will be called
          c) an instance of goog.events.EventTarget to receive the 'dbReady' message
             when the database and a handle for it are created and ready for use
     2) a field 'handle', which will hold a reference to the database after the open-create
        call has completed succesfully" 
     
  (this-as this
      (def this.handle nil)
      (def this.store nil)     
      (def this.open (defn open [dbName dbVersion evTarget]
                              
                 "This function definition maps a name space definition to an variable in the
                  instantiated object

                  The function takes three parameters:
                     1) <string> dbName
                     2) <integer> dbVersion (if version is greater than existed, on-upgrade will fire)
                     3) <instance of goog.event.EventTarget> evTarget which is the event listener to
                        advise with 'dbReady'

                  the function opens or creates a database, if needed, then creates an
                  objectstore in the database, if needed, of the name '<dbname>.objects'

                  Lastly, the function defined a 'handle' to be used to access the database object and
                  dispatches an event to the event target advising the database is ready to go"
                 
        (.addCallback
          (db/openDatabase
                  dbName
                  dbVersion
                  (fn [ev db tx]
                    (.createObjectStore db (.concat dbName ".objects")))
                  (fn [ev]
                    (js.console.log "database blocked.  It might be open elsewhere")))
         (fn [db] (do
                    (if-not (.contains (.getObjectStoreNames db) (.concat (.getName db) ".objects"))
                      (.createObjectStore db (.concat (.getName db) ".objects"))) 
                    (def this.handle db)
                    (def this.store (.concat (.getName db) ".objects"))
                    (.dispatchEvent evTarget "dbReady"))))))
  ))


