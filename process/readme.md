## 深入理解node.js中的进程与线程

- 前端的角度  来看进程与线程
- node 进程 子进程 cluster 多核CPU的利用
- pm2 线上node 运行进程管理
- docker 容器
- k8s 

1. 从前端角度开始
  Node.js是单线程吗？ js 运行在服务器端
    js是单线程  html css js vue jsx node koa
    基于事件机制event loop  回调  另外一个角度解决的能力
    单线程js
    ajax？  微软公司
    新的线程创建出来 ajax 单线程
    JS是单线程， 但是JS宿主浏览器(容器)， 多进程(http 并发 img css html js) 多线程
    注册在主线程  event事件里
    线程间可以相互通信

2. node 当前main.js  进程  <=>  process   pid
  服务器端天生就是多线程的  分布式的 
  js在服务器端执行 单线程的 
  node是服务器端js执行的容器  node是多进程的  node10. 多线程
  单线程  异步 IO  高性能高并发  


js 单线程  容器 浏览器是多进程 多线程
node.js 容器node  高并发  创建进程，线程

- 进程的两种方式
  child_process fork
  cluster fork
  提升运行效率  利用cpu
  nginx 负载均衡  