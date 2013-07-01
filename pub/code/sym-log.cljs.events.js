goog.provide('sym_log.cljs.events');
goog.require('cljs.core');
goog.require('goog.events');
goog.require('sym_log.cljs.util');
sym_log.cljs.events.attach_listeners = (function attach_listeners(jsObj,domtag){
var listeners = cljs.core.js__GT_clj.call(null,jsObj.listeners);
var seq__3184 = cljs.core.seq.call(null,cljs.core.keys.call(null,listeners));
var chunk__3185 = null;
var count__3186 = 0;
var i__3187 = 0;
while(true){
if((i__3187 < count__3186))
{var key = cljs.core._nth.call(null,chunk__3185,i__3187);
sym_log.cljs.events.set_listener.call(null,jsObj,domtag,key,key.call(null,listeners));
{
var G__3188 = seq__3184;
var G__3189 = chunk__3185;
var G__3190 = count__3186;
var G__3191 = (i__3187 + 1);
seq__3184 = G__3188;
chunk__3185 = G__3189;
count__3186 = G__3190;
i__3187 = G__3191;
continue;
}
} else
{var temp__4092__auto__ = cljs.core.seq.call(null,seq__3184);
if(temp__4092__auto__)
{var seq__3184__$1 = temp__4092__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__3184__$1))
{var c__2749__auto__ = cljs.core.chunk_first.call(null,seq__3184__$1);
{
var G__3192 = cljs.core.chunk_rest.call(null,seq__3184__$1);
var G__3193 = c__2749__auto__;
var G__3194 = cljs.core.count.call(null,c__2749__auto__);
var G__3195 = 0;
seq__3184 = G__3192;
chunk__3185 = G__3193;
count__3186 = G__3194;
i__3187 = G__3195;
continue;
}
} else
{var key = cljs.core.first.call(null,seq__3184__$1);
sym_log.cljs.events.set_listener.call(null,jsObj,domtag,key,key.call(null,listeners));
{
var G__3196 = cljs.core.next.call(null,seq__3184__$1);
var G__3197 = null;
var G__3198 = 0;
var G__3199 = 0;
seq__3184 = G__3196;
chunk__3185 = G__3197;
count__3186 = G__3198;
i__3187 = G__3199;
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
