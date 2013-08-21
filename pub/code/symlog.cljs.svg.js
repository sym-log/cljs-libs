goog.provide('symlog.cljs.svg');
goog.require('cljs.core');
goog.require('symlog.cljs.events');
goog.require('symlog.cljs.util');
goog.require('goog.events');
goog.require('goog.ui.IdGenerator');
symlog.cljs.svg.initSVGobject = (function initSVGobject(jsObj,svgContainer,objPool){
var sfx = symlog.cljs.util.uniqify.call(null,"svg");
var id = [cljs.core.str(objPool.name),cljs.core.str("."),cljs.core.str(sfx)].join('');
var obj = (objPool[sfx] = jsObj);
var svgTag = (new symlog.cljs.svg.svgJsObj__GT_domNode()).object__GT_node(null,jsObj);
obj.id = id;
obj.attributes.x = 0;
obj.attributes.y = 0;
svgTag.setAttribute("x",0);
svgTag.setAttribute("y",0);
svgTag.setAttribute("id",id);
return svgContainer.appendChild(svgTag);
});
goog.provide('symlog.cljs.svg.svgJsObj__GT_domNode');

/**
* @constructor
*/
symlog.cljs.svg.svgJsObj__GT_domNode = (function (){
})
symlog.cljs.svg.svgJsObj__GT_domNode.cljs$lang$type = true;
symlog.cljs.svg.svgJsObj__GT_domNode.cljs$lang$ctorStr = "symlog.cljs.svg/svgJsObj->domNode";
symlog.cljs.svg.svgJsObj__GT_domNode.cljs$lang$ctorPrWriter = (function (this__2564__auto__,writer__2565__auto__,opt__2566__auto__){
return cljs.core._write.call(null,writer__2565__auto__,"symlog.cljs.svg/svgJsObj->domNode");
});
symlog.cljs.svg.svgJsObj__GT_domNode.prototype.object__GT_node = (function (container,jsObj){
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
symlog.cljs.svg.__GT_svgJsObj__GT_domNode = (function __GT_svgJsObj__GT_domNode(){
return (new symlog.cljs.svg.svgJsObj__GT_domNode());
});
symlog.cljs.svg.sanitize_svg = (function sanitize_svg(filestr,input_type){
if(cljs.core._EQ_.call(null,input_type,"optimized-inkscape"))
{var cleanStr = goog.string.removeAll(goog.string.collapseWhitespace(goog.string.collapseBreakingSpaces(goog.string.trim(goog.string.stripQuotes(goog.string.stripNewlines(filestr),[cljs.core.str("\"")].join(''))))).replace(RegExp("> <","g"),"><"),"\"");
return goog.string.buildString("<svg overflow=visible>",cleanStr.slice((cleanStr.search("</metadata>") + 11),cleanStr.length));
} else
{return null;
}
});
symlog.cljs.svg.getSvgTags = (function getSvgTags(strng){
var index = cljs.core.atom.call(null,0);
var end = strng.length;
var target = [];
var char_3162 = (strng[cljs.core.deref.call(null,index)]);
while(true){
if((end > cljs.core.deref.call(null,index)))
{if(cljs.core._EQ_.call(null,char_3162,"<"))
{goog.array.extend(target,strng.substring(cljs.core.deref.call(null,index),(cljs.core.reset_BANG_.call(null,index,strng.indexOf(">",cljs.core.deref.call(null,index))) + 1)));
} else
{}
{
var G__3163 = (strng[cljs.core.swap_BANG_.call(null,index,cljs.core._PLUS_,1)]);
char_3162 = G__3163;
continue;
}
} else
{}
break;
}
return target;
});
symlog.cljs.svg.svgTagType_QMARK_ = (function svgTagType_QMARK_(tag){
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
symlog.cljs.svg.svgTagGroup__GT_JSONstring = (function svgTagGroup__GT_JSONstring(tagArray){
var index = cljs.core.atom.call(null,0);
var eoa = (tagArray.length - 1);
var JSON = cljs.core.atom.call(null,[].join(''));
var level = cljs.core.atom.call(null,0);
var levelMx = [];
var tagStr_3164 = (tagArray[cljs.core.deref.call(null,index)]);
while(true){
if((eoa >= cljs.core.deref.call(null,index)))
{if(cljs.core._EQ_.call(null,"openTag",symlog.cljs.svg.svgTagType_QMARK_.call(null,tagStr_3164)))
{if(cljs.core.not.call(null,(levelMx[cljs.core.deref.call(null,level)])))
{(levelMx[cljs.core.deref.call(null,level)] = []);
} else
{}
var prefix_3165 = ((cljs.core._EQ_.call(null,0,(levelMx[cljs.core.deref.call(null,level)]).length))?(levelMx[cljs.core.deref.call(null,level)][0] = "\"\u0394\":"):(function (){(levelMx[cljs.core.deref.call(null,level)][(levelMx[cljs.core.deref.call(null,level)]).length] = [cljs.core.str("\""),cljs.core.str(goog.string.repeat("\u0394",((levelMx[cljs.core.deref.call(null,level)]).length + 1))),cljs.core.str("\":")].join(''));
return (levelMx[cljs.core.deref.call(null,level)][((levelMx[cljs.core.deref.call(null,level)]).length - 1)]);
})());
if(cljs.core._EQ_.call(null,0,cljs.core.deref.call(null,level)))
{cljs.core.swap_BANG_.call(null,JSON,cljs.core.str,symlog.cljs.svg.svgTag__GT_JSON.call(null,tagStr_3164));
} else
{cljs.core.swap_BANG_.call(null,JSON,cljs.core.str,",",prefix_3165,symlog.cljs.svg.svgTag__GT_JSON.call(null,tagStr_3164));
}
cljs.core.swap_BANG_.call(null,level,cljs.core.inc);
} else
{if(cljs.core._EQ_.call(null,"closedTag",symlog.cljs.svg.svgTagType_QMARK_.call(null,tagStr_3164)))
{if(cljs.core.not.call(null,(levelMx[cljs.core.deref.call(null,level)])))
{(levelMx[cljs.core.deref.call(null,level)] = []);
} else
{}
var prefix_3166 = ((cljs.core._EQ_.call(null,0,(levelMx[cljs.core.deref.call(null,level)]).length))?(levelMx[cljs.core.deref.call(null,level)][0] = "\"\u0394\":"):(function (){(levelMx[cljs.core.deref.call(null,level)][(levelMx[cljs.core.deref.call(null,level)]).length] = [cljs.core.str("\""),cljs.core.str(goog.string.repeat("\u0394",((levelMx[cljs.core.deref.call(null,level)]).length + 1))),cljs.core.str("\":")].join(''));
return (levelMx[cljs.core.deref.call(null,level)][((levelMx[cljs.core.deref.call(null,level)]).length - 1)]);
})());
if(cljs.core._EQ_.call(null,0,cljs.core.deref.call(null,level)))
{cljs.core.swap_BANG_.call(null,JSON,cljs.core.str,symlog.cljs.svg.svgTag__GT_JSON.call(null,tagStr_3164));
} else
{cljs.core.swap_BANG_.call(null,JSON,cljs.core.str,",",prefix_3166,symlog.cljs.svg.svgTag__GT_JSON.call(null,tagStr_3164));
}
} else
{if(cljs.core._EQ_.call(null,"closingTag",symlog.cljs.svg.svgTagType_QMARK_.call(null,tagStr_3164)))
{cljs.core.swap_BANG_.call(null,JSON,cljs.core.str,"}");
cljs.core.swap_BANG_.call(null,level,cljs.core.dec);
} else
{}
}
}
{
var G__3167 = (tagArray[cljs.core.swap_BANG_.call(null,index,cljs.core.inc)]);
tagStr_3164 = G__3167;
continue;
}
} else
{}
break;
}
return cljs.core.deref.call(null,JSON);
});
symlog.cljs.svg.svgTag__GT_JSON = (function svgTag__GT_JSON(tagStr){
var idx = cljs.core.atom.call(null,1);
var eos = ((cljs.core._EQ_.call(null,-1,tagStr.indexOf("/")))?(tagStr.indexOf(">") - 1):(tagStr.indexOf("/") - 1));
var elStr = cljs.core.atom.call(null,[].join(''));
var markers = [" ","/",">"];
var tagType = symlog.cljs.svg.svgTagType_QMARK_.call(null,tagStr);
cljs.core.reset_BANG_.call(null,elStr,[cljs.core.str("{\"name\":\""),cljs.core.str(tagStr.substring(cljs.core.deref.call(null,idx),tagStr.indexOf(symlog.cljs.string.fetch_first_in_string.call(null,tagStr,markers,cljs.core.deref.call(null,idx)),cljs.core.deref.call(null,idx)))),cljs.core.str("\""),cljs.core.str(((!(cljs.core._EQ_.call(null,-1,tagStr.indexOf(" ",(cljs.core.deref.call(null,idx) + 1)))))?",\"attributes\":{":null))].join(''));
cljs.core.reset_BANG_.call(null,idx,(1 + tagStr.indexOf(" ")));
if(cljs.core._EQ_.call(null,0,cljs.core.deref.call(null,idx)))
{} else
{var strng_3168 = tagStr.substring(cljs.core.deref.call(null,idx),tagStr.indexOf(symlog.cljs.string.fetch_first_in_string.call(null,tagStr,markers,(cljs.core.deref.call(null,idx) + 1)),cljs.core.deref.call(null,idx)));
while(true){
if((eos > cljs.core.deref.call(null,idx)))
{cljs.core.swap_BANG_.call(null,elStr,cljs.core.str,"\"",strng_3168.replace("=","\":\""),"\",");
if(!(cljs.core._EQ_.call(null,-1,tagStr.indexOf(" ",(cljs.core.deref.call(null,idx) + 1)))))
{cljs.core.reset_BANG_.call(null,idx,(1 + tagStr.indexOf(" ",(cljs.core.deref.call(null,idx) + 1))));
} else
{cljs.core.swap_BANG_.call(null,idx,cljs.core._PLUS_,eos);
}
{
var G__3169 = tagStr.substring(cljs.core.deref.call(null,idx),tagStr.indexOf(symlog.cljs.string.fetch_first_in_string.call(null,tagStr,markers,(cljs.core.deref.call(null,idx) + 1)),cljs.core.deref.call(null,idx)));
strng_3168 = G__3169;
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
