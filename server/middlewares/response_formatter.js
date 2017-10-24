/**
 *  format response
 */

module.exports = async (ctx, next) => {
  // 先执行路由，等回溯的时候对结果进行格式化
  await next()

  // 将执行结果转为固定的格式
  ctx.body = {
    code: 200,
    message: 'success',
    data: ctx.body
  }
}