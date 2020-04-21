// 创建响应式
function reactive(target = {}) {
  if (typeof target !== 'object' || target === null) {
    // 不是对象,返回
    return target
  }

  // 代理配置
  const proxyConf = {
    get(target,key, receiver) {
      // 只处理本身(非原型)属性
      const ownKeys = Reflect.ownKeys(target)
      if (ownKeys.includes(key)) {
        console.log('get',key) //监听
      }
  
      const result = Reflect.get(target,key,receiver)
      // console.log('get',key)
      // return result  //结果
      // 深度监听  性能如何提升?  get递归  不是一次性递归
      return reactive(result)
    },
    set(target,key, val,receiver) {
      // 重复的数据不处理
      const oldVal = target[key]
      if (val === oldVal) {
        return true
      }

      const ownKeys = Reflect.ownKeys(target)
      if (ownKeys.includes(key)) {
        console.log('已有的key',key) 
      } else {
        console.log('新增的key',key) 
      }
  
      const result = Reflect.set(target,key,val,receiver)
      console.log('set',key,val)
      // console.log('result',result)
      return result  //布尔值
    },
    deleteProperty(target,key) {
      const result = Reflect.deleteProperty(target,key)
      console.log('delete property',key)
      return result //布尔值
    },
  }

  // 生成代理对象
  const observed = new Proxy(target, proxyConf)

  return observed
}

const data = {
  name: "zs",
  age: 20,
  info: {
    city: 'beijing'
  }
}

const proxyData = reactive(data)