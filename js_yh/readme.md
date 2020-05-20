## 性能优化跟安全

- http://www.baidu.com 发生了什么？
  全栈启用https
  状态码? 307 临时重定向 不会从POST变为GET  
    302临时性重定向， GET没问题，POST -> 降级为GET

- 点击一个a， 不跳转怎么做
  prevent  

  1xx 目前正常 客户端可以继续发送请求或忽略这个响应
  101 Switching Protocol
  HTTP 升级为webscoket时使用
  2xx  204响应成功，没有返回
    205 Reset Content 用来通知客户端重置文档视图 清空表单内容，不要多次提交
    206 范围请求  大文件上传
  3xx 
    301永久跳转 http -> https  域名废弃了，用户从老域名出来
    302临时跳转  307支持POST
    304 Not Modified
      If-Modified-Since  If-None-Match
  4xx
  400 Bad Request 客户端发生错误
  401 unauthorized
  403 请求被拒绝
  404
  405 Method Not Allowed
  408 Request Timeout
  409 多个请求冲突
  413 请求体数据过大
  414 请求里URI 太长
  429 客户端发送太多请求
  431 请求头的字段内容太大

  5XX
  500 Internal Server Error
  501 Not Implemented  服务端不支持该请求
  502 Bad Gateway 网站到客户端的链路网关路由异常。
  503 服务忙

- js 优化？
  - eval with不要用
    eval 可以把任何的js文本运行起来，黑科技，特别消耗性能，安全问题XSS 
    cookie可能有用户身份信息， eval js cookie ajax 发给他自己的服务器jsonp
    用户cookie拿到，
    解决方案是什么
      前后端转义，httpOnly， CSP
      1. httpOnly  核心的cookie加上httpOnly
      2. 用户输入，前后端转义，encodeURIComponent <script> ''
  - 加载的顺序
    css head  尽快看到页面
    script 阻塞  defer  async 
    js 动态的代码，动态操作DOM  下载且执行完毕
    下载，放在body尾部， 阻塞 
    css 雪碧图，没必要了 http请求少 第一次下载的时候有点慢
    alley iconfont 为什么不会影响性能 cdn  部署cdn集群
    背景图 直接img src="" 增加http请求 没有http请求， webpack base64
    如果有请求，http协议更新了 对他的支持，2.0 多路复用
  - JS动画优化， requestAnimationFrame