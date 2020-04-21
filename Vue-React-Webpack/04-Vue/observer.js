

// 更新视图
function updateView() {
  console.log("更新视图")
}

// 重新定义数组原型
const oldArrayProperty = Array.prototype
// 创建新对象，原型指向oldArrayProperty，再扩展新的方法不会影响原型
const arrProto = Object.create(oldArrayProperty);
['push','pop','shift','unshift','splice'].forEach(methodName => {
  arrProto[methodName] = function() {
    oldArrayProperty[methodName].call(this,...arguments)
    updateView() //触发视图更新
  }
})


// 核心实现 重新定义属性，监听起来
function defineReactive(target,key,value) {
  // 深度监听
  observer(value)

  // 核心API
  Object.defineProperty(target,key, {
    get() {
      return value
    },
    set(newVaule) {
      if (newVaule !== value) {
        // 设置新值 深度监听
        observer(newVaule)
        // value 一直在闭包中，此处设置完之后，再get时也是新的value
        value = newVaule

        // 触发更新视图
        updateView()
      }
    }
  })
}

// 观察者
function observer(target) {
  if (typeof target !== 'object' ||  target === null) {
    // 不是对象或数组
    return target
  }

  if (Array.isArray(target)) {
    // 改变原型   没有污染全局原型
    target.__proto__ = arrProto
  }

  // 重新定义各个属性
  for (let key in target) {
    defineReactive(target, key, target[key])
  }
}

const data = {
  name: "zs",
  age: 20,
  info: {
    address: '北京'  //深度
  },
  nums: [10,20,30]
}

// 监听数据
observer(data)

// data.age = 21
// data.age = {num : 21}
// data.age.num = 22
// data.info.address = "南昌"  //深度监听

// // 新增属性
// data.x = "100"
// // 删除属性
// delete data.name
// data.nums.push(40)
data.nums[0] = 100