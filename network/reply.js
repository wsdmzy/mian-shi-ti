var http = require('http')

http.createServer(function(req, res)  {
  // 一份代码 满足后端两种需求
  // 1. axios  proxy  /api/posts  前后端分离    text/json  响应头
  // 2. 传统后端驱动型开发 html  msql + 套页面   text/html
  let posts = [{
    id: '5e8c94a7f265da47a74126d4',
    title: '怎么排查堆内存溢出呀？'
  }, {
    id: '5eb7ebea5188256d723151fb',
    title: '给前端工程师的一张Dart语言入场券'
  }]
  if (req.url === '/posts') { //url  请求行
    if (req.headers['content-type'] === 'text/json') {
      // api 很灵活
      // 返回json
      res.end(JSON.stringify(posts))
    } else {
      // 后端自己建个站
      let postHtml = posts.map(post => `
        <li>
          ${post.id} + ${post.title}
        </li>
      `).join('')
      res.writeHead(200, {'Content-Type': 'text/html;charset=utf8'})
      // res.setHeader()
      res.end(`
        <html>
          <head></head>
          <body>
            <ul>
              ${postHtml }
            </ul>
          </body>
        </html>
      `)
    }
    // res.end('hello')
  }
})
.listen(1314)