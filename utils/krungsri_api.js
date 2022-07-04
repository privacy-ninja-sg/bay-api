const axios = require('axios')
const url = 'http://157.230.249.251:8080/api/v0.1/bank/krungsri'
module.exports = {
  getTransaction (body) {
    return axios.get(url, body).then(resp => {
      return resp.data
    }).catch(err => {
      console.log(err)
    })
  }
}
