// main routes
var scripts = require(config.root + '/app/controllers/scripts')
var projects = require(config.root + '/app/controllers/projects')
var policy = require(config.root + '/app/policies')

module.exports = function (app) {
  app.post('/api/:', policy.headersRun, index.token, scripts.run)
}
