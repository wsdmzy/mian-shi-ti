const fs = require('fs')

fs.readFile('../reduce2map/1.js', {encoding: 'utf8'}, (err, file) => {
  // console.log(file)
})

const util = require('util')
// 最后一个是回调函数  接受一个常见错误优先的风格的回调函数
// const fsReadfile = util.promisify(fs.readFile)
const fsReadfile = myPromisify(fs.readFile)
fsReadfile('../reduce2map/1.js', {encoding: 'utf8'})
.then(info => {
  console.log(info)
})



// 写一个promisify
function myPromisify(func) {
  return (...args) => {
    return new Promise((resolve, reject) => {
      // 文件读取完？
      func(...args, (err, res) => {
        if (err) reject(err)
        resolve(res)
      })
    })
  }
}

