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
sym_log.cljs.svg.initSVGnode = (function initSVGnode(jsObj,container){
var svgRoot = sym_log.cljs.svg.fetchSVGnode.call(null,container);
var domtag = goog.global.document.createElementNS("http://www.w3.org/2000/svg",jsObj.form);
var id = jsObj.id;
var attributes = cljs.core.js__GT_clj.call(null,jsObj.attributes);
jsObj.selected = false;
jsObj.xcord = 0;
jsObj.ycord = 0;
domtag.setAttribute("id",id);
var seq__6223_6227 = cljs.core.seq.call(null,cljs.core.keys.call(null,attributes));
var chunk__6224_6228 = null;
var count__6225_6229 = 0;
var i__6226_6230 = 0;
while(true){
if((i__6226_6230 < count__6225_6229))
{var key_6231 = cljs.core._nth.call(null,chunk__6224_6228,i__6226_6230);
domtag.setAttribute(key_6231,key_6231.call(null,attributes));
{
var G__6232 = seq__6223_6227;
var G__6233 = chunk__6224_6228;
var G__6234 = count__6225_6229;
var G__6235 = (i__6226_6230 + 1);
seq__6223_6227 = G__6232;
chunk__6224_6228 = G__6233;
count__6225_6229 = G__6234;
i__6226_6230 = G__6235;
continue;
}
} else
{var temp__4092__auto___6236 = cljs.core.seq.call(null,seq__6223_6227);
if(temp__4092__auto___6236)
{var seq__6223_6237__$1 = temp__4092__auto___6236;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__6223_6237__$1))
{var c__2749__auto___6238 = cljs.core.chunk_first.call(null,seq__6223_6237__$1);
{
var G__6239 = cljs.core.chunk_rest.call(null,seq__6223_6237__$1);
var G__6240 = c__2749__auto___6238;
var G__6241 = cljs.core.count.call(null,c__2749__auto___6238);
var G__6242 = 0;
seq__6223_6227 = G__6239;
chunk__6224_6228 = G__6240;
count__6225_6229 = G__6241;
i__6226_6230 = G__6242;
continue;
}
} else
{var key_6243 = cljs.core.first.call(null,seq__6223_6237__$1);
domtag.setAttribute(key_6243,key_6243.call(null,attributes));
{
var G__6244 = cljs.core.next.call(null,seq__6223_6237__$1);
var G__6245 = null;
var G__6246 = 0;
var G__6247 = 0;
seq__6223_6227 = G__6244;
chunk__6224_6228 = G__6245;
count__6225_6229 = G__6246;
i__6226_6230 = G__6247;
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
var char_6248 = (strng[cljs.core.deref.call(null,index)]);
while(true){
if((end > cljs.core.deref.call(null,index)))
{if(cljs.core._EQ_.call(null,char_6248,"<"))
{goog.array.extend(target,strng.substring(cljs.core.deref.call(null,index),(cljs.core.reset_BANG_.call(null,index,strng.indexOf(">",cljs.core.deref.call(null,index))) + 1)));
} else
{}
{
var G__6249 = (strng[cljs.core.swap_BANG_.call(null,index,cljs.core._PLUS_,1)]);
char_6248 = G__6249;
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
var tagStr_6250 = (tagArray[cljs.core.deref.call(null,index)]);
while(true){
if((eoa >= cljs.core.deref.call(null,index)))
{if(cljs.core._EQ_.call(null,"openTag",sym_log.cljs.svg.svgTagType_QMARK_.call(null,tagStr_6250)))
{if(cljs.core.not.call(null,(levelMx[cljs.core.deref.call(null,level)])))
{(levelMx[cljs.core.deref.call(null,level)] = []);
} else
{}
var prefix_6251 = ((cljs.core._EQ_.call(null,0,(levelMx[cljs.core.deref.call(null,level)]).length))?(levelMx[cljs.core.deref.call(null,level)][0] = "\"_\":"):(function (){(levelMx[cljs.core.deref.call(null,level)][(levelMx[cljs.core.deref.call(null,level)]).length] = [cljs.core.str("\""),cljs.core.str(goog.string.repeat("_",((levelMx[cljs.core.deref.call(null,level)]).length + 1))),cljs.core.str("\":")].join(''));
return (levelMx[cljs.core.deref.call(null,level)][((levelMx[cljs.core.deref.call(null,level)]).length - 1)]);
})());
if(cljs.core._EQ_.call(null,0,cljs.core.deref.call(null,level)))
{cljs.core.swap_BANG_.call(null,JSONstr,cljs.core.str,sym_log.cljs.svg.svgTag__GT_JSON.call(null,tagStr_6250));
} else
{cljs.core.swap_BANG_.call(null,JSONstr,cljs.core.str,",",prefix_6251,sym_log.cljs.svg.svgTag__GT_JSON.call(null,tagStr_6250));
}
cljs.core.swap_BANG_.call(null,level,cljs.core.inc);
} else
{if(cljs.core._EQ_.call(null,"closedTag",sym_log.cljs.svg.svgTagType_QMARK_.call(null,tagStr_6250)))
{if(cljs.core.not.call(null,(levelMx[cljs.core.deref.call(null,level)])))
{(levelMx[cljs.core.deref.call(null,level)] = []);
} else
{}
var prefix_6252 = ((cljs.core._EQ_.call(null,0,(levelMx[cljs.core.deref.call(null,level)]).length))?(levelMx[cljs.core.deref.call(null,level)][0] = "\"_\":"):(function (){(levelMx[cljs.core.deref.call(null,level)][(levelMx[cljs.core.deref.call(null,level)]).length] = [cljs.core.str("\""),cljs.core.str(goog.string.repeat("_",((levelMx[cljs.core.deref.call(null,level)]).length + 1))),cljs.core.str("\":")].join(''));
return (levelMx[cljs.core.deref.call(null,level)][((levelMx[cljs.core.deref.call(null,level)]).length - 1)]);
})());
if(cljs.core._EQ_.call(null,0,cljs.core.deref.call(null,level)))
{cljs.core.swap_BANG_.call(null,JSONstr,cljs.core.str,sym_log.cljs.svg.svgTag__GT_JSON.call(null,tagStr_6250));
} else
{cljs.core.swap_BANG_.call(null,JSONstr,cljs.core.str,",",prefix_6252,sym_log.cljs.svg.svgTag__GT_JSON.call(null,tagStr_6250));
}
} else
{if(cljs.core._EQ_.call(null,"closingTag",sym_log.cljs.svg.svgTagType_QMARK_.call(null,tagStr_6250)))
{cljs.core.swap_BANG_.call(null,JSONstr,cljs.core.str,"}");
cljs.core.swap_BANG_.call(null,level,cljs.core.dec);
} else
{}
}
}
{
var G__6253 = (tagArray[cljs.core.swap_BANG_.call(null,index,cljs.core.inc)]);
tagStr_6250 = G__6253;
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
{var strng_6254 = tagStr.substring(cljs.core.deref.call(null,idx),tagStr.indexOf(sym_log.cljs.string.fetch_first_in_string.call(null,tagStr,markers,(cljs.core.deref.call(null,idx) + 1)),cljs.core.deref.call(null,idx)));
while(true){
if((eos > cljs.core.deref.call(null,idx)))
{cljs.core.swap_BANG_.call(null,elStr,cljs.core.str,"\"",strng_6254.replace("=","\":\""),"\",");
if(!(cljs.core._EQ_.call(null,-1,tagStr.indexOf(" ",(cljs.core.deref.call(null,idx) + 1)))))
{cljs.core.reset_BANG_.call(null,idx,(1 + tagStr.indexOf(" ",(cljs.core.deref.call(null,idx) + 1))));
} else
{cljs.core.swap_BANG_.call(null,idx,cljs.core._PLUS_,eos);
}
{
var G__6255 = tagStr.substring(cljs.core.deref.call(null,idx),tagStr.indexOf(sym_log.cljs.string.fetch_first_in_string.call(null,tagStr,markers,(cljs.core.deref.call(null,idx) + 1)),cljs.core.deref.call(null,idx)));
strng_6254 = G__6255;
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
