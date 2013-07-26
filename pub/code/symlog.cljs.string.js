goog.provide('symlog.cljs.string');
goog.require('cljs.core');
symlog.cljs.string.fetch_first_in_string = (function fetch_first_in_string(str1,arr1,sdx){
var pool = [];
arr1.forEach((function (val){
return (pool[str1.indexOf(val,(sdx - 1))] = val);
}));
return (pool.filter((function (v){
if(!(cljs.core._EQ_.call(null,v,null)))
{return v;
} else
{return null;
}
}))[0]);
});
