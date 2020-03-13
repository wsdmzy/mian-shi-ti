const  http = require('http')

const server = http.createServer()

server.on('request', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Header', '*')

  setTimeout(() => {
    res.end("{msg: hello}")
  }, 1000)
})

server.listen(1234, () => {
  console.log("启动成功")
  console.log("进程id", process.pid)
})