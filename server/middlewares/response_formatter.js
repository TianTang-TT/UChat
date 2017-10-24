/**
 *  format response
 */
const responseFormatter = ctx => {
  ctx.body = {
    code: 200,
    message: 'success',
    data: ctx.body
  }
}

module.exports = reg => {
  return async (ctx, next) => {
    // 先执行路由，等回溯的时候对结果进行格式化
    await next()
    // format response
    reg.test(ctx.originalUrl) && responseFormatter(ctx)
  }
}
