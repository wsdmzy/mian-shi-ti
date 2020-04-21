// const data = {
//   name: "zs",
//   age: 20
// }

const data = [1,2,3]

const proxyData = new Proxy(data, {
  get(target,key, receiver) {
    // 只处理本身(非原型)属性
    const ownKeys = Reflect.ownKeys(target)
    if (ownKeys.includes(key)) {
      console.log('get',key) //监听
    }

    const result = Reflect.get(target,key,receiver)
    // console.log('get',key)
    return result  //结果
  },
  set(target,key, val,receiver) {
    // 重复的数据不处理
    const oldVal = target[key]
    if (val === oldVal) {
      return true
    }

    const result = Reflect.set(target,key,val,receiver)
    console.log('set',key,val)
    console.log('result',result)
    return result  //布尔值
  },
  deleteProperty(target,key) {
    const result = Reflect.deleteProperty(target,key)
    console.log('delete property',key)
    return result //布尔值
  },
})