const router = require('koa-router')()
const util = require('../util')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/getRandomImg', async (ctx, next) => {
  ctx.body = util.genRandomImg()
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/uchat', async (ctx, next) => {
  ctx.body = 'uchat route test'
})

module.exports = router
