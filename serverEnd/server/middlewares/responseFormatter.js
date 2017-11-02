/**
 *  format response
 */

module.exports = async (ctx, next) => {
  await next()
  ctx.body = {
    code: 1,
    message: 'success',
    data: ctx.body
  }
}
