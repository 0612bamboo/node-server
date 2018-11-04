var http = require('http')
// http是nodejs里面的一个模块，这个对象能够提供实现底层的方法。我们通过require去加载这个模块

var server = http.createServer(function(req, res){
  // 函数内部创建一个服务器，创建好之后，通过浏览器访问这个服务器的时候，会把请求封装成一个对象
  // 这个对象就是这个回调函数的第一个参数req。用户请求的信息都在这个对象内，可以获取用户的信息，如ip，请求信息等。
  // 第二个参数res是服务器返回给用户的信息
    console.log('jiengu')
    res.setHeader("Content-Type","text/html; charset=utf-8")
    res.write('<h1> 饥人谷</h1>')
    res.end()
})
server.listen(9000)
// 通过listen方法来启动他，服务器监听9000端口

// var server = http.createServer(function(request, response){
//   setTimeout(function(){
    
    
//     response.setHeader('Content-Type','text/html; charset=utf-8')
//     response.writeHead(404, 'Not Found')
//     response.write('<html><head><meta charset="gbk" /></head>')
//     response.write('<body>')
//     response.write('<h1>你好</h1>')
//     response.write('</body>')
//     response.write('</html>')
    
//     response.end()
//   },2000);
// })

// console.log('open http://localhost:8080')
// server.listen(8080)