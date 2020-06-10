// 实现get函数
const o = {
  a:{
    b:{
      c:1
    }
  }
}

function get(obj, str) {
  let arr = str.split('.')
  let res = obj
  arr.forEach(item => {
    res =  res[item]
  })
  return res
}

console.log(get(o,'a.b.c')) //1