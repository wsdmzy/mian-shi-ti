let arr = [0,1,2,3,4,5,6,7,8,9]
// 每个数都参与交换
// 9: 和未洗牌的区间 0~9 选择一个随机数 交换
// 8: 0~8
// ...
function shuffle(arr) {
  const len = arr.length
  for (let i=0; i < len; i++) {
    let randomIndex = Math.floor(Math.random() * (len-i))  //区间
    console.log(randomIndex)
    // [ arr[len-1-i], arr[randomIndex] ] = [ arr[randomIndex], arr[len-1-i] ]
    let temp = arr[randomIndex]
    arr[randomIndex] = arr[len-1-i]
    arr[len-i-1] = temp
  }
  return arr
}
console.log(shuffle(arr))