goog.provide('sym_log.cljs.events');
goog.require('cljs.core');
goog.require('goog.events');
goog.require('sym_log.cljs.util');
sym_log.cljs.events.attach_listeners = (function attach_listeners(jsObj,domtag){
var listeners = cljs.core.js__GT_clj.call(null,jsObj.listeners);
var seq__3155 = cljs.core.seq.call(null,cljs.core.keys.call(null,listeners));
var chunk__3156 = null;
var count__3157 = 0;
var i__3158 = 0;
while(true){
if((i__3158 < count__3157))
{var key = cljs.core._nth.call(null,chunk__3156,i__3158);
sym_log.cljs.events.set_listener.call(null,jsObj,domtag,key,key.call(null,listeners));
{
var G__3159 = seq__3155;
var G__3160 = chunk__3156;
var G__3161 = count__3157;
var G__3162 = (i__3158 + 1);
seq__3155 = G__3159;
chunk__3156 = G__3160;
count__3157 = G__3161;
i__3158 = G__3162;
continue;
}
} else
{var temp__4092__auto__ = cljs.core.seq.call(null,seq__3155);
if(temp__4092__auto__)
{var seq__3155__$1 = temp__4092__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__3155__$1))
{var c__2749__auto__ = cljs.core.chunk_first.call(null,seq__3155__$1);
{
var G__3163 = cljs.core.chunk_rest.call(null,seq__3155__$1);
var G__3164 = c__2749__auto__;
var G__3165 = cljs.core.count.call(null,c__2749__auto__);
var G__3166 = 0;
seq__3155 = G__3163;
chunk__3156 = G__3164;
count__3157 = G__3165;
i__3158 = G__3166;
continue;
}
} else
{var key = cljs.core.first.call(null,seq__3155__$1);
sym_log.cljs.events.set_listener.call(null,jsObj,domtag,key,key.call(null,listeners));
{
var G__3167 = cljs.core.next.call(null,seq__3155__$1);
var G__3168 = null;
var G__3169 = 0;
var G__3170 = 0;
seq__3155 = G__3167;
chunk__3156 = G__3168;
count__3157 = G__3169;
i__3158 = G__3170;
continue;
}
}
} else
{return null;
}
}
break;
}
});
sym_log.cljs.events.set_listener = (function set_listener(jsObj,domtag,eType,handler){
return goog.events.listen(domtag,eType,eval(handler),false,jsObj);
});
