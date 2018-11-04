//实现更复杂的服务器，url不仅仅是定位一个静态文件，可以mock任何数据和前端交互。
//本次演示的url是localhost：8080/user/123，localhost：8080之后的内容是路由。
// url里面有localhost：8080，所有请求到8080这个服务器内，根据不同的路由给浏览器发送不同的数据

var http = require('http')
var fs = require('fs')
var url = require('url')



http.createServer(function(req, res){

  var pathObj = url.parse(req.url, true)
  console.log(pathObj)

  switch (pathObj.pathname) {
    case '/getWeather':    //根据req.url来执行不同的函数
      var ret
      if(pathObj.query.city == 'beijing'){
        ret = {
          city: 'beijing',
          weather: '晴天'
        }
      }else{
        ret = {
          city: pathObj.query.city,
          weather: '不知道'
        }
      }
      res.end(JSON.stringify(ret)) //给浏览器输入是一个json格式的对象，根据JSON.stringify转换成字符串
      break;
    case '/user/123':

      res.end( fs.readFileSync(__dirname + '/static/user.tpl' ))
      //如果路由是/user/123，读取user.tpl的内容，并返回给浏览器
      break;
    default:
      res.end( fs.readFileSync(__dirname + '/static' + pathObj.pathname) )
  }
}).listen(8080)



