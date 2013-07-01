goog.provide('sym_log.cljs.app');
goog.require('cljs.core');
goog.require('sym_log.cljs.dom');
goog.require('sym_log.cljs.dom');
goog.require('sym_log.cljs.util');
goog.require('goog.ui.IdGenerator');
sym_log.cljs.app.objectContainer = "sym-log.cljs.objects";
sym_log.cljs.app.init = (function init(json,container){
var jsObj = JSON.parse.call(null,json);
if(cljs.core._EQ_.call(null,jsObj.type.toLowerCase(),"svg"))
{return sym_log.cljs.svg.initSVGnode.call(null,sym_log.cljs.util.json__GT_jsob.call(null,json,sym_log.cljs.app.objectContainer,sym_log.cljs.util.uniquify.call(null,"svg")),container);
} else
{return null;
}
});
