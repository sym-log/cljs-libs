(ns symlog.cljs.handlers)


(defn mousedown [evt] (this-as this
                               (.preventDefault evt)
                               (set! (.-selected this) true)
                               (set! (.-Xmark this) (.-clientX evt))
                               (set! (.-Ymark this) (.-clientY evt))))

(defn mousemove [evt] (this-as this
                               (if (.-selected this)
                                 (do
                                   (.preventDefault evt)
                                   (.setAttribute (.-currentTarget evt) "x"
                                                  (+ (.-x (.-attributes this))
                                                     (- (.-clientX evt) (.-Xmark this))))


                                   (.setAttribute (.-currentTarget evt) "y"
                                                  (+ (.-y (.-attributes this))
                                                     (- (.-clientY evt) (.-Ymark this))))

                                  ))))

(defn mouseup [evt] (this-as this
                             (if (.-selected this)
                               (do
                                 (.preventDefault evt)
                                 (set! (.-selected this) false)
                                   (.setAttribute (.-currentTarget evt) "x"
                                                  (+ (.-x (.-attributes this))
                                                     (- (.-clientX evt) (.-Xmark this))))


                                   (.setAttribute (.-currentTarget evt) "y"
                                                  (+ (.-y (.-attributes this))
                                                     (- (.-clientY evt) (.-Ymark this))))

                                   (set! (.-x (.-attributes this)) (.-value (.-baseVal (.-x (.-currentTarget evt)))))
                                   (set! (.-y (.-attributes this)) (.-value (.-baseVal (.-y (.-currentTarget evt)))))
))))


(defn mouseout [evt] (this-as this
                             (if (.-selected this)
                               (do
                                 (.preventDefault evt)
                                 (set! (.-selected this) false)
                                   (.setAttribute (.-currentTarget evt) "x"
                                                  (+ (.-x (.-attributes this))
                                                     (- (.-clientX evt) (.-Xmark this))))


                                   (.setAttribute (.-currentTarget evt) "y"
                                                  (+ (.-y (.-attributes this))
                                                     (- (.-clientY evt) (.-Ymark this))))

                                   (set! (.-x (.-attributes this)) (.-value (.-baseVal (.-x (.-currentTarget evt)))))
                                   (set! (.-y (.-attributes this)) (.-value (.-baseVal (.-y (.-currentTarget evt)))))
))))
