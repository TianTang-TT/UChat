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