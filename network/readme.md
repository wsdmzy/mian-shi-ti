- 请问，web 交互的数据格式是什么？ 有没有方法在用户请求时提供多种数据返回格式的选择？
  ajax  json / html
  传统老的浏览器  html
  动态web  ajax  text/json
  mvc mvvm

- 计算机网络这块的知识点，最好是历史课 ？
  1. 为什么http  createServer cb  req + res 表达出来呢 ？
    浏览器n和服务器1之间的通信  http协议
    http协议构建与TCP/IP协议之上的网络应用层协议
    http/0.9  1991 学术交流， 网络之间传输html 超文本内容
    请求响应的模式  TCP安全连接管道
    简单协议的api化
    - http基于TCP/IP 客户端 IP地址(dns damain), 端口, 
      三次握手，建立连接
      dns  递归的查找过程  浏览器缓存->host文件->运营商->...->美国 DNS
      三次握手
        确保双方都有发送和接受数据包的能力  SYN ACK 
        1. bowser  syn(seq+j)  SYN_SENT  同步序列序号 
        2. ack = j + 1 发回给你  发送一个自己的seq = k
        3. bowser  establised 状态 ack = k + 1
      四次挥手  断开连接 1 : n
      发送完请求后
      1. A  -> TCP 发送完毕  B   FIN报文
      2. B  接受到  不会立即用FIN报文回复主机A， 主机A发送一个确认ACK，同时通知自己相应的应用程序 (防止A多次发送FIN报文)
      3. TCP向A发送FIN报文端，
      4. A 收到FIN 报文，B ACK 表示彻底释放
    - 1.0 版本
      

  2. 在哪个http版本中支持png的解析

  3. 雪碧图 http请求， 合并到一张背景图上， 前端性能优化技术，为什么现在不考了？在哪个http版本里

  4. userAgent 在哪个版本出现

  5. 哪个版本极大提升了下载速度