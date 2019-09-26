const Koa = require('koa')
const Router = require('koa-router')
const Logger = require('koa-logger')
const Cors = require('@koa/cors')
const BodyParser = require('koa-bodyparser')
const Helmet = require('koa-helmet')
const respond = require('koa-respond')
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

//process.env["NODE_CONFIG_DIR"] = '../config';
const config = require('config');

const app = new Koa()
const router = new Router()

app.use(Helmet())

if (process.env.NODE_ENV === 'development') {
  app.use(Logger())
}

app.use(Cors())
app.use(BodyParser({
  enableTypes: ['json'],
  jsonLimit: '5mb',
  strict: true,
  onerror: function (err, ctx) {
    ctx.throw('body parse error', 422)
  }
}))

app.use(respond())

// API routes
require('./routes')(router)
app.use(router.routes())
app.use(router.allowedMethods())

const index = fs.readFileSync(path.join(__dirname, 'public/index.html'));
app.use(async (ctx, next) => {
  if (!ctx.url.startsWith('/v1')) {
    ctx.set('content-type', 'text/html');
    ctx.body = index;
  }
});

//app.use(require('koa-static')('./public'));

mongoose.connect(config.get('mongodb.uri'));
module.exports = app
