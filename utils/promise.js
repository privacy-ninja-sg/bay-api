const request = require('request')
const querystring = require('querystring')
const cheerio = require('cheerio')

module.exports = {
  async getDataLogin (url, username, password) {
    const options = {
      url: url,
      method: 'GET'
    }

    // Return new promise
    return new Promise(function (resolve, reject) {
      // Do async job
      request.get(options, async (err, resp, body) => {
        if (err) {
          reject(err)
        } else {
          const $ = cheerio.load(body)
          // data for LOGIN
          var __VIEWSTATE = $('input[name=__VIEWSTATE]').attr('value')
          __VIEWSTATE = await querystring.stringify({
            __VIEWSTATE
          })

          var __VIEWSTATEGENERATOR = $('input[name=__VIEWSTATEGENERATOR]').attr('value')
          __VIEWSTATEGENERATOR = await querystring.stringify({
            __VIEWSTATEGENERATOR
          })

          var __EVENTVALIDATION = $('input[name=__EVENTVALIDATION]').attr('value')
          __EVENTVALIDATION = await querystring.stringify({
            __EVENTVALIDATION
          })

          var __PREVIOUSPAGE = $('input[name=__PREVIOUSPAGE]').attr('value')
          __PREVIOUSPAGE = await querystring.stringify({
            __PREVIOUSPAGE
          })

          var data = `__LASTFOCUS=&__EVENTTARGET=ctl00%24cphLoginBox%24imgLogin&__EVENTARGUMENT=&${__VIEWSTATE}&__VIEWSTATEGENERATOR=0851128D&__VIEWSTATEENCRYPTED=&${__PREVIOUSPAGE}&${__EVENTVALIDATION}&ctl00%24cphLoginBox%24hddPWD=&ctl00%24cphLoginBox%24hddLanguage=TH&username=&password=&ctl00%24cphLoginBox%24txtUsernameSME=${username}&ctl00%24cphLoginBox%24txtPasswordSME=&ctl00%24cphLoginBox%24hdPassword=${password}&ctl00%24cphLoginBox%24hdLogin=`
          resolve(data)
        }
      })
    })
  },
  async login (url, data) {
    const options = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      form: data,
      uri: url
    }

    // Return new promise
    return new Promise(function (resolve, reject) {
      // Do async job
      request.post(options, async (err, resp, body) => {
        if (err) {
          reject(err)
        } else {
          const options = {
            url: url,
            method: 'GET'
          }
          return new Promise(function (resolve, reject) {
            // Do async job
            request.get(options, async (err, resp, body) => {
              if (err) {
                reject(err)
              } else {
                console.log(resp)
                var $ = cheerio.load(body)
                var accountMenu = $('.accmenu').html()

                // TOKEN AND MA
                // var string = JSON.stringify(accountMenu)
                // var toString = JSON.parse(string)
                // var temp = new Array()
                // temp = toString.split('token=')
                // // console.log(temp[2])
                // // console.log("-----------------------------------------")
                // var temp_2 = new Array()
                // temp_2 = temp[2].split('&amp;ma=')
                // const token = temp_2[0]
                // const ma = temp_2[1].substr(0, 5)
                // var newUrl = `https://www.krungsribizonline.com/BAY.KOL.Corp.WebSite/Pages/MyAccount.aspx?token=${token}&ma=${ma}`
                resolve(accountMenu)
              }
            })
          })

          resolve(resp.headers.location)
        }
      })
    })
  }

}
