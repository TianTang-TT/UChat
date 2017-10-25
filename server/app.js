const Koa = require('koa')
const app = new Koa()
const mount = require('koa-mount')
const views = require('koa-views')
const statics = require('koa-static')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const requestLogger = require('./middlewares/request_logger')
const responseFormatter = require('./middlewares/response_formatter')
const router = require('./routes/index')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(mount('/static', statics(__dirname + '/public')))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// request logger
app.use(requestLogger)

// routes
router.use('/uchat', responseFormatter)
app
  .use(router.routes())
  .use(router.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
