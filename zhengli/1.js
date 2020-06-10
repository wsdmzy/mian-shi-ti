// 实现counter
function counter(v) {
  let obj = {}

  obj.add = function() {
    return ++v
  }
  obj.sub = function() {
    return --v
  }
  return obj
}
const c = counter(3)
console.log(c.add()) // 4
console.log(c.sub()) // 3
c.add()
console.log(c.add()) // 5