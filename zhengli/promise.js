// 实现promise
function MyPromise(executor) {
 
  this.value = null
  this.reason = null
  this.status = 'pending'

  var self = this

  function resolve(value) {
    if (self.status !== 'pending') return
    self.value = value
    self.status = 'fulfilled'
  }

  function reject(reason) {
    if (self.status !== 'pending') return
    self.reason = reason
    self.status = 'rejected'
  }
  executor(resolve, reject)
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
  // 变为函数
  if (typeof onFulfilled !== 'function') x => x

  if (this.status === 'pending') {

  } else if (this.status === 'fulfilled') {
    onFulfilled(this.value)
  } else if (this.status === 'rejected') {
    onRejected(this.reason)
  }
  return this
}

MyPromise.prototype.catch = function(onRejected) {
  this.then(()=>{}, onRejected)
}

function All(list) {
  return new MyPromise((resolve, reject) => {
    let value = []
    let count = 0
    for (let [i,p] of list.entries()) {
      this.resolve(p).then(res => {
        value[i] = res
        count++
      }, err => {
        reject(err)
      })
    }
    if (list.length === count) {
      resolve(value)
    }
  })
}

_All = function(list) {
  return new Promise((resolve, reject) => {
    let value = []
    let count = 0
    for (let [i, p] of list.entries()) {
      Promise.resolve(p).then(res => {
        console.log(p)
        value[i] = res
        count++
        // console.log(count, '++')
        if (count === list.length) {
          resolve(value)
        }
      })
    }

  //  setTimeout(() => {
  //   //  console.log(value,'????')
  //   if (count === list.length) {
  //     resolve(value)
  //   }
  //  },0)
    
  })
}

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  resolve(444)
});

_All([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});

// const p = new MyPromise((resolve, reject) => {
//   console.log('start')
//   resolve('ok')
//   reject('error')
// })
// p.then((value) => {
//   console.log(value,'++')
// }).then(value => {
//   console.log(value,'--')
// })
// p.then((value)=> {}, (err) => console.log(err))
// console.log(MyPromise.prototype.then())