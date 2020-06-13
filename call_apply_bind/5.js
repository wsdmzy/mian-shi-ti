function supFather(name) {
  this.name = name
  this.calors = ['red', 'blue', 'green']
}

supFather.prototype.sayName = function(age) {
  console.log(this.name, 'age')
}

function sub(name, age) {
  supFather.call(this, name) //call 继承
  this.age = age

}

// 细节
function inheritPrototype(sonFn, fatherFn) {
  // 完成子类对父类的继承
  // 如何实现？
  sonFn.prototype = Object.create(fatherFn.prototype)
  // Object.create 获得原型对象
  // 还有问题吗 ？  构造函数
  sonFn.prototype.constructor = sonFn
}

inheritPrototype(sub, supFather)
sub.prototype.sayAge = function() {

}