// var arr = ['old', 1, true, ['old1', 'old2'], {old: 1}]

// var new_arr = JSON.parse( JSON.stringify(arr) );

// arr[4].old = 2
// console.log(arr)
// console.log(new_arr);

/**
 * 深拷贝
 * stringify简单
 * 不过不能拷贝函数
 */


var deepCopy = function(obj) {
  if (typeof obj !== 'object') return
  var newObj = obj instanceof Array ? [] : {}
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key]
    }
  }
  return newObj
}