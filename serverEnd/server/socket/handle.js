/**
 *
 * @param onlineNumbers
 * @param chatGroup
 * @param user
 */

// 获取用户信息组成的数组，用于登录有在线用户列表的初始化
exports.getUsersArray = users => {
  return [...users.values()].map(item => item.info)
}

// 将用户信息加入在线列表
exports.addUserToOnline = (onlineNumbers, chatGroup, user) => {

}


