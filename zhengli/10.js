// 实现一个每秒输出hello world的函数，要求第三次输出后停止，用闭包实现


let count = 0
function func() {
  
  let time = null
  return () => {
     time = setInterval(() => {
      console.log('hello')
      count++
      if (count === 3) clearInterval(time)
    },1000)
  }
}


func()()