<template>
  <div id="app">
    <div>
      <input type="file" @change="handleFileChange">
      <el-button @click="handleUpload">上传</el-button>
      <el-button @click="handleResume">恢复</el-button>
      <el-button @click="handlePause">暂停</el-button>
    </div>
    <div>
      <div>计算文件hash</div>
      <el-progress :percentage="hashPercentage"></el-progress>
      <div>总进度</div>
      <!-- 每个blob 进度  计算出来？ 
        1. 每块blob上传 值percentage 变得  watch
        2. 计算属性 computed
       -->
      <el-progress :percentage="fakeUploadPercentage"></el-progress>
    </div>
    <!-- 多个切片 -->
    <el-table :data="data">
      <el-table-column prop="hash" label="切片的hash" align="center">
      </el-table-column>
      <el-table-column label="大小(kb)" align="center" width="120" >
        <!-- {row}一行的数据 -->
        <template v-slot="{row}">
          {{row.size | transformByte}}
        </template>
      </el-table-column>
      <el-table-column label="进度" align="center">
        <template v-slot="{row}">
          <el-progress :percentage="row.percentage" color="#909399"></el-progress>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
const Status = {   //良好的代码风格  enum  有利于代码的可读性
  wait: "wait",
  pause: "pause",
  uploading: "uploading"
}
const SIZE = 10*1024*1024

export default {
  name: 'App',
  filters: {
    transformByte(val) {
      return Number((val/1024).toFixed(0))
    }
  },
  computed: {
    uploadPercentage() {
      if (!this.container.file || !this.data.length) return 0
      // console.log(this.data)
      const loaded = this.data.map(item => item.size * item.percentage)  //每个blob已上传大小
        .reduce((acc, cur) => acc + cur) //已上传得总文件大小
      // console.log(loaded)
      return parseInt((loaded/this.container.file.size).toFixed(2))
    }
  },
  watch: {
    uploadPercentage(now) {  //now 新的值
      if (now > this.fakeUploadPercentage) {
        this.fakeUploadPercentage = now
      } 
    },
    // requestList(now) {
    //   console.log(now)
    // }
  },
  data: () => ({
    container: {  //将我们的任务放到一起
      file: null,
      hash: "", //哈希
    },
    status: Status.wait,
    hashPercentage: 0,
    data: [], //要上传的数据
    requestList: [],   //xhr 保存要上传的xhr对象
    fakeUploadPercentage: 0
  }),
  methods: {
    //恢复上传
    async handleResume() {
      this.status = Status.uploading
      const {uploadedList} = await this.verifyUpload(
        this.container.file.name,
        this.container.hash
      )
      console.log(uploadedList)
      await this.uploadChunks(uploadedList)
    },
    // 暂停上传
    handlePause() {
      this.status = Status.pause; //状态 暂停
      this.resetData()
    },
    // 暂停清空
    resetData() {
      this.requestList.forEach(xhr => xhr.abort())
      this.requestList = [] 
      if (this.container.worker) {   //hash计算过程
        this.container.worker.onmessage = null
      }
    },
    //文件上传
    handleFileChange(e) {
      // console.log(e.target.files)
      // 文件分割
      const [file] = e.target.files  //第一个文件
      this.container.file = file
      this.resetData()
      // Object.assign(this.$data, this.$options.data())

    },
    // 点击上传
    async handleUpload(e) {
      // 大量的任务
      if (!this.container.file) return
      this.status = Status.uploading
      const fileChunkList = this.createFileChunk(this.container.file)
      // console.log(fileChunkList)
      this.container.hash = await this.calulateHash(fileChunkList)
      // 文件 hash相同的话  没必要同一个文件多次上传
      // console.log(this.container.hash)
      const {shouldUpload, uploadedList} = await this.verifyUpload(  //上传 验证
        this.container.file.name,
        this.container.hash
      )

      if (!shouldUpload) {
        this.$message.success("秒传:上传成功！")
        this.status = Status.wait
        return
      } 

      this.data = fileChunkList.map(({file}, index) => ({
        fileHash: this.container.hash,
        index,
        hash: this.container.hash + "-" + index, //每个块都有自己的index在内的hash  可排序  可追踪
        chunk: file,
        size: file.size,
        percentage: uploadedList.includes(index)?100:0  //当前切片是否上传过
      }))

      await this.uploadChunks(uploadedList)   //上传切片
    },
    // es6的特效和代码是如何结合的？？？ 
    // 上传这个参数
    //创建文件切片
    createFileChunk(file, size = SIZE) {
      const fileChunkList = []

      let cur = 0
      while (cur < file.size) {
        fileChunkList.push({
          file: file.slice(cur, cur+size)
        })
        cur += size
      }
      
      return fileChunkList
    },
    // 计算文件hash
    calulateHash(fileChunkList) {
      return new Promise(resolve => {
        // 封装花时间的任务
        // web workers
        // js 单线程的  UI主线程  
        // html5  web workers 单独开一个线程  独立于   worker
        // 回调  不会影响原来的UI
        // html5 带来的优化 
        this.container.worker = new Worker('/hash.js')
        this.container.worker.postMessage({fileChunkList})
        this.container.worker.onmessage = e => {
          // console.log(e.data)
          const {percentage, hash} = e.data
          this.hashPercentage = percentage
          if (hash) {
            resolve(hash)
          }  
        }
      })
    },
    // 发送请求 验证
    async verifyUpload(fileName, fileHash) {
      // console.log(fileHash)
      const {data} = await this.request({
        url: 'http://localhost:3000/verify',
        headers: {
          "content-type": "application/json"
        },
        data: JSON.stringify({
          fileName,
          fileHash
        })
      })
      // console.log(typeof data)
      return JSON.parse(data)
    },
    // 封装requset请求
    request({
      url,
      method = 'POST',
      data,
      onProgress = e => e,
      headers = {},
      requestList //上传的文件列表
    }) {
      return new Promise(resovle => {
        const xhr = new XMLHttpRequest(); //js ajax 对象
        xhr.open(method, url); //请求
        xhr.upload.onprogress = onProgress // 数据传输进行中// 数据传输进行中
        Object.keys(headers).forEach(key => {
          xhr.setRequestHeader(key, headers[key])   //设置头信息
        })
        // 发送请求
        xhr.send(data);
        // 将xhr保存到requestList数组中
        requestList?.push(xhr);
        // console.log(requestList)
        // 获取服务器端向客户端返回的数据
        xhr.onload = e => {
          if (requestList) {
            // 将请求成功的xhr 从列表中删除
            const xhrIndex = requestList.findIndex(item => item == xhr)
            requestList.splice(xhrIndex, 1);
            // console.log(requestList)
          }
          resovle({
            data: e.target.response
          })
        }
        // if (requestList) {
        //   requestList.push(xhr)  //每个请求 
        //   // console.log(requestList)
        // }
       
      })
    },
    // 上传切片  同时过滤已上传的切片
    async uploadChunks(uploadedList = []) {
      // console.log(this.data)
      // 数据数组 this.data => 请求数组 => 并发
      const requestList = this.data
        .filter(({hash}) => !uploadedList.includes(hash))
        .map(({chunk, hash, index}) => {
          const formData = new FormData() //js from
          formData.append("chunk", chunk)
          formData.append("hash", hash)  //哈希加index
          formData.append("fileName", this.container.file.name)
          formData.append("fileHash", this.container.hash) 
          return {formData, index}
        })
        .map(async ({formData, index}) => this.request({
          url: 'http://localhost:3000',
          data: formData,
          onProgress: this.createProgressHandler(this.data[index]),
          requestList: this.requestList   //
        }))
      await Promise.all(requestList);
      // console.log("可以发送合并请求了")
      // 之前上传的切片数量+本次上传的切片数量=所有切片数量
      if (uploadedList.length + requestList.length == this.data.length) {
        await this.mergeRequest()
      }
    },
    // 文件上传进度条
    createProgressHandler(item) {
      return e => {
        // console.log(e)
        item.percentage = parseInt(String((e.loaded/e.total)*100))
        // console.log(item,'++++')
      }
    },
    // 合并通知
    async mergeRequest() {
      await this.request({
        url: 'http://localhost:3000/merge',
        headers: {
          "content-type": "application/json"
        },
        data: JSON.stringify({
          size: SIZE,
          fileHash: this.container.hash,
          fileName: this.container.file.name
        })
      })
      this.$message.success("上传成功")
      this.status = Status.wait
    }
  }
}
</script>

<style>

</style>
