// config file
//
var path = require('path')
var root = path.resolve(__dirname + '../..')
var env = process.env.NODE_ENV || 'development'

config = {
  development: {
    listen: 80,
    database: {
      host: "",
      port: "",
      user: "",
      database: "",
      password: ""
    },
  },
  staging: {
    listen: 80,
    database: {
      host: "",
      port: "",
      user: "",
      database: "",
      password: ""
    },
  },
  production: {
    listen: 80,
    database: {
      host: "",
      port: "",
      user: "",
      database: "",
      password: ""
    }
  }
}

console.log('[' + env + ']')
module.exports = config[env]
