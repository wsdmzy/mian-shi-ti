/**
 * map  遍历 返回新数组
 * 
 */
var arr = [{age:10}, {age:20}]
// age*2
// var newArr = arr.map(e => {
//   return {
//     ...e,
//     age: e.age*2
//   }
// })
// console.log(newArr)

Array.prototype._map = function(fn, cbThis) {
  // let res = []
  // let CBThis = cbThis || null
  return this.reduce((before, current) => {
    // res.push(fn.call(CBThis, after, idx, arr))
    let res = fn(current)
    return before.concat(res)
  }, [])
  // return res
}

Array.prototype._filter = function(fn,cbThis) {
  
  return this.reduce((before, current) => {
    let res = fn(current)
    return res ? before.concat(current) : before
  }, [])
}


var newArr = arr._map(e => {
  return {
    ...e,
    age: e.age*2
  }
})
console.log(newArr)

console.log(newArr._filter(item => item.age === 20))




