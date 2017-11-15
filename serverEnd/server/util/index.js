const config = require('../../config')

exports.genRandomId =  (len = 8) => {
  let result = ''
  while (result.length < len) {
    result += Number((Math.random() + '').substring(2)).toString(36)
  }
  return result.substr(0, len)
}

exports.genRandomInt = (m, n) => {
  return parseInt(Math.random() * (n - m + 1) + m, 10)
}

exports.genRandomImg = () => {
  return `${config.domain}:${config.port}/static/images/avatars/avatar_${this.genRandomInt(1, 16)}.jpg`
}
