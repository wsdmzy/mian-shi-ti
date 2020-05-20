var http = require('http')

http.createServer((req, res) => {
  if (req.url == '/new_page_not_go') {
    res.writeHead(204)
    return
  }
  // seq x ack +1 seq y ack y+1
  res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
  res.write("Hello world")
  res.end(`
    <html>
      <head></head>
      <body>
        <a href="/new_page_not_go">去新的页面</a>
      </body>
    </html>
  `)
})
.listen(3000)