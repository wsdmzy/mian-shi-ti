const path = require('path')
const fse = require('fs-extra')
const multiparty = require('multiparty')

const UPLOAD_DIR = path.resolve(__dirname, "..", "target")


// 获取请求体的数据
const resolvePost = req => new Promise(resolve => {
  // post  慢慢的来的
  let chunk= ""
  req.on("data", data => {
    chunk += data //二进制流
  })
  req.on("end", () => {
    // console.log("end", chunk)
    resolve(chunk)
  })
})

// 截取扩展名
const extractExt = fileName => {
  // console.log(fileName)
  return fileName.slice(fileName.lastIndexOf(".", fileName.length))
}

// 返回已经上传切片的列表
const createUploadedList = async fileHash => 
  fse.existsSync(path.resolve(UPLOAD_DIR, fileHash)) 
    ? await fse.readdir(path.resolve(UPLOAD_DIR, fileHash))
    : []

// 合并文件
const mergeFileChunk = async (filePath, fileHash, size) => {
  const chunkDir = path.resolve(UPLOAD_DIR, fileHash)
  const chunkPaths = await fse.readdir(chunkDir)
  chunkPaths.sort((a,b) => a.split('-')[1] - b.split('-')[1])
  await Promise.all(
    chunkPaths.map((chunkPath, index) => {
      pipeStream(
        path.resolve(chunkDir, chunkPath),
        fse.createWriteStream(filePath, {
          start: index * size,
          end: (index + 1) * size
        })
      )
    })
  )
}

// 写入文件
const pipeStream = (path, writeStream) => new Promise(resolve => {
  const readStream = fse.createReadStream(path)
  readStream.on('end', () => {
    // console.log('+++')
    resolve()
  })
  readStream.pipe(writeStream)
})

module.exports = class {
  // 处理验证请求
  async handleVerifyUpload(req, res) {
    // res.end('ok')
    // 服务器端有没有这个文件
    // 拿到post的data    bodyParser
    const data = await resolvePost(req)
    // console.log(JSON.parse(data))
    const {fileName, fileHash} = JSON.parse(data)
    // console.log(fileName,'1')
    const ext = extractExt(fileName)
    // console.log(ext)
    const filePath = path.resolve(UPLOAD_DIR, `${fileHash}${ext}`)
    // console.log(filePath)
    if (fse.existsSync(filePath)) {
      res.end(
        JSON.stringify({
          shouldUpload: false
        })
      )
    } else {
      res.end(
        JSON.stringify({
          shouldUpload: true,
          uploadedList: await createUploadedList(fileHash)
        })
      )
    }
  }
  // 处理表单提交
  async handFormData(req, res) {
    // 带有文件上传的表单
    const multipart = new multiparty.Form();
    multipart.parse(req, async (err, fields, files) => {
      if (err) {
        console.error(err);
        res.status = 500
        res.end("process file chunk failed")
        return
      }

      const [chunk] = files.chunk;
      const [hash] = fields.hash
      const [fileHash] = fields.fileHash
      const [fileName] = fields.fileName
      // console.log(chunk, hash, fileHash, fileName)
      // console.log(fileName,'2')
      const filePath = path.resolve(UPLOAD_DIR, `${fileHash}${extractExt(fileName)}`)
      const chunkDir = path.resolve(UPLOAD_DIR, fileHash)
      if (fse.existsSync(filePath)) {
        res.end('file exist')
        return 
      } 
      if (!fse.existsSync(chunkDir)) {
        // 目录地址 target
        await fse.mkdirs(chunkDir)
      }
      await fse.move(chunk.path, path.resolve(chunkDir, hash))
      res.end("received file chunk")
    })
  }
  // 处理合并请求
  async handleMerge(req, res) {
    const data = await resolvePost(req);
    const {fileHash, fileName, size} = JSON.parse(data)
    // console.log(JSON.parse(data))
    // console.log(fileName,'3')
    const ext = extractExt(fileName)
    const filePath = path.resolve(UPLOAD_DIR, `${fileHash}${ext}`)
    // console.log(filePath)
    await mergeFileChunk(filePath, fileHash, size)
    res.end(
      JSON.stringify({
        code: 0, 
        message: "file merged success"
      })
    )
  }
}