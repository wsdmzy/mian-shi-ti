// 解析URL
function func(url) {
  url = decodeURI(url)
  // console.log(url)
  const arr = url.slice(url.indexOf('?')+1).split('&')
  const obj = {} 
  for (let item of arr) {
    let tmp = item.split('=')
    obj[tmp[0]] = tmp[1] 
  }
  console.log(obj)
}



func('http://host.com?name=abc&age=1&native=%E5%B1%B1%E8%A5%BF&subject=12,34,56')