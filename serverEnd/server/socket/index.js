/**
 * 初始化socket
 * @param socket
 */
const util = require('../util')

// 当前在线人员
const onlineNumbers = new Map()

// 群聊，包括私聊和群聊
const chatGroup = new Map()
const worldChannelId = '999999999'
const wordChannel = {
  id: worldChannelId,
  name: '世界频道',
  type: 2,
  participants: [],
  dialogs: []
}
chatGroup.set(worldChannelId, wordChannel)

module.exports = socketIO => {
  socketIO.on('connection', socket => {
     const worldChannel = chatGroup.get(worldChannelId)
    socket.on('login', (userInfo, callback) => {
      let id = userInfo.id
      if (onlineNumbers.has(id)) {
        return callback({
          code: 0,
          message: '该用户已登录',
          data: {
            user: onlineNumbers.get(id),
            users: util.getUsersArray(onlineNumbers)
          }
        })
      }
      // 加入在线用户列表
      onlineNumbers.set(id, {
        info: {
          id,
          name: userInfo.name,
          avatar: userInfo.avatar
        },
        id: id,
        socket: socket
      })
      callback({
        code: 1,
        message: '登录成功',
        data: {
          user: onlineNumbers.get(id).info,
          users: util.getUsersArray(onlineNumbers)
        }
      })

      wordChannel.participants.push({
        id,
        name: userInfo.name,
        avatar: userInfo.avatar
      })
      // 加入世界频道
      socket.join(worldChannelId)
      // 通知别人有人上线了
      socket.broadcast.emit('online', onlineNumbers.get(id).info)
    })

    // 发起聊天
    socket.on('requestChat', (contact, callback) => {
      const self = onlineNumbers.get(socket.id)
      // 检查contact是否在线，并且不是自己跟自己聊天
      if (self.id === contact.id) {
        callback({
          code: 0,
          message: '你太自恋了，居然想和自己聊天'
        })
      } else if (!onlineNumbers.get(contact.id)) {
        callback({
          code: 0,
          message: '你要撩的人不在线'
        })
      } else {
        // 创建房间，开始对话
        socketIO.to(contact.id).emit('requestChat', self.info)
        callback({
          code: 1,
          message: '对方已收到您的请求'
        })
      }
    })

    socket.on('denyChat', requesterId => {
      let requester = onlineNumbers.get(requesterId)
      if (requester) {
        socketIO.to(requesterId).emit('denyChat', {
          code: 0,
          data: requester.info,
          message: `${requester.info.name}拒绝了您的聊天请求`
        })
      }
    })
    // 同意请求，准备创建房间进行聊天
    socket.on('agreeChat', requesterId => {

    })
    // 接受消息事件
    socket.on('message', ({chattingId, dialog}) => {
      socketIO.to(chattingId).send({
        chattingId,
        dialog
      })
    })

    // 用户主动从群聊中退出
    socket.on('quit', (chattingId, user) => {
      // 从响应的群聊信息中退出该用户
    })

    // 从在线列表中删除断连用户
    socket.on('disconnect', () => {
      const userInfo = onlineNumbers.get(socket.id)
      const indexInWorld = worldChannel.participants.findIndex(item => {
        return item.id === userInfo.id
      })
      worldChannel.participants.splice(indexInWorld, 1)
      // 从所有的群聊中退出
      socket.broadcast.emit('offline', userInfo.info)
      onlineNumbers.delete(socket.id)
    });
  })
}