export function getRandomId (len = 8) {
  let result = ''
  while (result.length < len) {
    result += Number((Math.random() + '').substring(2)).toString(36)
  }
  return result.substr(0, len)
}

export function imgToCode (str) {
  let emojiReg = /<img.+?data-type="(\w+)".+?data-num="(\d+)".*?>/g
  return str.replace(emojiReg, '[emoji:$1_$2]')
}

export function codeToImg (str) {
  if (!str) return ''
  let codeReg = /\[emoji:(\w+?)_(\d+?)\]/g
  return str.replace(codeReg, (target, s1, s2) => {
    return `<img src="${require('assets/img/' + s1 + '/' + s2 + '.gif')}" type="emoji">`
  })
}

export function filterContent (str) {
  return str.replace(/&nbsp;/g, '').replace(/<br><br>/g, '')
}
