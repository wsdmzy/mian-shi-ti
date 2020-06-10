var a = {k1: 1}
var b = a
a.k3 = a = {k2: 2}
console.log(a)
console.log(b)

// a
// { k2: 2 }

// b
// {
//   k1: 1,
//   k3: {k2: 2}
// }

var a = {x:1}
var b = a;
a = a.x = {x:1}
console.log(a)
console.log(b)