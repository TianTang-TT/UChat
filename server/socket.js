const socketIO = io => {
  io.on('connection', socket => {
    // 发送消息测试
    socket.on('foo', data => {
      console.log(data);
    });

    // 接受消息事件
    socket.on('message', msg => {

    })
    // 从在线列表中删除断连用户
    socket.on('disconnect', socket => {

    });
  });
}
module.exports = socketIO;