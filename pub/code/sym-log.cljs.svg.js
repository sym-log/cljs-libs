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
if(cljs.core.truth_(jsObj.attributes))
{if(cljs.core._EQ_.call(null,keys.length,2))
{goog.object.forEach(jsObj.attributes,(function (val,name,jsObj__$1){
return tag.setAttribute(name,val);
}));
} else
{goog.object.forEach(jsObj.attributes,(function (val,name,jsObj__$1){
return tag.setAttribute(name,val);
}));
keys.slice(2,keys.length).forEach((function (val,index,arr){
return tag.appendChild(this$.object__GT_node(tag,(jsObj[val])));
}));
}
} else
{keys.slice(1,keys.length).forEach((function (val,index,arr){
return tag.appendChild(this$.object__GT_node(tag,(jsObj[val])));
}));
}
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
var seq__5219_5223 = cljs.core.seq.call(null,cljs.core.keys.call(null,attributes));
var chunk__5220_5224 = null;
var count__5221_5225 = 0;
var i__5222_5226 = 0;
while(true){
if((i__5222_5226 < count__5221_5225))
{var key_5227 = cljs.core._nth.call(null,chunk__5220_5224,i__5222_5226);
domtag.setAttribute(key_5227,key_5227.call(null,attributes));
{
var G__5228 = seq__5219_5223;
var G__5229 = chunk__5220_5224;
var G__5230 = count__5221_5225;
var G__5231 = (i__5222_5226 + 1);
seq__5219_5223 = G__5228;
chunk__5220_5224 = G__5229;
count__5221_5225 = G__5230;
i__5222_5226 = G__5231;
continue;
}
} else
{var temp__4092__auto___5232 = cljs.core.seq.call(null,seq__5219_5223);
if(temp__4092__auto___5232)
{var seq__5219_5233__$1 = temp__4092__auto___5232;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__5219_5233__$1))
{var c__2749__auto___5234 = cljs.core.chunk_first.call(null,seq__5219_5233__$1);
{
var G__5235 = cljs.core.chunk_rest.call(null,seq__5219_5233__$1);
var G__5236 = c__2749__auto___5234;
var G__5237 = cljs.core.count.call(null,c__2749__auto___5234);
var G__5238 = 0;
seq__5219_5223 = G__5235;
chunk__5220_5224 = G__5236;
count__5221_5225 = G__5237;
i__5222_5226 = G__5238;
continue;
}
} else
{var key_5239 = cljs.core.first.call(null,seq__5219_5233__$1);
domtag.setAttribute(key_5239,key_5239.call(null,attributes));
{
var G__5240 = cljs.core.next.call(null,seq__5219_5233__$1);
var G__5241 = null;
var G__5242 = 0;
var G__5243 = 0;
seq__5219_5223 = G__5240;
chunk__5220_5224 = G__5241;
count__5221_5225 = G__5242;
i__5222_5226 = G__5243;
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
var char_5244 = (strng[cljs.core.deref.call(null,index)]);
while(true){
if((end > cljs.core.deref.call(null,index)))
{if(cljs.core._EQ_.call(null,char_5244,"<"))
{goog.array.extend(target,strng.substring(cljs.core.deref.call(null,index),(cljs.core.reset_BANG_.call(null,index,strng.indexOf(">",cljs.core.deref.call(null,index))) + 1)));
} else
{}
{
var G__5245 = (strng[cljs.core.swap_BANG_.call(null,index,cljs.core._PLUS_,1)]);
char_5244 = G__5245;
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
sym_log.cljs.svg.svgTags__GT_JSONstr = (function svgTags__GT_JSONstr(tagArray){
var index = cljs.core.atom.call(null,0);
var eoa = (tagArray.length - 1);
var JSONstr = cljs.core.atom.call(null,[].join(''));
var level = cljs.core.atom.call(null,0);
var levelMx = [];
var tagStr_5246 = (tagArray[cljs.core.deref.call(null,index)]);
while(true){
if((eoa >= cljs.core.deref.call(null,index)))
{if(cljs.core._EQ_.call(null,"openTag",sym_log.cljs.svg.svgTagType_QMARK_.call(null,tagStr_5246)))
{if(cljs.core.not.call(null,(levelMx[cljs.core.deref.call(null,level)])))
{(levelMx[cljs.core.deref.call(null,level)] = []);
} else
{}
var prefix_5247 = ((cljs.core._EQ_.call(null,0,(levelMx[cljs.core.deref.call(null,level)]).length))?(levelMx[cljs.core.deref.call(null,level)][0] = "\"#\":"):(function (){(levelMx[cljs.core.deref.call(null,level)][(levelMx[cljs.core.deref.call(null,level)]).length] = [cljs.core.str("\""),cljs.core.str(goog.string.repeat("#",((levelMx[cljs.core.deref.call(null,level)]).length + 1))),cljs.core.str("\":")].join(''));
return (levelMx[cljs.core.deref.call(null,level)][((levelMx[cljs.core.deref.call(null,level)]).length - 1)]);
})());
if(cljs.core._EQ_.call(null,0,cljs.core.deref.call(null,level)))
{cljs.core.swap_BANG_.call(null,JSONstr,cljs.core.str,sym_log.cljs.svg.svgTag__GT_JSON.call(null,tagStr_5246));
} else
{cljs.core.swap_BANG_.call(null,JSONstr,cljs.core.str,",",prefix_5247,sym_log.cljs.svg.svgTag__GT_JSON.call(null,tagStr_5246));
}
cljs.core.swap_BANG_.call(null,level,cljs.core.inc);
} else
{if(cljs.core._EQ_.call(null,"closedTag",sym_log.cljs.svg.svgTagType_QMARK_.call(null,tagStr_5246)))
{if(cljs.core.not.call(null,(levelMx[cljs.core.deref.call(null,level)])))
{(levelMx[cljs.core.deref.call(null,level)] = []);
} else
{}
var prefix_5248 = ((cljs.core._EQ_.call(null,0,(levelMx[cljs.core.deref.call(null,level)]).length))?(levelMx[cljs.core.deref.call(null,level)][0] = "\"#\":"):(function (){(levelMx[cljs.core.deref.call(null,level)][(levelMx[cljs.core.deref.call(null,level)]).length] = [cljs.core.str("\""),cljs.core.str(goog.string.repeat("#",((levelMx[cljs.core.deref.call(null,level)]).length + 1))),cljs.core.str("\":")].join(''));
return (levelMx[cljs.core.deref.call(null,level)][((levelMx[cljs.core.deref.call(null,level)]).length - 1)]);
})());
if(cljs.core._EQ_.call(null,0,cljs.core.deref.call(null,level)))
{cljs.core.swap_BANG_.call(null,JSONstr,cljs.core.str,sym_log.cljs.svg.svgTag__GT_JSON.call(null,tagStr_5246));
} else
{cljs.core.swap_BANG_.call(null,JSONstr,cljs.core.str,",",prefix_5248,sym_log.cljs.svg.svgTag__GT_JSON.call(null,tagStr_5246));
}
} else
{if(cljs.core._EQ_.call(null,"closingTag",sym_log.cljs.svg.svgTagType_QMARK_.call(null,tagStr_5246)))
{cljs.core.swap_BANG_.call(null,JSONstr,cljs.core.str,"}");
cljs.core.swap_BANG_.call(null,level,cljs.core.dec);
} else
{}
}
}
{
var G__5249 = (tagArray[cljs.core.swap_BANG_.call(null,index,cljs.core.inc)]);
tagStr_5246 = G__5249;
continue;
}
} else
{}
break;
}
return cljs.core.deref.call(null,JSONstr);
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
{var strng_5250 = tagStr.substring(cljs.core.deref.call(null,idx),tagStr.indexOf(sym_log.cljs.string.fetch_first_in_string.call(null,tagStr,markers,(cljs.core.deref.call(null,idx) + 1)),cljs.core.deref.call(null,idx)));
while(true){
if((eos > cljs.core.deref.call(null,idx)))
{cljs.core.swap_BANG_.call(null,elStr,cljs.core.str,"\"",strng_5250.replace("=","\":\""),"\",");
if(!(cljs.core._EQ_.call(null,-1,tagStr.indexOf(" ",(cljs.core.deref.call(null,idx) + 1)))))
{cljs.core.reset_BANG_.call(null,idx,(1 + tagStr.indexOf(" ",(cljs.core.deref.call(null,idx) + 1))));
} else
{cljs.core.swap_BANG_.call(null,idx,cljs.core._PLUS_,eos);
}
{
var G__5251 = tagStr.substring(cljs.core.deref.call(null,idx),tagStr.indexOf(sym_log.cljs.string.fetch_first_in_string.call(null,tagStr,markers,(cljs.core.deref.call(null,idx) + 1)),cljs.core.deref.call(null,idx)));
strng_5250 = G__5251;
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
