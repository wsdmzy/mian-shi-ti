https://item.jd.com/100006729770.html

- 快速打开页面  
  - ssr 服务器端渲染， node  .vue template 服务器端 html 直接输出到客户端  seo， 
    不过ssr 特别是电商项目，不适合，会炸  高并发  后端实时编译，内存开销大
  - 静态化服务 100006729770.html
    GET /100006729770.html    MVC/SSR  商品详情页  数据库查出数据， node页面模板<%= %>输出
    SEO JAVA/GO/NODE
    100006729770.html  静态化服务  动态页面
      一个人来访问时， database template co'mplie -> res之后，
      把生成的html png/js/css 缓存起来， 服务器压力降低  cdn
    个人网站，可以全站静态化， 基本不太改变  SEO 喜欢纯html网页
  首页静态化 一定需要的
  1. 用户都是从首页进入   缓解了服务器压力  中央服务器(动态内容) + cdn(静态内容)
  2. 静态化， 双11，天猫会把首页在cdn缓存 过期事件

- https://item.jd.com/100006729770.html  除了静态化外，这个网页怎么实现动态输出？
  编译，替换
  京东的商品详情页，静态化，
    1. 因为SEO，花大量的钱做网络推广
    2. 服务器优化
    商品的基本详情 + 商品的介绍(后台通过编辑) 有静态化的需求
    ajax 动态加载
    分屏加载
    。