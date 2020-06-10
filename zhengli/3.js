// 表示同时只能有2个任务运行，且then中得到的数组顺序和通过Promise.all得到的一致
limitRunTask(tasks, 2).then(console.log);


// function limitRunTask(tasks, num) {
//   if (num >= 2) return
//   return new Promise.all(
//     tasks.forEach(item => new Promise(r => r(item())))
//   )
// }

function limitRunTask(tasks, limit) {
  return new Promise((resolve, reject) => {
    let alive = 0, finish = 0, index = 0, result = []
    function tigger() {
      if (finish >= tasks.length) {
        resolve(result)
        return
      }

      while (alive < limit && index < tasks.length) {
        alive++
        const promise = tasks[index]()
        const curIndex = index
        promise.then(res => {
          result[curIndex] = res
          finish++
          alive--
          tigger()
        })
        index++
      }
    }

    tigger()
  })
}