// var arr = ['old', 1, true, null, undefined];

// var arr1 = arr.slice()

// var new_arr = arr.concat();

// new_arr[0] = 'new';



// console.log(arr)
// console.log(arr1)
// console.log(new_arr)

// var arr = [{old: 'old'}, ['old']];

// var new_arr = arr.concat();

// arr[0].old = 'new';
// arr[1][0] = 'new';

// console.log(arr) // [{old: 'new'}, ['new']]
// console.log(new_arr) // [{old: 'new'}, ['new']]


/**
 * 浅拷贝
 */

 var shallowCopy = function(obj) {
  //  只拷贝对象
  if (typeof obj !== 'object') return
  // 根据obj的类型判断是新建一个数组还是对象
  var newObj = obj instanceof Array ? [] : {}
  // 遍历obj 并且判断obj的属性 拷贝
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key]
    }
  }
  return newObj
 }