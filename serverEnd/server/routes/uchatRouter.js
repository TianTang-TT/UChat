const router = require('koa-router')()
const util = require('../util')

/**
 * 获取随机图片
 */
router.get('/getRandomImg', async (ctx, next) => {
  ctx.body = util.genRandomImg()
})

module.exports = router
