/**
 * 初始化socket
 * @param socket
 */
// 当前在线人员
const onlineNumbers = []

// 群聊，包括私聊和群聊
const chatGroup = {}

module.exports = socketIO => {
  socketIO.on('connection', socket => {
    socket.on('login', user => onlineNumbers.push(user))
  })
}