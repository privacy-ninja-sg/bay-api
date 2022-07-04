const request = require('request')

module.exports = {
  getCsrfValue (callback) {
    request.get(
      {
        headers: {
          Authorization: '',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        uri: url
      },
      function (err, res, body) {
        if (err) {
          return callback(err)
        } else {
          const $ = cheerio.load(body.toString())
          var txt = $('input[name=_csrf]').val()
          _csrf = txt
          return callback(null, _csrf)
        }
      }
    )
  }
}
