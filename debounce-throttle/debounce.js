// 防抖    在一定时间内把定时器清空
const debounce = (fn, delay = 1000) => {
  let timer = null
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}