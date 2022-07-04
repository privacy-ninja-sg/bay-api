const request = require('request')

exports.module = {
  messageSlack () {
    const url = 'https://slack.com/api/chat.postMessage'
    return request.post({
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer xoxp-634980672929-643498249830-959243107665-c07027ee72b3a1837f59393bb3a6261d'
      }
    })
  }
}
