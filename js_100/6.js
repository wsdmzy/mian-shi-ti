// MVVM 数据劫持

// var arr = [1]
// arr[10000] = 1  // 性能代价和获取的用户体验不成正比
// arr V8存储  对象  
// 容器  V8  数字索引  字符串索引

// function a() {
//   console.time()
//   for (var i = 0; i < arr.length; i++) {  
//     console.log(1)
//   }
//   console.timeEnd()
// }
// a()

// function b() {
//   console.time()
//   arr.forEach(item => console.log(2))  //忽略了undefined  拿到key
//   console.timeEnd()
// }
// b()

// 对数组进行数据劫持   不过对新增数据项没有效果
// vue defineProperty 不支持数组的代理 ？  不太友好
var arr = [1,2,3,4]
arr.forEach((item, index) => {
  // 对每一个属性进行劫持   get set
  Object.defineProperty(arr, index, {
    set: function(val) {
      console.log('set')
      item = val
    },
    get: function(val) {
      console.log('get')
      return item
    }
  })
})

arr[1]
arr[1] = 1
// arr[5] = 2  //新增元素不能劫持
// arr.push(5)
// 尝试让vue 支持数组的劫持  push 等api