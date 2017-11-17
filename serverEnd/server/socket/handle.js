const config = require('../../config')
const util = require('../util')
/**
 *
 * @param onlineNumbers
 * @param chatGroup
 * @param user
 * 获取用户信息组成的数组，用于登录有在线用户列表的初始化
 */
const getUsersArray = users => {
  return [...users.values()].map(item => item.info)
}

// 将用户信息加入在线列表,并自动加入世界频道
const addUserToOnline = (userInfo, socket, onlineNumbers, chatGroup) => {
  const id = userInfo.id
  const worldChannel = chatGroup.get(config.worldChannelId)
  onlineNumbers.set(id, {
    info: {
      id,
      name: userInfo.name,
      avatar: userInfo.avatar
    },
    id: id,
    socket: socket
  })

  worldChannel.participants.set(id, {
    id,
    name: userInfo.name,
    avatar: userInfo.avatar
  })
}

const removeFromOnline = (socket, onlineNumbers, chatGroup) => {
  // 从所有的聊天中退出
  for (let chat of chatGroup.values()) {
    chat.participants.has(socket.id) && chat.participants.delete(socket.id)
  }
  // 从在线人员中删除
  onlineNumbers.delete(socket.id)
}

const initChat = (requester, socket, onlineNumbers, chatGroup) => {
  const chattingId = util.genRandomId()
  const target = onlineNumbers.get(socket.id)
  chatGroup.set(chattingId, {
    id: chattingId,
    name: `${requester.name}、${target.name}`.substr(0, 12),
    type: 2,
    participants: new Map([[requester.id, requester], [target.id, target]]),
    dialogs: []
  })
  return chattingId
}

module.exports = {
  getUsersArray,
  addUserToOnline,
  removeFromOnline
}


