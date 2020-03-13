// - 计算hash web Worker   新创建线程

const http = require('http')

const fork = require('child_process').fork  //创建新的进程



http.createServer((req, res) => {
  const compute = fork('./fork_compute.js')
  // const sum = longComputatoon()
  compute.send("开启一个新的进程")
  compute.on('message', sum => {
    res.end(`和为${sum}`)
  })
}).listen(1314, () => {
  console.log(process.pid)
})