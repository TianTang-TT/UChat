// 在线用户列表
const users = new Map();
const socketIO = io => {
  io.on('connection', socket => {
    let userId = socket.id;

    socket.on('login', name => {
      let headline = '';
      if (!isLogin(userId)) {
        users.set(userId, {name, headline});

        let msg = `${name} joined`;
        // 通知其他用户有人加入群聊
        io.sockets.emit('message', {type: 'system', data: msg});
        io.sockets.emit('membersChange', userArr());
      }      
    });

    // 接受消息事件
    socket.on('message', msg => {
      if (isLogin(userId)) {

        socket.broadcast.emit('message', msg);
      }     
    })
    // 从在线列表中删除断连用户
    socket.on('disconnect', () => {
      let user = users.get(userId);
      let msg = `${user.name} left`;
      users.delete(userId);
      socket.broadcast.emit('membersChange', userArr());
      socket.broadcast.emit('message', {type: 'system', data: msg});
    });
    function isLogin (id) {
      if (users.has(id)) {
        return true;
      }
      return false;
    }
    function userArr() {
      let values = users.values();
      return [...values]
    }
  });
}
module.exports = socketIO;