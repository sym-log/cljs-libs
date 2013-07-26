goog.provide('symlog.cljs.fs');
goog.require('cljs.core');
goog.require('goog.events');
goog.require('goog.net.FileDownloader');
goog.provide('symlog.cljs.fs.fileFactory');

/**
* @constructor
*/
symlog.cljs.fs.fileFactory = (function (quota,evTarget){
this.quota = quota;
this.evTarget = evTarget;
})
symlog.cljs.fs.fileFactory.cljs$lang$type = true;
symlog.cljs.fs.fileFactory.cljs$lang$ctorStr = "symlog.cljs.fs/fileFactory";
symlog.cljs.fs.fileFactory.cljs$lang$ctorPrWriter = (function (this__2564__auto__,writer__2565__auto__,opt__2566__auto__){
return cljs.core._write.call(null,writer__2565__auto__,"symlog.cljs.fs/fileFactory");
});
symlog.cljs.fs.fileFactory.prototype.readFile = (function (fname){
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
symlog.cljs.fs.fileFactory.prototype.writeFile = (function (fname){
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
symlog.cljs.fs.__GT_fileFactory = (function __GT_fileFactory(quota,evTarget){
return (new symlog.cljs.fs.fileFactory(quota,evTarget));
});
