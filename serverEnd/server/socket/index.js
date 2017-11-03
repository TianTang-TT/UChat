/**
 * 初始化socket
 * @param socket
 */
const util = require('../util')
// 当前在线人员
const onlineNumbers = new Map()

// 群聊，包括私聊和群聊
const chatGroup = new Map()

module.exports = socketIO => {
  socketIO.on('connection', socket => {

    socket.on('login', (userInfo, callback) => {
      let id = userInfo.id
      if (onlineNumbers.has(id)) {
        return callback({
          code: 0,
          message: '该用户已登录',
          data: {
            user: {id, name: userInfo.name},
            users: [...onlineNumbers.values()]
          }
        })
      }
      // 加入在线用户列表
      onlineNumbers.set(id, {id, name: userInfo.name})
      callback({
        code: 1,
        message: '登录成功',
        data: {
          user: {id, name: userInfo.name},
          users: [...onlineNumbers.values()]
        }
      })
      socket.broadcast.emit('online', {id, name: userInfo.name})
    })

    // 接受消息事件
    socket.on('message', msg => {

    })

    // 从在线列表中删除断连用户
    socket.on('disconnect', () => {
      socket.broadcast.emit('offline', onlineNumbers.get(socket.id))
      onlineNumbers.delete(socket.id)
    });
  })
}