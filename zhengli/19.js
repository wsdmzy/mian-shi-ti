// 1. call方式继承 / 借用构造函数继承
function Parent1() {
  this.name = 'parent1'
}
function Child1() {
  Parent1.call(this)
  this.type = 'child1'
}
let c1 = new Child1()
// console.log(c1.name)
// console.log(c1 instanceof Parent1)//false
// 2. 原型链式继承
function Parent2() {
  this.name = 'parent2'
  this.arr = [1,2,3]
}
function Child2() {
  this.type = 'child2'
}
Child2.prototype = new Parent2()
let c2 = new Child2()
// console.log(c2.constructor.name)
// console.log(c2 instanceof Parent2)//true
// 3. 组合式继承(前两种的结合)  实现了实例化对象的隔离
function Parent3() {
  this.name = 'parent3'
  this.arr = [1,2,3]
}
function Child3() {
  Parent3.call(this)
  this.type = 'child3'
}
// Child3.prototype = new Parent3()
Child3.prototype = Parent3.prototype  //会修改原型对象
// let c3 = new Child3()
// console.log(c3.constructor.name)
// 4. 寄生组合式继承
function Parent4() {
  this.name = 'parent4'
  this.arr = [1,2,3]
}
function Child4() {
  Parent4.call(this)
  this.type = 'child4'
}
Child4.prototype = Object.create(Parent4.prototype)  //Object.create返回对象的继承
let c4 = new Child4()
console.log(c4.constructor.name)
console.log(c4)