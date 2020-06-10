// 实现一个sum函数，sum(1,2)(3).valueOf()这样调用后的结果为6

function sum(...arg1) {
  let res = { arr: [] }
  res.valueOf = function() {
    return res.arr.reduce((pre,val) => pre + val)
  }
  return (...arg2) => {
    res.arr = arg1.concat(arg2)
    return res
  }
 
}


console.log(sum(1,2)(3).valueOf())