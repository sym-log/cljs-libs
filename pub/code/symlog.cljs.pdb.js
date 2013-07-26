goog.provide('symlog.cljs.pdb');
goog.require('cljs.core');
goog.inherits(symlog.cljs.pdb.pouchDB = (function pouchDB(dbName){
var this$ = this;
goog.events.EventTarget.call(this$);
Pouch.enableAllDbs = true;
this$.DB = (new Pouch(dbName));
this$.getAllDocs = (function (){
return this$.DB.allDocs({"include_docs":true},(function (err,resp){
this$.docList = resp;
return this$.dispatchEvent("docsReady");
}));
});
this$.getAttachment = (function (docId,attId){
return this$.DB.getAttachment(docId,attId,(function (err,resp){
this$.response = resp;
return this$.dispatchEvent("attachmentReady");
}));
});
this$.getResponse = (function (){
return this$.response;
});
this$.put = (function (id,jsObj){
return this$.DB.put({"_id":id,"object":jsObj},(function (err,resp){
return this$.dispatchEvent("putCompleted");
}));
});
this$.response__GT_text = (function (){
var fReader = (new FileReader());
fReader.onload = (function (evt){
this$.responseText = evt.target.result;
return this$.dispatchEvent("textReady");
});
return fReader.readAsText(this$.response);
});
this$.getDoc = (function (docId){
return this$.DB.get(docId,(function (err,doc){
this$.response = doc;
return this$.dispatchEvent("docReady");
}));
});
return this$;
}),goog.events.EventTarget);
