// 手写代码  逻辑感  想 抽象
// 返回一个新函数，this指向第一个参数
// 1. 拷贝原函数
  // - 通过变量存储原函数
  // - Object.create 赋值原海南函数的prototype
// 2. 将其返回
// 3. 调用的时候区别？
// new  和  普通函数的调用

Function.prototype.myBind = function(objThis, ...args1) {
  let fn = this
  function foo(...args2) {

    let args = args1.concat(args2)

    // 判断是否new？  this覆盖为上下文对象   Object() 基本数据类型包装类
    let context = this instanceof foo ?  this : Object(objThis) //

    return fn.apply(context , args)

  }

  foo.prototype = Object.create(fn.prototype)

  return foo
}