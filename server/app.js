const path = require('path');
const http = require('http');
const express = require('express');
const router = require('./router');
const socketIO = require('./socket.js');

const app = express();
const server = http.createServer(app)
const io = require('socket.io').listen(server);

app.set('view engine', 'jade'); // 设置模板引擎
app.set('views', __dirname + '/static/tpls');  // 设置模板相对路径(相对当前目录)
app.use(express.static(path.resolve(__dirname, '../client')));
// 记录请求时间
app.use((req, res, next) => {
  console.log('request time : ' + new Date() )
  next();
});

// 设置express路由
router(app);

// socket通信事件及相应的处理程序
socketIO(io);

// 监听7777端口(一定要用server来监听，否则socket不能正常链接)
server.listen(7777, () => {console.log('server is started!')});

