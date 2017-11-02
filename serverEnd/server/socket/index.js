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

    socket.on('login', (userName, callback) => {
      // 上线之后生成16位的id，并将其加入到在线列表
      let userId = util.genRandomId(16)
      let isLogin = onlineNumbers.has(userId)
      if (!isLogin) {
        onlineNumbers.set(userId, {userId, userName})
        callback([...onlineNumbers.values()])
        io.sockets.emit('onlineChange', [...onlineNumbers.values()])
      }
    })
  })
}