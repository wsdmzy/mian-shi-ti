const path = require('path')  //路径
const fse = require('fs-extra') // fs 扩展包

const UPLOAD_DIR = path.resolve(__dirname, ".", "target")
// const UPLOAD_DIR = path.join(__dirname,  "target")
// console.log(UPLOAD_DIR)
const fileName = "yb"
const filePath = path.resolve(UPLOAD_DIR, "..", `${fileName}.jpeg`)   //合并后的文件存放位置
// console.log(filePath)
const pipeStream = (path, writeStream) => 
  new Promise (resolve => {
    const readStream = fse.createReadStream(path)  //读取
    readStream.on("end", () => {
      fse.unlinkSync(path); //删除
      resolve()
    })
  readStream.pipe(writeStream)
})

// console.log(filePath)
// 合并文件快
const mergeFileChunk = async (filePath, fileName, size) => {
  // console.log(filePath, fileName, size)
  // 大文件上传时， 设计的后端思想是 每个要上传的文件， 
  //先以文件名为目录名放在target目录下， 把分文件blob 放入这个目录
  // 文件blob上传前要加上index
  // node文件合并肯定是可以的， stream
  const chunkDir = path.resolve(UPLOAD_DIR, fileName)
  // console.log(chunkDir)
  const chunkPaths = await fse.readdir(chunkDir);
  // console.log(chunkPaths)
  chunkPaths.sort((a, b) => a.split('-')[1]-b.split('-')[1])
  // console.log((chunkPaths))
  // 每快内容写入最后的文件，promise
  await Promise.all(
    chunkPaths.map((chunkPath, index) => 
      pipeStream(
        path.resolve(chunkDir, chunkPath),
        fse.createWriteStream(filePath, {   //写入文件
          start: index*size,
          end: (index+1)*size
        })
      )
    )
  )
  // console.log("文件合并成功")
  fse.rmdirSync(chunkDir)
}

mergeFileChunk(filePath, fileName, 0.5*1024*1024);