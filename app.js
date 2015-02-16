// app file
var express = require('express')
var http = require('http')
var app = express()

// only global stuff
global.log = require('bristol');
global.config = require('./config/config')

// models
var db = require('./app/models/')

// application log
log.addTarget('console')

// disable express stuff
app.disable('etag')
app.disable('x-powered-by')

// bootstrap application settings
require('./config/express')(app)

// bootstrap routes
require(config.root + '/config/routes')(app)

// expose app
module.exports = app

// main error handler
app.use(errorHandlers)

// this could be in a lib
function errorHandlers(err, req, res, next) {
   if (!err) return next()
   log.error("critical error.", err, req, res)
   res.send(500, { status: 500, message: 'internal server error' })
}

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler())
}

// listen
http.createServer(app).listen(config.listen, function() {
  log.info("server is up.")
})
