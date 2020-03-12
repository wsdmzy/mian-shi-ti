const http = require('http')
const server = http.createServer()

const Controller = require('./controller.js')
const controller = new Controller;

server.on("request", async (req, res) => {

  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Headers", "*")

  if (req.method == "OPTIONS") {
    res.status = 200
    res.end()
    return
  }

  if (req.url == '/verify') {
    // res.end('ok')
    await controller.handleVerifyUpload(req, res)
  }

  if (req.url == '/') {
    // 上传切片处理 
    await controller.handFormData(req, res)
  }

  if (req.url == '/merge') {  //合并
    await controller.handleMerge(req, res)
    return
  }

})


server.listen(3000, () => {
  console.log("启动成功")
})