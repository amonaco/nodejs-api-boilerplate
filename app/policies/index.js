// custom auth sample (add in routes chain)
module.exports = {

  // checks headers when saving
  sampleCheck: function(req, res, next) {

    // check our headers
    if (typeof(req.headers['x-rws-application-secret']) == 'undefined' ||
        typeof(req.headers['x-rse-application-secret']) == 'undefined' ||
        typeof(req.headers['x-rws-application-id']) == 'undefined' ||
        req.headers['x-rws-application-secret'] == '' ||
        req.headers['x-rse-application-secret'] == '' ||
        req.headers['x-rws-application-id'] == '') {

      // we like those headers
      log.error("auth failed", req.headers);
      return res.send(401);

    } else {
      next();
    }
  }
}
