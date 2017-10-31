/**
 *  format response
 */

module.exports = async (ctx, next) => {
  await next()
  ctx.body = {
    code: 200,
    message: 'success',
    data: ctx.body
  }
}
