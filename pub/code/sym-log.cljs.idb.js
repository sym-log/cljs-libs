goog.provide('sym_log.cljs.idb');
goog.require('cljs.core');
goog.require('goog.events');
goog.require('goog.db');
sym_log.cljs.idb.IdbWrapper = (function IdbWrapper(){
var this$ = this;
this$.handle = null;
this$.store = null;
this$.open = sym_log.cljs.idb.open = (function open(dbName,dbVersion,evTarget){
return goog.db.openDatabase(dbName,dbVersion,(function (ev,db,tx){
return db.createObjectStore(dbName.concat(".objects"));
}),(function (ev){
return console.log("database blocked.  It might be open elsewhere");
})).addCallback((function (db){
if(cljs.core.not.call(null,db.getObjectStoreNames().contains(db.getName().concat(".objects"))))
{db.createObjectStore(db.getName().concat(".objects"));
} else
{}
this$.handle = db;
this$.store = db.getName().concat(".objects");
return evTarget.dispatchEvent("dbReady");
}));
});
});
