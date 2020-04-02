# 箭头函数很简便，功能也被简化了
1. this 没有  作用域查找  父级的this
箭头函数   简约  arrow function 缺了很多东西

- super  关键字  举出应用场景吗？ 
  super 是继承关系里 
  class Person {
    constructor() {
      super()

    }
  }
  函数  super  arguments  this
  class super 用法
  别的可能性让我们的js函数有super使用

- 对象间继承关系的新方法 Object.setPrototypeOf(obj2, obj1)
- 函数 this arguments super

2. 'super' keyword unexpected here  箭头函数没有super关键字
3.  new.target expression is not allowed here  箭头函数没有new关键字
  箭头函数不适合用来做构造函数  没有new.target

js一切皆对象  对象 函数  区分一下
对象有__proto__属性  原型对象
函数 prototype  
生成对象时， 对象的__proto__属性指向函数的prototype属性  l.__proto__ == Person.prototype

4. 箭头函数是不可以被new 的  this都没有

Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。