(ns sym-log.cljs.video
  (:require [goog.events :as events] )
  (:use     [goog.string :only [toNumber]] )
 )


(defn blob2vid [blob vidId]
  "replaces whatever video source used by HTML video reference with blob and

   Example usage:
       (blob2vid blob myVideo) <=  myVideo should be in double quotes and be
       the id of an HTML video element. "


  (let [vid (goog.dom.getElement vidId)]
    (set! (.-src
           (aget
            (.getElementsByTagName (goog.dom.getElement "myVideo") "source") 0))
          (goog.global.URL.createObjectURL blob))
    (.load vid))
 )



(defn per-frame-function-example [ioTarget videoRef FPS]
  "this is just an example of a function that could be passed to a vidWrapper instance to be executed
   at each frame of the subject video"
 
  (set! (.-innerHTML ioTarget) (time-index-to-string (.-currentTime videoRef ) FPS))
)


(defn time-index-to-string [timevalue FPS]
  "this function takes a time value from video.currenTime and the frames per second of the video

   it returns a formatted string giving the time index of the video, the right-most value being the
   current frame"
  
   (let [ hours (rem (.floor js/Math (/ timevalue 3600 )) 24)
          minutes (rem (.floor js/Math (/ timevalue 60 )) 60)
          seconds (.floor js/Math (rem timevalue 60))
          frames (.floor js/Math (.toFixed (* (rem timevalue 1) FPS) 3))  ]
      ( str
      ( if (< hours 10) (str "0" hours ":") ( str hours ":"))
      ( if (< minutes 10) (str "0" minutes ":") (str minutes ":"))
      ( if (< seconds 10) (str "0" seconds ":") (str seconds ":"))
      ( if (< frames 10) (str "0" frames) (str frames)))
   ))



(defn vidWrapper [video FPS per-frame-function ]
  "This constructor takes:
     1) a dom reference to a video tag
     2) the frame per second of the video (necessary to setup the timer)
     3) a function defined and passed with its execution paremeters.  This
        function will be executed at each frame of the video.  Make it do anything you like to the
        document

    EXAMPLE USAGE:

                (def vid (vidWrapper.
                              (goog.dom.getElement "myVideo")
                               29.97
 notice the pound symbol==>    #(per-frame-function-example # = reader macro = anonymous function literal
                                 (goog.dom.getElement "container")
                                 (goog.dom.getElement "myVideo")
                                  29.97)))
"
;                (.event-control vid "start")
;                (.event-control vid "stop")


  (this-as this
    (def this.video video)
    (def this.FPS FPS)
    (def this.event-control
      (defn event-control [action]
        (do (if-not (type this/timerRef) (def this.timerRef))
            ( cond (= "stop" action)
                (do (.pause this/video)
                    (js/clearInterval timerRef))
                   (= "start" action)
                    (do (if (.-ended this/video) (set! (.-currentTime this/video) 0 ))
                        (def this.timerRef
                          (js/setInterval per-frame-function (- this/FPS  5)))
                        (.play this/video))))))
  ))