(ns symlog.cljs.util.video)

; (:require
;   [goog.dom :as dom]
;   [symlog.cljs.video :as symlog.cljs.video]))
; (:use [goog.string :only [toNumber]]
;       [symlog.cljs.dom :only [by-id listen]]))

;This is a convenience utility.  Insert the HTML commented at the
;bottom of this file into your web browser.  the include this namspace and envoke something like
;      (utils.video.editor-bar-setup (goog.dom.getElement "myVideo") 29.97)
; on it.  this will setup listeners and utilities so you can index yourself around your video on a
; frame by frame basis


;(defn editor-bar-setup [video FPS]
; (def vid (symlog.cljs.video.vidWrapper.
;                       video 
;                       FPS
;                       #(libs.video.per-frame-function-example
;                        (by-id "timeIndexCell")
;                         video
;                         FPS)))
;  (listen
;   (by-id "playButton")
;   symlog.cljs.dom.click
;   (fn [evt] (vid.event-control "start"))
;  )


;  (listen
;   (by-id "pauseButton")
;   symlog.cljs.dom.click
;   (fn [evt] (vid.event-control "stop")))
                                       


;  (listen
;   (by-id "skipForwardButton")
;   symlog.cljs.dom.click
;   (fn [evt] ( do
;             (vid.event-control "stop")
;             ( set! (.-currentTime video)
;                    (+ (.-currentTime video)
;                       (/ (toNumber (.-value (by-id "forwardStepCountField"))) FPS)))
;             ([symlog.cljs.video.per-frame-function-example (by-id "timeIndexCell") video FPS)
;                           )
;                  ))



;(listen (by-id "skipBackwardButton")
;         symlog.cljs.dom.click
;         (fn [evt] ( do ( vid.event-control "stop")
;                            ( set! (.-currentTime video)
;                                              (- (.-currentTime video)
;                                               (/ (toNumber (.-value (by-id "backwardStepCountField"))) FPS)))
;                            (symlog.cljs.video.per-frame-function-example (by-id "timeIndexCell") video FPS)
;                           )
;                  ))



;(listen (by-id "autoReturnCheckbox")
;         click (fn [evt] (if (.-checked (by-id "autoReturnCheckbox"))
;                            (set! (.-value (by-id "timeReturnField")) (str (.-currentTime video))))
;                            (set! (.-value (by-id "timeReturnField")) nil)))



;(if (.-checked (by-id! "autoReturnCheckbox"))
;  (set! (.-currentTime video ) (toNumber (.-value (by-id! "timeReturnField")))))
;)



; <div id='editControlPanelDiv'>
;    <table id='controlTable' >
;     <tr> 
;      <td>Time:</td>
;      <td id='timeIndexCell'></td>
;      <td><button id='skipBackwardButton'><< </button>
;      <td><input id='backwardStepCountField' type="text"></input></td>
;      <td><button id='playButton'> > </button>
;      <td><button id='pauseButton'> || </button>
;      <td><input id='forwardStepCountField' type="text"></input></td>
;      <td><button id='skipForwardButton'> >> </button></td>
;      <td><input id='timeReturnField' type="text"></input></td>
;      <td><input type="checkbox" id='autoReturnCheckbox'> </td>
;    </tr>
;   </table>    
;  </div> 
