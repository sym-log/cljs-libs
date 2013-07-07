goog.provide('sym_log.cljs.handlers');
goog.require('cljs.core');
sym_log.cljs.handlers.mousedown = (function mousedown(evt){
var this$ = this;
this$.selected = true;
this$.xcord = evt.clientX;
return this$.ycord = evt.clientY;
});
sym_log.cljs.handlers.mousemove = (function mousemove(evt){
var this$ = this;
if(cljs.core.truth_(this$.selected))
{return evt.target.setAttribute("transform",[cljs.core.str("translate("),cljs.core.str((this$.attributes.xoff + (evt.clientX - this$.xcord))),cljs.core.str(","),cljs.core.str((this$.attributes.yoff + (evt.clientY - this$.ycord))),cljs.core.str(")")].join(''));
} else
{return null;
}
});
sym_log.cljs.handlers.mouseup = (function mouseup(evt){
var this$ = this;
this$.selected = false;
this$.xcord = 0;
return this$.ycord = 0;
});
sym_log.cljs.handlers.mouseout = (function mouseout(evt){
var this$ = this;
this$.selected = false;
this$.xcord = 0;
return this$.ycord = 0;
});
