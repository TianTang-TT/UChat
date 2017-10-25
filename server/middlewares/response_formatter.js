/**
 *  format response
 */

module.exports = async (ctx, next) => {
  console.log('------------------------response-------------')
  await next()
  ctx.body = {
    code: 200,
    message: 'success',
    data: ctx.body
  }
}
