const config = require('../../config')
const util = require('../util')
/**
 * 获取用户信息组成的数组，用于登录有在线用户列表的初始化
 * @param onlineNumbers
 * @param chatGroup
 * @param user
 */
const getUsersArray = (socket, onlineNumbers) => {
  return [...onlineNumbers.entries()].map(item => {
    return Object.assign({isSelf: item[0] === socket.id}, item[1].info)
  })
}

/**
 * 将用户信息加入在线列表,并自动加入世界频道
 * @param userInfo
 * @param socket
 * @param onlineNumbers
 * @param chatGroup
 */
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
    socket: socket,
    chatmates: new Map()
  })

  worldChannel.participants.set(id, {
    id,
    name: userInfo.name,
    avatar: userInfo.avatar
  })
}

/**
 * 下线之后从online列表中移除，并在所有的聊天中剔除
 * @param socket
 * @param onlineNumbers
 * @param chatGroup
 */
const removeFromOnline = (socket, onlineNumbers, chatGroup) => {
  // 从所有的聊天中退出
  for (let chat of chatGroup.values()) {
    chat.participants.has(socket.id) && chat.participants.delete(socket.id)
  }
  // 从在线人员中删除
  onlineNumbers.delete(socket.id)
}

/**
 * 收到聊天请求后新建一条聊天，并将其加入chatGroup
 * @param requester
 * @param socket
 * @param onlineNumbers
 * @param chatGroup
 * @returns {*}
 */
const initChat = (requester, socket, onlineNumbers, chatGroup) => {
  const chatId = util.genRandomId(16)
  const target = onlineNumbers.get(socket.id)
  // 保存聊天信息，以免重复发起
  requester.chatmates.set(target.id, chatId)
  target.chatmates.set(requester.id, chatId)
  const baseChat = {
    id: chatId,
    name: `${requester.info.name}、${target.info.name}`.substr(0, 12),
    type: 1,
    dialogs: []
  }
  const serverChat = Object.assign({}, baseChat, {
    participants: new Map([[requester.id, requester.info], [target.id, target.info]])
  })
  const clientChat = Object.assign({}, baseChat, {participants: [requester.info, target.info]})

  chatGroup.set(chatId, serverChat)
  return clientChat
}

const quitChat = (socket, chatId, onlineNumbers, chatGroup) => {
  const chatInfo = chatGroup.get(chatId)
  const requester = onlineNumbers.get(socket.id)
  // 如果是单聊，则直接关闭此聊天，如果是非世界频道的其他群聊，则从群聊中删除
  if (chatInfo.type = 1) {
    for (let [participantId, particpantInfo] of  chatInfo.participants) {
      let participant = onlineNumbers.get(participantId)
      // 从彼此的chatMates中删除
      participant.chatmates.delete(requester.id)
      requester.chatmates.delete(participantId)
    }
    chatGroup.delete(chatId)
  } else {
    chatInfo.participants.delete(requester.id)
  }
}

module.exports = {
  getUsersArray,
  addUserToOnline,
  removeFromOnline,
  initChat,
  quitChat
}


