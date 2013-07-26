goog.provide('symlog.cljs.handlers');
goog.require('cljs.core');
symlog.cljs.handlers.mousedown = (function mousedown(evt){
var this$ = this;
this$.selected = true;
this$.xcord = evt.clientX;
return this$.ycord = evt.clientY;
});
symlog.cljs.handlers.mousemove = (function mousemove(evt){
var this$ = this;
if(cljs.core.truth_(this$.selected))
{return evt.target.setAttribute("transform",[cljs.core.str("translate("),cljs.core.str((this$.attributes.xoff + (evt.clientX - this$.xcord))),cljs.core.str(","),cljs.core.str((this$.attributes.yoff + (evt.clientY - this$.ycord))),cljs.core.str(")")].join(''));
} else
{return null;
}
});
symlog.cljs.handlers.mouseup = (function mouseup(evt){
var this$ = this;
this$.selected = false;
this$.xcord = 0;
return this$.ycord = 0;
});
symlog.cljs.handlers.mouseout = (function mouseout(evt){
var this$ = this;
this$.selected = false;
this$.xcord = 0;
return this$.ycord = 0;
});
