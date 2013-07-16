goog.provide('sym_log.cljs.svg');
goog.require('cljs.core');
goog.require('sym_log.cljs.events');
goog.require('sym_log.cljs.util');
goog.require('goog.events');
goog.require('goog.ui.IdGenerator');
sym_log.cljs.svg.fetchSVGnode = (function fetchSVGnode(container){
var svgRoot = (function (){var or__3943__auto__ = goog.dom.getElement([cljs.core.str(container.id),cljs.core.str(".svgRoot")].join(''));
if(cljs.core.truth_(or__3943__auto__))
{return or__3943__auto__;
} else
{return goog.global.document.createElementNS("http://www.w3.org/2000/svg","svg");
}
})();
if(!(cljs.core._EQ_.call(null,[cljs.core.str(container.id),cljs.core.str(".svgRoot")].join(''),svgRoot.id)))
{svgRoot.setAttribute("id",[cljs.core.str(container.id),cljs.core.str(".svgRoot")].join(''));
goog.dom.appendChild(container,svgRoot);
} else
{}
return svgRoot;
});
goog.provide('sym_log.cljs.svg.svgJsObj__GT_domNode');

/**
* @constructor
*/
sym_log.cljs.svg.svgJsObj__GT_domNode = (function (){
})
sym_log.cljs.svg.svgJsObj__GT_domNode.cljs$lang$type = true;
sym_log.cljs.svg.svgJsObj__GT_domNode.cljs$lang$ctorStr = "sym-log.cljs.svg/svgJsObj->domNode";
sym_log.cljs.svg.svgJsObj__GT_domNode.cljs$lang$ctorPrWriter = (function (this__2558__auto__,writer__2559__auto__,opt__2560__auto__){
return cljs.core._write.call(null,writer__2559__auto__,"sym-log.cljs.svg/svgJsObj->domNode");
});
sym_log.cljs.svg.svgJsObj__GT_domNode.prototype.object__GT_node = (function (container,jsObj){
var self__ = this;
var this$ = this;
var keys = goog.object.getKeys(jsObj);
var tag = goog.global.document.createElementNS("http://www.w3.org/2000/svg",jsObj.name);
goog.object.forEach(jsObj,(function (val,name,jsObj__$1){
if(cljs.core.truth_(goog.string.contains(name,"attributes")))
{return goog.object.forEach(jsObj__$1.attributes,(function (val__$1,name__$1,jsObj__$2){
return tag.setAttribute(name__$1,val__$1);
}));
} else
{if(cljs.core.truth_(goog.string.contains(name,"_id")))
{return tag.setAttribute("id",val);
} else
{if(cljs.core.truth_(goog.string.contains(name,"\u0394")))
{return tag.appendChild(this$.object__GT_node(tag,val));
} else
{return null;
}
}
}
}));
return tag;
});
sym_log.cljs.svg.initSVGnode = (function initSVGnode(jsObj,container){
var svgRoot = sym_log.cljs.svg.fetchSVGnode.call(null,container);
var domtag = goog.global.document.createElementNS("http://www.w3.org/2000/svg",jsObj.form);
var id = jsObj.id;
var attributes = cljs.core.js__GT_clj.call(null,jsObj.attributes);
jsObj.selected = false;
jsObj.xcord = 0;
jsObj.ycord = 0;
domtag.setAttribute("id",id);
var seq__3813_3817 = cljs.core.seq.call(null,cljs.core.keys.call(null,attributes));
var chunk__3814_3818 = null;
var count__3815_3819 = 0;
var i__3816_3820 = 0;
while(true){
if((i__3816_3820 < count__3815_3819))
{var key_3821 = cljs.core._nth.call(null,chunk__3814_3818,i__3816_3820);
domtag.setAttribute(key_3821,key_3821.call(null,attributes));
{
var G__3822 = seq__3813_3817;
var G__3823 = chunk__3814_3818;
var G__3824 = count__3815_3819;
var G__3825 = (i__3816_3820 + 1);
seq__3813_3817 = G__3822;
chunk__3814_3818 = G__3823;
count__3815_3819 = G__3824;
i__3816_3820 = G__3825;
continue;
}
} else
{var temp__4092__auto___3826 = cljs.core.seq.call(null,seq__3813_3817);
if(temp__4092__auto___3826)
{var seq__3813_3827__$1 = temp__4092__auto___3826;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__3813_3827__$1))
{var c__2749__auto___3828 = cljs.core.chunk_first.call(null,seq__3813_3827__$1);
{
var G__3829 = cljs.core.chunk_rest.call(null,seq__3813_3827__$1);
var G__3830 = c__2749__auto___3828;
var G__3831 = cljs.core.count.call(null,c__2749__auto___3828);
var G__3832 = 0;
seq__3813_3817 = G__3829;
chunk__3814_3818 = G__3830;
count__3815_3819 = G__3831;
i__3816_3820 = G__3832;
continue;
}
} else
{var key_3833 = cljs.core.first.call(null,seq__3813_3827__$1);
domtag.setAttribute(key_3833,key_3833.call(null,attributes));
{
var G__3834 = cljs.core.next.call(null,seq__3813_3827__$1);
var G__3835 = null;
var G__3836 = 0;
var G__3837 = 0;
seq__3813_3817 = G__3834;
chunk__3814_3818 = G__3835;
count__3815_3819 = G__3836;
i__3816_3820 = G__3837;
continue;
}
}
} else
{}
}
break;
}
svgRoot.appendChild(domtag);
if(cljs.core.truth_(jsObj.listeners))
{return sym_log.cljs.events.attach_listeners.call(null,jsObj,domtag);
} else
{return null;
}
});
sym_log.cljs.svg.sanitize_svg = (function sanitize_svg(filestr,input_type){
if(cljs.core._EQ_.call(null,input_type,"optimized-inkscape"))
{var cleanStr = goog.string.removeAll(goog.string.remove(goog.string.collapseWhitespace(goog.string.collapseBreakingSpaces(goog.string.trim(goog.string.stripQuotes(goog.string.stripNewlines(filestr),[cljs.core.str("\"")].join(''))))).replace(RegExp("> <","g"),"><"),"</svg>"),"\"");
return cleanStr.slice((cleanStr.search("</metadata>") + 11),cleanStr.length);
} else
{return null;
}
});
sym_log.cljs.svg.getSvgTags = (function getSvgTags(strng){
var index = cljs.core.atom.call(null,0);
var end = strng.length;
var target = [];
var char_3838 = (strng[cljs.core.deref.call(null,index)]);
while(true){
if((end > cljs.core.deref.call(null,index)))
{if(cljs.core._EQ_.call(null,char_3838,"<"))
{goog.array.extend(target,strng.substring(cljs.core.deref.call(null,index),(cljs.core.reset_BANG_.call(null,index,strng.indexOf(">",cljs.core.deref.call(null,index))) + 1)));
} else
{}
{
var G__3839 = (strng[cljs.core.swap_BANG_.call(null,index,cljs.core._PLUS_,1)]);
char_3838 = G__3839;
continue;
}
} else
{}
break;
}
return target;
});
sym_log.cljs.svg.svgTagType_QMARK_ = (function svgTagType_QMARK_(tag){
if(cljs.core._EQ_.call(null,(tag[1]),"/"))
{return "closingTag";
} else
{if((function (){var and__3941__auto__ = (tag.length > 4);
if(and__3941__auto__)
{return cljs.core._EQ_.call(null,(tag[(tag.length - 2)]),"/");
} else
{return and__3941__auto__;
}
})())
{return "closedTag";
} else
{if((function (){var and__3941__auto__ = cljs.core._EQ_.call(null,(tag[0]),"<");
if(and__3941__auto__)
{return cljs.core._EQ_.call(null,(tag[(tag.length - 1)]),">");
} else
{return and__3941__auto__;
}
})())
{return "openTag";
} else
{if("\uFDD0:else")
{return null;
} else
{return null;
}
}
}
}
});
sym_log.cljs.svg.svgTags__GT_JSON = (function svgTags__GT_JSON(tagArray){
var index = cljs.core.atom.call(null,0);
var eoa = (tagArray.length - 1);
var JSON = cljs.core.atom.call(null,[].join(''));
var level = cljs.core.atom.call(null,0);
var levelMx = [];
var tagStr_3840 = (tagArray[cljs.core.deref.call(null,index)]);
while(true){
if((eoa >= cljs.core.deref.call(null,index)))
{if(cljs.core._EQ_.call(null,"openTag",sym_log.cljs.svg.svgTagType_QMARK_.call(null,tagStr_3840)))
{if(cljs.core.not.call(null,(levelMx[cljs.core.deref.call(null,level)])))
{(levelMx[cljs.core.deref.call(null,level)] = []);
} else
{}
var prefix_3841 = ((cljs.core._EQ_.call(null,0,(levelMx[cljs.core.deref.call(null,level)]).length))?(levelMx[cljs.core.deref.call(null,level)][0] = "\"\u0394\":"):(function (){(levelMx[cljs.core.deref.call(null,level)][(levelMx[cljs.core.deref.call(null,level)]).length] = [cljs.core.str("\""),cljs.core.str(goog.string.repeat("\u0394",((levelMx[cljs.core.deref.call(null,level)]).length + 1))),cljs.core.str("\":")].join(''));
return (levelMx[cljs.core.deref.call(null,level)][((levelMx[cljs.core.deref.call(null,level)]).length - 1)]);
})());
if(cljs.core._EQ_.call(null,0,cljs.core.deref.call(null,level)))
{cljs.core.swap_BANG_.call(null,JSON,cljs.core.str,sym_log.cljs.svg.svgTag__GT_JSON.call(null,tagStr_3840));
} else
{cljs.core.swap_BANG_.call(null,JSON,cljs.core.str,",",prefix_3841,sym_log.cljs.svg.svgTag__GT_JSON.call(null,tagStr_3840));
}
cljs.core.swap_BANG_.call(null,level,cljs.core.inc);
} else
{if(cljs.core._EQ_.call(null,"closedTag",sym_log.cljs.svg.svgTagType_QMARK_.call(null,tagStr_3840)))
{if(cljs.core.not.call(null,(levelMx[cljs.core.deref.call(null,level)])))
{(levelMx[cljs.core.deref.call(null,level)] = []);
} else
{}
var prefix_3842 = ((cljs.core._EQ_.call(null,0,(levelMx[cljs.core.deref.call(null,level)]).length))?(levelMx[cljs.core.deref.call(null,level)][0] = "\"\u0394\":"):(function (){(levelMx[cljs.core.deref.call(null,level)][(levelMx[cljs.core.deref.call(null,level)]).length] = [cljs.core.str("\""),cljs.core.str(goog.string.repeat("\u0394",((levelMx[cljs.core.deref.call(null,level)]).length + 1))),cljs.core.str("\":")].join(''));
return (levelMx[cljs.core.deref.call(null,level)][((levelMx[cljs.core.deref.call(null,level)]).length - 1)]);
})());
if(cljs.core._EQ_.call(null,0,cljs.core.deref.call(null,level)))
{cljs.core.swap_BANG_.call(null,JSON,cljs.core.str,sym_log.cljs.svg.svgTag__GT_JSON.call(null,tagStr_3840));
} else
{cljs.core.swap_BANG_.call(null,JSON,cljs.core.str,",",prefix_3842,sym_log.cljs.svg.svgTag__GT_JSON.call(null,tagStr_3840));
}
} else
{if(cljs.core._EQ_.call(null,"closingTag",sym_log.cljs.svg.svgTagType_QMARK_.call(null,tagStr_3840)))
{cljs.core.swap_BANG_.call(null,JSON,cljs.core.str,"}");
cljs.core.swap_BANG_.call(null,level,cljs.core.dec);
} else
{}
}
}
{
var G__3843 = (tagArray[cljs.core.swap_BANG_.call(null,index,cljs.core.inc)]);
tagStr_3840 = G__3843;
continue;
}
} else
{}
break;
}
return cljs.core.deref.call(null,JSON);
});
sym_log.cljs.svg.svgTag__GT_JSON = (function svgTag__GT_JSON(tagStr){
var idx = cljs.core.atom.call(null,1);
var eos = ((cljs.core._EQ_.call(null,-1,tagStr.indexOf("/")))?(tagStr.indexOf(">") - 1):(tagStr.indexOf("/") - 1));
var elStr = cljs.core.atom.call(null,[].join(''));
var markers = [" ","/",">"];
var tagType = sym_log.cljs.svg.svgTagType_QMARK_.call(null,tagStr);
cljs.core.reset_BANG_.call(null,elStr,[cljs.core.str("{\"name\":\""),cljs.core.str(tagStr.substring(cljs.core.deref.call(null,idx),tagStr.indexOf(sym_log.cljs.string.fetch_first_in_string.call(null,tagStr,markers,cljs.core.deref.call(null,idx)),cljs.core.deref.call(null,idx)))),cljs.core.str("\""),cljs.core.str(((!(cljs.core._EQ_.call(null,-1,tagStr.indexOf(" ",(cljs.core.deref.call(null,idx) + 1)))))?",\"attributes\":{":null))].join(''));
cljs.core.reset_BANG_.call(null,idx,(1 + tagStr.indexOf(" ")));
if(cljs.core._EQ_.call(null,0,cljs.core.deref.call(null,idx)))
{} else
{var strng_3844 = tagStr.substring(cljs.core.deref.call(null,idx),tagStr.indexOf(sym_log.cljs.string.fetch_first_in_string.call(null,tagStr,markers,(cljs.core.deref.call(null,idx) + 1)),cljs.core.deref.call(null,idx)));
while(true){
if((eos > cljs.core.deref.call(null,idx)))
{cljs.core.swap_BANG_.call(null,elStr,cljs.core.str,"\"",strng_3844.replace("=","\":\""),"\",");
if(!(cljs.core._EQ_.call(null,-1,tagStr.indexOf(" ",(cljs.core.deref.call(null,idx) + 1)))))
{cljs.core.reset_BANG_.call(null,idx,(1 + tagStr.indexOf(" ",(cljs.core.deref.call(null,idx) + 1))));
} else
{cljs.core.swap_BANG_.call(null,idx,cljs.core._PLUS_,eos);
}
{
var G__3845 = tagStr.substring(cljs.core.deref.call(null,idx),tagStr.indexOf(sym_log.cljs.string.fetch_first_in_string.call(null,tagStr,markers,(cljs.core.deref.call(null,idx) + 1)),cljs.core.deref.call(null,idx)));
strng_3844 = G__3845;
continue;
}
} else
{}
break;
}
}
if(cljs.core._EQ_.call(null,tagType,"closedTag"))
{if((cljs.core.deref.call(null,elStr).search("\"attributes\":") > 0))
{return [cljs.core.str(cljs.core.deref.call(null,elStr).substring(0,(cljs.core.deref.call(null,elStr).length - 1))),cljs.core.str("}}")].join('');
} else
{return [cljs.core.str(cljs.core.deref.call(null,elStr).substring(0,(cljs.core.deref.call(null,elStr).length - 1)))].join('');
}
} else
{if(cljs.core._EQ_.call(null,tagType,"openTag"))
{if((cljs.core.deref.call(null,elStr).search("\"attributes\":") > 0))
{return [cljs.core.str(cljs.core.deref.call(null,elStr).substring(0,(cljs.core.deref.call(null,elStr).length - 1))),cljs.core.str("}")].join('');
} else
{return [cljs.core.str(cljs.core.deref.call(null,elStr).substring(0,(cljs.core.deref.call(null,elStr).length - 1))),cljs.core.str("\"")].join('');
}
} else
{if(cljs.core._EQ_.call(null,tagType,"closingTag"))
{return [cljs.core.str("}")].join('');
} else
{return null;
}
}
}
});
sym_log.cljs.svg.svgTagName_QMARK_ = (function svgTagName_QMARK_(tagStr){
if(cljs.core._EQ_.call(null,"closeTag",sym_log.cljs.svg.tagType_QMARK_.call(null,tagStr)))
{return tagStr.substring(2,tagStr.indexOf(">"));
} else
{if("\uFDD0:else")
{if(cljs.core._EQ_.call(null,-1,tagStr.indexOf(" ")))
{return tagStr.substring(1,tagStr.indexOf(">"));
} else
{return tagStr.substring(1,tagStr.indexOf(" "));
}
} else
{return null;
}
}
});
