// 下面代码中a 在什么情况下会打印1?
// var a = ?
// 简单数据类型是不可能的 a是变化的  对象
// var a = {
//   i: 1,
//   toSting () {
//     return a.i++
//   }
// }

// var a = {
//   num: 0
// }  
// a.valueOf = function() {
//   console.log('valueOf')
//   return ++a.num
// }

// generator
// let a = {
//   gen: (function* () {
//     yield 1;
//     yield 2;
//     yield 3;
//   })(),
//   valueOf() {
//     return this.gen.next().value
//   }
// }

// defineProperty

Object.defineProperty(globalThis, 'a', {
  get: function() {
    if (this.value) {
      return this.value += 1
    } else {
      return this.value = 1
    }
  }
})


if (a == 1 && a == 2 && a == 3) {  //类型
  console.log(1)
}

// == 

// 隐式类型转换number 在判断的时候会调用对象的valueOf  toSting

// 还有别的方法吗?  es6有哪个概念可以让我们的值来一个三段锦
// generator  next