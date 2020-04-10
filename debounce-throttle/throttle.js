// 节流   定时器触发了才可以触发下一次定时器
const throttle = (fn, delay = 500) => {
  let flag = true
  return (...args) => {
    if (!flag) return
    flag = false
    setTimeout(() => {
      fn.apply(this,args)
      flag = true
    }, delay)
  }
}