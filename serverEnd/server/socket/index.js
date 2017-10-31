/**
 * 初始化socket
 * @param socket
 */
module.exports = socketIO => {
  socketIO.on('connection', socket => {
    socket.emit('news', {hello: 'world'})
  })
}