// api 是从哪里开始的
// 后端 router -> api -> controller
// 约定一个规则  数据格式， 值 类型 完整性要先约定
// MVVM  api  redux/vuex  actions -> api -> mockjs
module.exports = function(app)  {
  // home contraoller   index
  app.router.get('/', 'home.index')
}