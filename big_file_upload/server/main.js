const http = require('http')
const path = require('path')
const multiparty = require('multiparty')
const fse = require('fs-extra')
const server = http.createServer();

const UPLOAD_DIR = path.resolve(__dirname, ".", "target")

server.on("request", async (req, res) => {
  
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Headers", "*")
  res.end("hello")
  if (req.url == '/') {
    // chunk filename
    const multipart = new multiparty.Form();
    // console.log(multipart)
    multipart.parse(req, async (err, fields, files) => {
      if (err) return
      // console.log(fields)
      const [chunk] = files.chunk;  //拿到了文件快
      const [filename] = fields.filename
      // console.log(filename)
      const dir_name = filename.split('-')[0]
      const chunkDir = path.resolve(UPLOAD_DIR, dir_name)
      if (!fse.existsSync(chunkDir)) {
        await fse.mkdirs(chunkDir)
      }
      // console.log(chunk.path)
      await fse.move(chunk.path, `${chunkDir}/${filename}`)
    })
  }
  // if (req.url == '/merge') {
  //   res.end('ok')
  // }
})

server.listen(3000, () => console.log("启动"))