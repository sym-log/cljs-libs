goog.provide('symlog.cljs.video');
goog.require('cljs.core');
goog.require('goog.string');
goog.require('goog.string');
goog.require('goog.events');
symlog.cljs.video.blob2vid = (function blob2vid(blob,vidId){
var vid = goog.dom.getElement(vidId);
(goog.dom.getElement("myVideo").getElementsByTagName("source")[0]).src = goog.global.URL.createObjectURL(blob);
return vid.load();
});
symlog.cljs.video.per_frame_function_example = (function per_frame_function_example(ioTarget,videoRef,FPS){
return ioTarget.innerHTML = symlog.cljs.video.time_index_to_string.call(null,videoRef.currentTime,FPS);
});
symlog.cljs.video.time_index_to_string = (function time_index_to_string(timevalue,FPS){
var hours = cljs.core.rem.call(null,Math.floor((timevalue / 3600)),24);
var minutes = cljs.core.rem.call(null,Math.floor((timevalue / 60)),60);
var seconds = Math.floor(cljs.core.rem.call(null,timevalue,60));
var frames = Math.floor((cljs.core.rem.call(null,timevalue,1) * FPS).toFixed(3));
return [cljs.core.str((((hours < 10))?[cljs.core.str("0"),cljs.core.str(hours),cljs.core.str(":")].join(''):[cljs.core.str(hours),cljs.core.str(":")].join(''))),cljs.core.str((((minutes < 10))?[cljs.core.str("0"),cljs.core.str(minutes),cljs.core.str(":")].join(''):[cljs.core.str(minutes),cljs.core.str(":")].join(''))),cljs.core.str((((seconds < 10))?[cljs.core.str("0"),cljs.core.str(seconds),cljs.core.str(":")].join(''):[cljs.core.str(seconds),cljs.core.str(":")].join(''))),cljs.core.str((((frames < 10))?[cljs.core.str("0"),cljs.core.str(frames)].join(''):[cljs.core.str(frames)].join('')))].join('');
});
symlog.cljs.video.vidWrapper = (function vidWrapper(video,FPS,per_frame_function){
var this$ = this;
this$.video = video;
this$.FPS = FPS;
this$.event_control = symlog.cljs.video.event_control = (function event_control(action){
if(cljs.core.not.call(null,cljs.core.type.call(null,this$.timerRef)))
{} else
{}
if(cljs.core._EQ_.call(null,"stop",action))
{this$.video.pause();
return clearInterval(symlog.cljs.video.timerRef);
} else
{if(cljs.core._EQ_.call(null,"start",action))
{if(cljs.core.truth_(this$.video.ended))
{this$.video.currentTime = 0;
} else
{}
this$.timerRef = setInterval(per_frame_function,(this$.FPS - 5));
return this$.video.play();
} else
{return null;
}
}
});
});
