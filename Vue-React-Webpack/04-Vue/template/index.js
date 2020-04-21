const compiler = require('vue-template-compiler')

const template = '<p>{{message}}</p>'


const res = compiler.compile(template)
console.log(res.render)
// with(this){return _c('p',[_v(_s(message))])}  -> vnode
// _c createElement _v createTextVNode  _s toString
// render -> vnode