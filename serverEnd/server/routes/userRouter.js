const router = require('koa-router')()


router.get('/user', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})
router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
