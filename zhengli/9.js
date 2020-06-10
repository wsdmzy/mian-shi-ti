// 千分位函数？

function format(num) {
  let res = num.toString()
  let len = res.length
  if (len < 4) return res
  let count = 0,tmp = []
  for (let i = len-1; i >= 0; i--) {
    tmp.push(res[i])
    if (++count % 3 === 0 && i !== 0) {
      tmp.push(',')
    }
  }
  return tmp.reverse().join('')
}


console.log(format(100000))