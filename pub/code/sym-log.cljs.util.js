goog.provide('sym_log.cljs.util');
goog.require('cljs.core');
goog.require('sym_log.cljs.dom');
goog.require('sym_log.cljs.dom');
goog.require('goog.ui.IdGenerator');
sym_log.cljs.util.function_QMARK_ = (function function_QMARK_(testobj){
if(cljs.core._EQ_.call(null,cljs.core.type.call(null,testobj),cljs.core.type.call(null,Function)))
{return true;
} else
{return false;
}
});
/**
* Returns a  JSON string from the given
* ClojureScript data.
*/
sym_log.cljs.util.clj__GT_json = (function clj__GT_json(data){
return JSON.stringify.call(null,cljs.core.clj__GT_js.call(null,data));
});
/**
* Returns ClojureScript data for the given JSON string.
*/
sym_log.cljs.util.json__GT_clj = (function json__GT_clj(line){
return cljs.core.js__GT_clj.call(null,JSON.parse.call(null,line));
});
sym_log.cljs.util.uniquify = (function uniquify(prefix){
return [cljs.core.str(prefix),cljs.core.str("_"),cljs.core.str(goog.string.removeAll(goog.ui.IdGenerator.getInstance().getNextUniqueId(),":"))].join('');
});
sym_log.cljs.util.json__GT_jsob = (function json__GT_jsob(json,targetNS,objName){
var jsObj = eval([cljs.core.str([cljs.core.str(targetNS),cljs.core.str("."),cljs.core.str(objName),cljs.core.str(" = JSON.parse('"),cljs.core.str(json),cljs.core.str("');")].join(''))].join(''));
jsObj.id = [cljs.core.str(targetNS),cljs.core.str("."),cljs.core.str(objName)].join('');
return jsObj;
});
