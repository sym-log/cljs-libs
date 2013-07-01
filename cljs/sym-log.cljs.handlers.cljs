(ns sym-log.cljs.handlers)

(defn mousedown [evt] (this-as this
                               (set! (.-selected this) true)
                               (set! (.-xcord this) (.-clientX evt))
                               (set! (.-ycord this) (.-clientY evt))))

(defn mousemove
  [evt] (this-as this
          (if (.-selected this)
            (.setAttribute (.-target evt) "transform"
                           (str
                            "translate("
                            (+ (.-xoff (.-attributes this)) (- (.-clientX evt) (.-xcord this)))
                            ","
                            (+ (.-yoff (.-attributes this)) (- (.-clientY evt) (.-ycord this)))")"))
            )))
                    


(defn mouseup [evt] (this-as this
                               (set! (.-selected this) false)
                               (set! (.-xcord this) 0)
                               (set! (.-ycord this) 0)))

(defn mouseout [evt] (this-as this
                               (set! (.-selected this) false)
                               (set! (.-xcord this) 0)
                               (set! (.-ycord this) 0)))

