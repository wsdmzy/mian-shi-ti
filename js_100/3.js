// console.log(['1','2','3'].map(parseInt))  // 1 NaN 1 NaN

// parseInt callback  map item, index , arr数组本身, 
// '1' 0   parseInt('1', 0),   第二参数进制 0  10进制
// '2' 1                                   
// '3' 2                                   2进制
// 如果该参数小于 2 或者大于 36，则 parseInt() 将返回 NaN。  0的话默认10进制


// 有个什么需求?  js的函数化能力
// ['1','2','3']    [1,2,3]    
// 如何控制函数参数数量的能力
// let p = function(item, index) {
//   return parseInt(item, 0)
// }
// console.log(['1','2','3'].map(p)) 
let unary  = fn => val => fn(val)    //函数化功能
let parse = unary(parseInt)
console.log(['1','2','3'].map(parse)) 