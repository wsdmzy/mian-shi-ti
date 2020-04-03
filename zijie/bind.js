Function.prototype.myBind = function(thisObj, ...arg1) {
  // 谁调用bind  最终拼好的参数传给谁
  let fn = this
  
  function foo(...arg2) {
    // fn/this 它上面其实可能有个prototype对象
    // 合并参数
    const args = arg1.concat(arg2)
    // 调用  考虑this
    // 因为this没有绑定到 cat 上面的， 并没有做优先级的处理?? 
    // 应该是new 构造函数如果返回了对象，那么实例的this就指向返回的对象
    // 所以判断当前函数的this是否为new构造出来的，是的话就fn绑定this对象
    // 判断 是不是 this调用？？ .target 
    let isNewCall = this instanceof foo
    // isNewCall ？ 实例  :  thisObj
   
    // fn调用完之后有结果返回
    return fn.apply(isNewCall ? this : thisObj,args)
  }
  // foo.prototype = Object.create(fn.prototype)
  foo.prototype = fn.prototype
  return foo
}

function Animal(name, color) {
  this.name = name;
  this.color = color;
}
Animal.prototype.say = function () {
  return `I'm a ${this.color} ${this.name}`;
};
const Cat = Animal.myBind(null, 'cat');
// Cat由myBind生成的  myBind返回了foo
// Cat === foo
// 由一个方法(这个方法可能存在prototype对象) 调用bind -> 经过bind处理 处理完返回一个方法 
// -> 返回一个方法把原来可能存在的prototype弄丢了
const cat = new Cat('white'); //new foo()
// console.log(cat) 
// cat 
console.log(cat.say())
if (cat.say() === 'I\'m a white cat' &&
  cat instanceof Cat && cat instanceof Animal) {
  console.log('success');
}






const sum = (a,b,c) => {
  return a+b+c
}

var sum1 = sum.bind(null, 1,2)
console.log(sum1(3))