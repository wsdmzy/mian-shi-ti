// 手写一个new 两个版本 es6  es5
// es5版本
// var New = function(fn, ...args) {
//   const obj = new Object()  // {} 
//   obj.__proto__ = fn.prototype
//   fn.call(obj, ...args)
//   return obj
// }

function Func1(name) {
  this.name = name
}

// var f1 = New(Func1)
// console.log(f1 instanceof Func1)

//es6写法  Object.setPrototypeOf
var New = function(fn, ...args) {
  const obj = Object.create(fn.prototype)
  fn.call(obj, ...args)
  return obj
}

var f1 = New(Func1)
console.log(f1 instanceof Func1)