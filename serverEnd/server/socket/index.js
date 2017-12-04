/**
 * 初始化socket
 * @param socket
 */
// 处理聊天和在线人员的工具函数集合
const handle = require('./handle')

// 当前在线人员
const onlineNumbers = new Map()

// 群聊，包括私聊和群聊
const chatGroup = new Map()

const worldChannelId = '999999999'
const wordChannel = {
  id: worldChannelId,
  name: '世界频道',
  type: 2,
  participants: new Map(),
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
            users: handle.getUsersArray(onlineNumbers)
          }
        })
      }

      // 加入在线用户列表
      handle.addUserToOnline(userInfo, socket, onlineNumbers, chatGroup)
      callback({
        code: 1,
        message: '登录成功',
        data: {
          user: onlineNumbers.get(id).info,
          users: handle.getUsersArray(socket, onlineNumbers)
        }
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
      } else if (self.chatmates.has(contact.id)) {
        // 检查是否已经建立了与该用户的聊天你，如果有，则返回聊天id
        callback({
          code: 2,
          data: self.chatmates.get(contact.id),
          message: '聊天已存在'
        })
      } else {
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
    socket.on('agreeChat', (requesterId, callback) => {
      const requester = onlineNumbers.get(requesterId)
      if (!requester) {
        return callback({
          code: 0,
          message: '对方已下线',
          data: null
        })
      }
      // 将请求者与被请求这加入聊天群组，并分配一个聊天id,同时加入各自的chatmates数组
      const chat = handle.initChat(requester, socket, onlineNumbers, chatGroup)
      // 将两者加入聊天
      socket.join(chat.id)
      requester.socket.join(chat.id)
      // 向客户端发消息准备新建一个聊天
      socketIO.to(chat.id).emit('startChat', chat)
      // 向客户端返回chatId
      callback({
        code: 1,
        message: '对方同意了您的聊天请求',
        data: chat.id
      })
    })
    // 接受消息事件
    socket.on('message', ({chatId, dialog}) => {
      socketIO.to(chatId).send({
        chatId,
        dialog
      })
    })

    // 用户主动从群聊中退出
    socket.on('quitChat', (chatId, callback) => {
      // TODO
      // 从相应的群聊信息中退出该用户
      handle.quitChat(socket, chatId, onlineNumbers, chatGroup)
      callback({
        code: 1,
        message: 'ok'
      })
      socketIO.to(chatId).emit('quitChat', chatId, onlineNumbers.get(socket.id).info)
    })

    // 从在线列表中删除断连用户
    socket.on('disconnect', () => {
      const userInfo = onlineNumbers.get(socket.id)

      handle.removeFromOnline(socket, onlineNumbers, chatGroup)

      // 发送offline消息给客户端，客户端从本地做处理
      socket.broadcast.emit('offline', userInfo.info)

    });
  })
}