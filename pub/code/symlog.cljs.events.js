goog.provide('symlog.cljs.events');
goog.require('cljs.core');
goog.require('goog.events');
goog.require('symlog.cljs.util');
symlog.cljs.events.attach_listeners = (function attach_listeners(jsObj,domtag){
var listeners = cljs.core.js__GT_clj.call(null,jsObj.listeners);
var seq__5602 = cljs.core.seq.call(null,cljs.core.keys.call(null,listeners));
var chunk__5603 = null;
var count__5604 = 0;
var i__5605 = 0;
while(true){
if((i__5605 < count__5604))
{var key = cljs.core._nth.call(null,chunk__5603,i__5605);
symlog.cljs.events.set_listener.call(null,jsObj,domtag,key,key.call(null,listeners));
{
var G__5606 = seq__5602;
var G__5607 = chunk__5603;
var G__5608 = count__5604;
var G__5609 = (i__5605 + 1);
seq__5602 = G__5606;
chunk__5603 = G__5607;
count__5604 = G__5608;
i__5605 = G__5609;
continue;
}
} else
{var temp__4092__auto__ = cljs.core.seq.call(null,seq__5602);
if(temp__4092__auto__)
{var seq__5602__$1 = temp__4092__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__5602__$1))
{var c__2754__auto__ = cljs.core.chunk_first.call(null,seq__5602__$1);
{
var G__5610 = cljs.core.chunk_rest.call(null,seq__5602__$1);
var G__5611 = c__2754__auto__;
var G__5612 = cljs.core.count.call(null,c__2754__auto__);
var G__5613 = 0;
seq__5602 = G__5610;
chunk__5603 = G__5611;
count__5604 = G__5612;
i__5605 = G__5613;
continue;
}
} else
{var key = cljs.core.first.call(null,seq__5602__$1);
symlog.cljs.events.set_listener.call(null,jsObj,domtag,key,key.call(null,listeners));
{
var G__5614 = cljs.core.next.call(null,seq__5602__$1);
var G__5615 = null;
var G__5616 = 0;
var G__5617 = 0;
seq__5602 = G__5614;
chunk__5603 = G__5615;
count__5604 = G__5616;
i__5605 = G__5617;
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
symlog.cljs.events.set_listener = (function set_listener(jsObj,domtag,eType,handler){
return goog.events.listen(domtag,eType,eval(handler),false,jsObj);
});
