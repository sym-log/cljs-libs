(ns sym-log.cljs.string)


 (defn fetch-first-in-string [str1 arr1 sdx]
   "takes 1) a string to search, 2) a JS array (not cljs) whose elements are
    the individual chars/string to search for in the given string. 3) a start
    index value which can be zero is the whole string is to be searched

    returns the element from arr1 that is found first in str1"
    

(let [ pool (array) ]
     (.forEach arr1 (fn [val] (aset pool (.indexOf str1 val (dec sdx)) val)))
     (aget (.filter pool (fn [v] (if-not (= v nil) v))) 0))
   )
   

