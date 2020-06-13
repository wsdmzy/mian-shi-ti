- call，apply，bind
  传入对象，(如果传入基本数据类型那么就指向包装类)
  - call，apply  核心借用方法
    js基础api，功能强大
    代码复用，性能优化(栈，堆)，继承(父类的构造函数继承), 原型链, 类型检测, 类数组
    应用场景
    1. isType  Object.prototype.call()
    2. 数组的最大值  [15,6,12,13,16]  Math.max.apply(Math, arr)

  1. 高级变种，func.call(1) -> this指向Number  指向包装类


  - 手写源码bind