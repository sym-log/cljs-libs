goog.provide('sym_log.cljs.threads');
goog.require('cljs.core');
/**
* takes two arguments: (1) a function to be performed by the worker when triggered, and (2) a callback function to be called by the parent thread when the worker returns a message.  This function returns a reference to a newly created worker thread.
* 
* EXAMPLE:
*/
sym_log.cljs.threads.create_worker = (function create_worker(task,callback){
sym_log.cljs.threads.worker = (new Worker(window.URL.createObjectURL((new Blob([[cljs.core.str("onmessage ="),cljs.core.str(task)].join('')])))));
sym_log.cljs.threads.worker.onmessage = callback;
return sym_log.cljs.threads.worker;
});
