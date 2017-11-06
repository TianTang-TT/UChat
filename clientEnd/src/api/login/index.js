import fetch from 'api/fetch'

export function getRandomImg () {
  return fetch({
    method: 'get',
    url: '/getRandomImg'
  })
}
