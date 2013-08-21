goog.provide('symlog.cljs.handlers');
goog.require('cljs.core');
symlog.cljs.handlers.mousedown = (function mousedown(evt){
var this$ = this;
evt.preventDefault();
this$.selected = true;
this$.Xmark = evt.clientX;
return this$.Ymark = evt.clientY;
});
symlog.cljs.handlers.mousemove = (function mousemove(evt){
var this$ = this;
if(cljs.core.truth_(this$.selected))
{evt.preventDefault();
evt.currentTarget.setAttribute("x",(this$.attributes.x + (evt.clientX - this$.Xmark)));
return evt.currentTarget.setAttribute("y",(this$.attributes.y + (evt.clientY - this$.Ymark)));
} else
{return null;
}
});
symlog.cljs.handlers.mouseup = (function mouseup(evt){
var this$ = this;
if(cljs.core.truth_(this$.selected))
{evt.preventDefault();
this$.selected = false;
evt.currentTarget.setAttribute("x",(this$.attributes.x + (evt.clientX - this$.Xmark)));
evt.currentTarget.setAttribute("y",(this$.attributes.y + (evt.clientY - this$.Ymark)));
this$.attributes.x = evt.currentTarget.x.baseVal.value;
return this$.attributes.y = evt.currentTarget.y.baseVal.value;
} else
{return null;
}
});
symlog.cljs.handlers.mouseout = (function mouseout(evt){
var this$ = this;
if(cljs.core.truth_(this$.selected))
{evt.preventDefault();
this$.selected = false;
evt.currentTarget.setAttribute("x",(this$.attributes.x + (evt.clientX - this$.Xmark)));
evt.currentTarget.setAttribute("y",(this$.attributes.y + (evt.clientY - this$.Ymark)));
this$.attributes.x = evt.currentTarget.x.baseVal.value;
return this$.attributes.y = evt.currentTarget.y.baseVal.value;
} else
{return null;
}
});
