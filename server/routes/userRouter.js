const router = require('koa-router')()

// router.prefix('/user')

router.get('/user', function (ctx, next) {
  ctx.body = 'this is a users responsddddde!'
})

router.get('/user/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
