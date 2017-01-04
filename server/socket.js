// 在线用户列表
const users = new Map();
const socketIO = io => {
  io.on('connection', socket => {
    // 加入在线用户列表
    let userId = socket.id;
    
    // 发送消息测试
    socket.on('login', name => {
      if (!users.has(userId)) {
        users.set(userId, {name});

        let msg = `${name} joined`;
        // 通知其他用户有人加入群聊
        io.sockets.emit('message', {type: 'system', data: msg});
      }      
    });

    // 接受消息事件
    socket.on('message', msg => {
      socket.broadcast.emit('message', {type: 'dialog', data: msg});
    })
    // 从在线列表中删除断连用户
    socket.on('disconnect', () => {
      let user = users.get(userId);
      let msg = `${userId} has left`;
      users.delete(userId);
      socket.broadcast.emit('message', {type: 'system', data: msg});
    });
  });
}
module.exports = socketIO;