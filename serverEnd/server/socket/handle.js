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
const addUserToOnline = (userInfo, socket, onlineNumbers, worldChannel) => {
  let id = userInfo.id

  onlineNumbers.set(id, {
    info: {
      id,
      name: userInfo.name,
      avatar: userInfo.avatar
    },
    id: id,
    socket: socket
  })

  worldChannel.participants.push({
    id,
    name: userInfo.name,
    avatar: userInfo.avatar
  })
}

module.exports = {
  getUsersArray,
  addUserToOnline
}


