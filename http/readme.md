## TCP协议灵魂之问，巩固你的网络底层基础

1. TCP和UDP的区别
  共同点：位于传输层(两种协议， 应用场景， 参数内容)
  应用层->表示层(解码和编码...)->会话层(session)->传输层->网络层->数据链路层(mac地址)->物理层  OSI七层(Open System Interconnection)
  Web TCP/IP    jpeg Content-Type  images/jpeg
  TCP Transmission Control System   控制

  客户端 Client 浏览器  index.html 10kb html css  并发http请求
  服务的 Server
  HTTP协议  URL  domain -> ip  建立连接  req
  res -> Client  
  10KB? 字节流 
  TCP  建立连接  可信 可控制 
  index.html 10KB 排序  不能少传
  - TCP是一个面向连接的，可靠的(有状态(顺序，收到)，可控制的)，基于字节流的传输层协议。
  buffer 
  - UDP 不太多， 网络直播，电影  传速度为主要的要求  数据的到达 完整性并不要求高
  面向无连接的传输层协议 User Datagram Protocol  
  