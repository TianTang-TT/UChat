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
 * 获取某个聊天你的用户，返回当前聊天你的用户列表数组
 * @param chatId
 * @param chatGroup
 * @returns {[null]}
 */
const getChatUsers = (chatId, chatGroup) => {
  const chat = chatGroup.get(chatId)
  return [...chat.participants.values()]
}

/**
 * 获取聊天信息，返回一个信息对象
 * @param chatId
 * @param chatGroup
 * @returns {*}
 */
const getChatInfo = (chatId, chatGroup) => {
  const chat = chatGroup.get(chatId)
  const participants = [...chat.participants.values()]
  return Object.assign({}, chat, {participants})
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

/**
 * 主动退出群聊，清理群聊信息，删除chatMates信息
 * @param socket
 * @param chatId
 * @param onlineNumbers
 * @param chatGroup
 */
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

/**
 * 获取可邀请的人员数组
 * @param socket
 * @param chatId
 * @param onlineNumbers
 * @param chatGroup
 */
const getAvailableUsers = (socket, chatId, onlineNumbers, chatGroup) => {
  // 如果chatId不存在，说明新建一个群聊，而不是在一个群聊的基础上邀请别人
  if (!chatId) {
    return getUsersArray(socket, onlineNumbers).filter(item => item.id != socket.id)
  } else {
    // 先获取当前聊天中的人员列表
    const participants = chatGroup.get(chatId).participants
    // 获取剩下的不在此聊天中的人员，差集
    return getUsersArray(socket, onlineNumbers).filter(item => {
      return !participants.has(item.id)
    })
  }
}

/**
 * 将用户加入已有的群聊
 * @param chatId
 * @param users
 * @param onlineNumbers
 * @param chatGroup
 * @returns {Array}
 */
const addUsersToChat = (socket, chatId, users, onlineNumbers, chatGroup) => {
  const chat = chatGroup.get(chatId)
  const result = []
  // 将users加入
  if (!users.length) return result
  // 将单聊改为群聊的同时，清除各个user的chatmates
  if (chat.type == 1) {
    let users = [...chat.participants.keys()]
    chat.participants.forEach(item => {
      let user = onlineNumbers.get(item.id)
      users.forEach(par => {
        if (user.id != par) {
          user.chatmates.delete(par)
        }
      })
    })
    chat.type = 2
  }
  // 对新加入的人来说是新建群聊
  users.forEach(item => {
    const user = onlineNumbers.get(item.id)
    // 加入群聊频道
    user.socket.join(chatId)
    chat.participants.set(item.id, item)
  })
}

module.exports = {
  getUsersArray,
  getChatUsers,
  getChatInfo,
  addUserToOnline,
  removeFromOnline,
  initChat,
  quitChat,
  getAvailableUsers,
  addUsersToChat
}
