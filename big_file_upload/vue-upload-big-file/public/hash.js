// self ->  this  当前的线程
// 通过内容计算md5值
self.importScripts('/spark-md5.min.js')
self.onmessage = e => {
  // self.postMessage({
  //   "msg": "你好"
  // })
  const {fileChunkList}  = e.data;
  // console.log(fileChunkList)
  const spark = new self.SparkMD5.ArrayBuffer()
  let percentage = 0
  let count = 0
  // 计算hash值
  const loadNext = index => { 

    const reader = new FileReader()   //文件阅读对象
    reader.readAsArrayBuffer(fileChunkList[index].file)
    reader.onload = e => {
      count++
      spark.append(e.target.result)
      if (count === fileChunkList.length) {
        // console.log(count)
        self.postMessage({
          percentage: 100,
          hash: spark.end()
        })
        self.close()
      } else {
        // 还没读完
        percentage += 100/fileChunkList.length
        self.postMessage({
          percentage
        })
        loadNext(count)
      }
      
    }

    
    
  }
  loadNext(0)
}