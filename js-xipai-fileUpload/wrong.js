let arr = [0,1,2,3,4,5,6,7,8,9]
let sum = [0,0,0,0,0,0,0,0,0,0]
// 伪随机
function shuffle(arr) {
  arr.sort(() => Math.random() - 0.5)   //并不是真正的乱序
  return arr
}

let t = 10000

for (let i = 0; i < 5; i++) {
  let sorted = shuffle(arr.slice(0))
  // console.log(sorted)
  sorted.forEach((num,i) => {
    sum[i] = num + sum[i]
  })
}
console.log(sum.map(n => n / 5))

function bubble(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length-i-1; j++) {
      if (arr[j] < arr[j+1]) {
        [arr[j],arr[j+1]] = [arr[j+1], arr[j]]
      }
    }
  }
  console.log(arr, '+++')
  return arr
}

bubble([5,6,9,1,2,3,4])