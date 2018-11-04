var http = require('http')
var path = require('path')
// path模块处理url，不同系统（mac/lincx/window）下对url的写法可能不一致的。(一个写成c:/project/code/a.png
// 另外一个可能写成/user/local/project/a.png）。path模块会对这种情况自动处理url类型
var fs = require('fs')
// fs模块用来读取文件数据，也可以往文件里面写数据。
var url = require('url')
// url模块可以自动解析url，得到一个对象，可以获得对应的信息。




function staticRoot(staticPath, req, res){
  console.log(staticPath) 
  //输出static文件的绝对路径，/user/documents/code/node-server/step1/static
  console.log(req.url) 
  //请求的url地址，第一次调用html时，为/index.html，第二次调用css时，就是css/a.css
  var pathObj = url.parse(req.url, true)
  // 解析url，得到url对象（包含protocal/hostname/port/pathname/query等等），即pathobj对象就是url的对象。本次要用的是pathname
  console.log(pathObj)
  
  
  if(pathObj.pathname === '/'){
    pathObj.pathname += 'index.html'
  }
  //如果pathname没有输入（浏览器输入的值只是localhost：8080,没有后缀的话），服务器默认选择去读取和发送index.html文件

  

  var filePath = path.join(staticPath, pathObj.pathname)
  // staticPath=static文件夹的绝对路径, pathObj.pathname=调用文件的后缀地址。
  // 两个加起来得到filePath（用户输入的url想要访问文件的绝对路径），举例本文是/user/documents/code/node-server/step1/static/index.html

  var fileContent = fs.readFileSync(filePath,'binary')
  // res.write(fileContent, 'binary')
  // // 采用同步的方式读取filePath的文档，把读取的数据写入res对象内
  // res.end()
  
  
  fs.readFile(filePath, 'binary', function(err, fileContent){
  // 异步的方式来读取filePath的文档。binary指以二进制的方式来读取数据，因为服务器不仅仅要读取普通的数据，需要兼容图片和文件等数据。
    if(err){
      console.log('404')
      res.writeHead(404, 'not found')
      res.end('<h1>404 Not Found</h1>')
  // 在页面展示404 Not Found。在res.end('数据')等于执行res.write('数据')加上res.end()
    }else{
      console.log('ok')
      res.writeHead(200, 'OK')
      res.write(fileContent, 'binary')
      // 通过二进制的方式发送数据
      res.end()      
    }
  })
  

}

console.log(path.join(__dirname, 'static'))

// 在浏览器输入localhost：8080/index.html地址，浏览器向服务器发起请求。
// 服务器收到请求后，执行相关函数，解析req对象信息，得到了index.html的地址。
// 服务器根据解析的地址在本地static文件夹下找到对应的index.html文件，读取html里面数据，并把数据放在res内，当成字符串发给服务器。

var server = http.createServer(function(req, res){
  staticRoot(path.join(__dirname, 'static'), req, res)  //写一个staticRoot函数，来处理请求。
 /* 参数1：把哪个路径当成静态文件路径，传递路径名。__dirname是nodejs里面的一个变量，代表当前的server.js执行的这个文件。
  path.join(__dirname, 'static')可以使用一个或多个字符串值参数，该参数返回将这些字符串值参数结合而成的路径。
var joinPath = path.join(__dirname, 'a', 'b', 'c');
console.log(joinPath);      //   D:\nodePro\fileTest\a\b\c，
__dirname对应的step1文件夹的路径，加上static文件夹得路径，就等于static的绝对路径。、
  这样的好处是每次绝对路径发生变化的时候，不用重新去修改绝对路径。*/
})

server.listen(8080)  //创建一个服务器，监听8080端口
console.log('visit http://localhost:8080' )



