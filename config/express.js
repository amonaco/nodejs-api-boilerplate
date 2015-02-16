/*!
 * Module dependencies.
 */

var express = require('express')
var winston = require('winston')
var pkg = require('../package')
var flash = require('connect-flash')
var env = process.env.NODE_ENV || 'development'
var config = require('./config')[env]

/*!
 * Expose
 */

module.exports = function (app) {
  // Add basic auth for staging
  if (env === 'staging') {
      // next()
  }

  app.set('showStackError', true)

  // Logging
  // Use winston on production
  // and default express.logger on dev
  var log
  if (env !== 'development') {
    log = {
      stream: {
        write: function (message, encoding) {
          winston.info(message)
        }
      }
    }
  } else {
    log = 'dev'
  }
  // Don't log during tests
  if (env !== 'test') app.use(express.logger(log))

  app.configure(function () {
  
    // bodyParser should be above methodOverride
    app.use(express.json());
    app.use(express.urlencoded());

    // app.use(express.bodyParser())
    app.use(express.methodOverride())

    // routes should be at the last
    app.use(app.router)

    // custom error handler
    app.use(function (err, req, res, next) {
      if (err.message
        && (~err.message.indexOf('not found')
        || (~err.message.indexOf('Cast to ObjectId failed')))) {
        return next()
      }

      console.error(err.stack)
      res.send(500);
    })

    app.use(function (req, res, next) {
      res.send(404);
    })
  })

  // development specific stuff
  app.configure('development', function () {
    app.locals.pretty = true;
  })

  // staging specific stuff
  app.configure('staging', function () {
    app.locals.pretty = true;
  })
}
