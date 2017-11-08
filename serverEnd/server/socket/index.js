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
            user: onlineNumbers.get(id),
            users: [...onlineNumbers.values()]
          }
        })
      }
      // 加入在线用户列表
      onlineNumbers.set(id, {
        id,
        name: userInfo.name,
        avatar: userInfo.avatar
      })
      callback({
        code: 1,
        message: '登录成功',
        data: {
          user: onlineNumbers.get(id),
          users: [...onlineNumbers.values()]
        }
      })
      socket.broadcast.emit('online', onlineNumbers.get(id))
    })

    // 发起聊天
    socket.on('startChat', (contact, callback) => {
      // 检查contact是否在线，并且不是自己跟自己聊天
      if (socket.id === contact.id) {
        callback({
          code: 0,
          message: '再自恋也不能跟自己聊天啊'
        })
      } else if (!onlineNumbers.get(contact.id)) {
        callback({
          code: 0,
          message: '你要撩的人不在线'
        })
      } else {
        // 创建房间，开始对话
        callback({
          code: 1,
          message: '好的，准备发起聊天'
        })
      }
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