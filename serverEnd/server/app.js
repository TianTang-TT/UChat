const path = require('path')
const Koa = require('koa')
const app = new Koa()
const mount = require('koa-mount')
const views = require('koa-views')
const statics = require('koa-static')
const router = require('koa-router')()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const requestLogger = require('./middlewares/requestLogger')
const responseFormatter = require('./middlewares/responseFormatter')
const uchatRouter = require('./routes/uchatRouter')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(mount('/static', statics(path.resolve(__dirname, '../public'))))

app.use(views(path.resolve(__dirname, '../views'), {
  extension: 'pug'
}))

// request logger
app.use(requestLogger)

// routes
router.use('/uchat', responseFormatter, uchatRouter.routes())
app.use(router.routes(), router.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
