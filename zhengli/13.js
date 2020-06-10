// 实现一个compose函数，接收一个数组[a,b,c]，调用compose([a,b,c])(param)后和a(b(c(param)))效果相同。

let compose = (arr) => {
 let result = null,
     first = true;
 return function(param) {
  while(arr.length) {
   let f = arr.pop();
   if (first) {
    result = f(param);
    first = false;
   }
   result = f(result);
  }
  return result;
 }
}