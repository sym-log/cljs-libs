goog.provide('sym_log.cljs.xml');
goog.require('cljs.core');
sym_log.cljs.xml.sanitize_svg = (function sanitize_svg(filestr,input_type){
if(cljs.core._EQ_.call(null,input_type,"optimized-inkscape"))
{var cleanStr = goog.string.removeAll(goog.string.remove(goog.string.collapseWhitespace(goog.string.collapseBreakingSpaces(goog.string.trim(goog.string.stripQuotes(goog.string.stripNewlines(filestr),[cljs.core.str("\"")].join(''))))).replace(RegExp("> <","g"),"><"),"</svg>"),"\"");
return cleanStr.slice((cleanStr.search("</metadata>") + 11),cleanStr.length);
} else
{return null;
}
});
