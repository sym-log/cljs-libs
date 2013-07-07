goog.provide('sym_log.cljs.fs');
goog.require('cljs.core');
goog.require('goog.events');
goog.require('goog.net.FileDownloader');
goog.provide('sym_log.cljs.fs.fileFactory');

/**
* @constructor
*/
sym_log.cljs.fs.fileFactory = (function (quota,evTarget){
this.quota = quota;
this.evTarget = evTarget;
})
sym_log.cljs.fs.fileFactory.cljs$lang$type = true;
sym_log.cljs.fs.fileFactory.cljs$lang$ctorStr = "sym-log.cljs.fs/fileFactory";
sym_log.cljs.fs.fileFactory.cljs$lang$ctorPrWriter = (function (this__2558__auto__,writer__2559__auto__,opt__2560__auto__){
return cljs.core._write.call(null,writer__2559__auto__,"sym-log.cljs.fs/fileFactory");
});
sym_log.cljs.fs.fileFactory.prototype.readFile = (function (fname){
var self__ = this;
var this$ = this;
return goog.fs.getTemporary(self__.quota).addCallback((function (fs){
return fs.getRoot().getFile(fname,goog.fs.DirectoryEntry.Behavior.CREATE).addCallback((function (fl){
return fl.file().addCallback((function (fc){
this$.fReader = fc;
return self__.evTarget.dispatchEvent("fReadReady");
}));
}));
}));
});
sym_log.cljs.fs.fileFactory.prototype.writeFile = (function (fname){
var self__ = this;
var this$ = this;
return goog.fs.getTemporary(self__.quota).addCallback((function (fs){
return fs.getRoot().getFile(fname,goog.fs.DirectoryEntry.Behavior.CREATE).addCallback((function (fl){
return fl.createWriter().addCallback((function (fw){
this$.fWriter = fw;
return self__.evTarget.dispatchEvent("fWriteReady");
}));
}));
}));
});
