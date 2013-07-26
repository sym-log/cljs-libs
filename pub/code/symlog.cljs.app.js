goog.provide('symlog.cljs.app');
goog.require('cljs.core');
goog.require('symlog.cljs.dom');
goog.require('symlog.cljs.dom');
goog.require('symlog.cljs.util');
goog.require('goog.ui.IdGenerator');
symlog.cljs.app.objectContainer = "symlog.cljs.objects";
symlog.cljs.app.init = (function init(json,container){
var jsObj = JSON.parse.call(null,json);
if(cljs.core._EQ_.call(null,jsObj.type.toLowerCase(),"svg"))
{return symlog.cljs.svg.initSVGnode.call(null,symlog.cljs.util.json__GT_jsob.call(null,json,symlog.cljs.app.objectContainer,symlog.cljs.util.uniquify.call(null,"svg")),container);
} else
{return null;
}
});
