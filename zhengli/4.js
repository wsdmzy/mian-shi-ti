// 模拟实现instanceof

function instance_of(L, R) {
  var O = R.prototype
  L = L.__proto__
  while (true) {
    if (L === null) return false
    if (O === L) return true // O严格等于L时,返回true
    L = L.__proto__
  }
}

var a = []
console.log(instance_of(a, Array))