// 对字符串去重，要求时间复杂度为O(n)。

function func(str) {
  // let arr = str.split('')
  // console.log(arr)
  return Array.from(new Set(str.split(''))).join('')
}

console.log(func('aasdffd'))