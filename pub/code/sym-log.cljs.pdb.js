goog.provide('sym_log.cljs.pdb');
goog.require('cljs.core');
sym_log.cljs.pdb.getPouchDB = (function getPouchDB(evTarget,dbName){
var dB = (new sym_log.cljs.pdb.pouchDB(evTarget));
dB.open(dbName);
dB.dbName = dbName;
return dB;
});
goog.provide('sym_log.cljs.pdb.pouchDB');

/**
* @constructor
*/
sym_log.cljs.pdb.pouchDB = (function (evTarget){
this.evTarget = evTarget;
})
sym_log.cljs.pdb.pouchDB.cljs$lang$type = true;
sym_log.cljs.pdb.pouchDB.cljs$lang$ctorStr = "sym-log.cljs.pdb/pouchDB";
sym_log.cljs.pdb.pouchDB.cljs$lang$ctorPrWriter = (function (this__2558__auto__,writer__2559__auto__,opt__2560__auto__){
return cljs.core._write.call(null,writer__2559__auto__,"sym-log.cljs.pdb/pouchDB");
});
sym_log.cljs.pdb.pouchDB.prototype.listDBs = (function (){
var self__ = this;
var this$ = this;
return Pouch.allDbs.call(null,(function (err,response){
this$.dBlist = response;
}));
});
sym_log.cljs.pdb.pouchDB.prototype.open = (function (dbname){
var self__ = this;
var this$ = this;
this$.DB = (new Pouch(dbname));
return self__.evTarget.dispatchEvent("dataBaseReady");
});
sym_log.cljs.pdb.pouchDB.prototype.put = (function (doc){
var self__ = this;
var this$ = this;
return this$.DB.put.call(null,doc,(function (err,response){
this$.response = response;
return self__.evTarget.dispatchEvent("putSuccess");
}));
});
sym_log.cljs.pdb.pouchDB.prototype.get = (function (docid){
var self__ = this;
var this$ = this;
return this$.DB.get.call(null,docid,(function (err,response){
this$.response = response;
return self__.evTarget.dispatchEvent("getSuccess");
}));
});
sym_log.cljs.pdb.pouchDB.prototype.query = (function (vFunc){
var self__ = this;
var this$ = this;
return this$.DB.query.call(null,{"map":vFunc},{"reduce":false},(function (err,response){
this$.response = response;
return self__.evTarget.dispatchEvent("queryDone");
}));
});
sym_log.cljs.pdb.pouchDB.prototype.replicateTo = (function (toDB){
var self__ = this;
var this$ = this;
return Pouch.replicate(this$.dbName,toDB,(function (err,changes){
this$.response = changes;
}));
});
sym_log.cljs.pdb.pouchDB.prototype.replicateFrom = (function (fromDB){
var self__ = this;
var this$ = this;
return Pouch.replicate(fromDB,this$.dbName,(function (err,changes){
this$.response = changes;
}));
});
