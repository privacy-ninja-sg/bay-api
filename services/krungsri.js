var request = require('request')
var express = require('express')
var querystring = require('querystring')
var router = express.Router()
var cheerio = require('cheerio')
var j = request.jar()
request = request.defaults({
  jar: j
})

// CONFIG KRUNGSRI
const url = 'https://www.krungsrionline.com/BAY.KOL.WebSite/Common/Login.aspx'
// var username = 'Somkiarttendee'
// var password = '0837519743'

router.route('/krungsri')
  .post((req, response) => {
    const body = req.body
    if (!body.username || !body.password) {
      response.json({
        message: 'Error'
      })
    } else {
      var username = body.username
      var password = body.password
      var transactionData = []
      request.get(url, (err, res, body) => {
        // console.log(res.body)
        const $ = cheerio.load(body)
        var __VIEWSTATE = $('input[name=__VIEWSTATE]').attr('value')
        __VIEWSTATE = querystring.stringify({ __VIEWSTATE })
        var __VIEWSTATEGENERATOR = $('input[name=__VIEWSTATEGENERATOR]').attr('value')
        __VIEWSTATEGENERATOR = querystring.stringify({ __VIEWSTATEGENERATOR })
        var __EVENTVALIDATION = $('input[name=__EVENTVALIDATION]').attr('value')
        __EVENTVALIDATION = querystring.stringify({ __EVENTVALIDATION })
        var data = `__EVENTTARGET=ctl00%24cphForLogin%24lbtnLoginNew&__EVENTARGUMENT=&${__VIEWSTATE}&${__VIEWSTATEGENERATOR}&${__EVENTVALIDATION}&user=&password=&username=&password=&ctl00%24cphForLogin%24username=${username}&ctl00%24cphForLogin%24password=&ctl00%24cphForLogin%24hdPassword=${password}&ctl00%24cphForLogin%24hddLanguage=TH`
        // var data_fix = '__EVENTTARGET=ctl00%24cphForLogin%24lbtnLoginNew&__EVENTARGUMENT=&__VIEWSTATE=%2FwEPDwUKMTc3Mjc1MjY0Mw9kFgJmD2QWBAIBD2QWAgIXD2QWAgIBDxYCHgRUZXh0BSk8IS0tIFdlYlNlcnZpY2UgWzIwMTUxMDE1LTEyMDAwMF0gVUFUIC0tPmQCAw8WAh4MYXV0b2NvbXBsZXRlBQNvZmYWBAIJDw8WBB4IQ3NzQ2xhc3MFBmFjdGl2ZR4EXyFTQgICZGQCCw8PFgIeB1Zpc2libGVoZGRk0Nv6LYkhQ00HfZcucqZ5SZtx%2FTNsKTiNVtblUamWoxE%3D&__VIEWSTATEGENERATOR=89939577&__EVENTVALIDATION=%2FwEdABviGo1ODPD%2FXzMrT8fJk4drzDFAtl8RnOAA%2FK4HFtoo3jSj6IbECC7T7AcBEGKTLSH2my5ZtDtajrHk08X1b0Q8XHsGqrz72WbGuQfHF0j80B216N9s8vTQxNcOvReVSN6pv%2F55G%2Fpt7SogCJgBta076RVI830rRzc7FpsDz1taD8GNW1q229uCbwjTXABAOSHtcquhacsdvWqb5QRZQ6Gxo%2BJxbVPQGNUc2uX2OiQejHSXpWJJdSnXgdgyfcIGWZvUZ0W9caOwNU3fIBrZoJRkUb%2FowcXKuWK%2BRGJmaY9YaPB7oH9KQwiNNjv%2BqhZdP80HlZKZsVuRMl1jd8lqsvr7BiBLl3%2BwtfO5l7zQunZqRlxQMnpE8ruc09e4tAkh1uFOliuMohDdNUmjzb0H8sEnALPsZt8C7GFT%2FZscRGux8DnajkRWPsAT6SURBATnOMKD2xOwY0xedOXRcaab02qVRE42t%2B0y8iYLNC5OA2DmNg%2F%2BvW58UzM0zBi03bAFIbOq%2F%2B6gBHo5H1ZHhQ6Lsyz27sBLhEIU5A6jxbdQ2hagcvpjyeitKwzsmqjnmuN2pxDJs4i9z%2FJKaXWjuF1jxmpPTHGehN6aDZ4dGR4%2FTvrLXA%3D%3D&user=&password=&username=&password=&ctl00%24cphForLogin%24username=Somkiarttendee&ctl00%24cphForLogin%24password=&ctl00%24cphForLogin%24hdPassword=0837519743&ctl00%24cphForLogin%24hddLanguage=TH'
        request.post({
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          form: data,
          uri: url
        }, function (err, res, body) {
          if (err) {
            console.log(err)
          } else {
            console.log('body of post: ' + res.body)
            // console.log("res: " + res.headers.location)
            const responseUrl = res.headers.location
            request.get(responseUrl, function (err, res, body) {
              var $ = cheerio.load(body)
              var accountMenu = $('.accmenu').html()
              // TOKEN AND MA
              var string = JSON.stringify(accountMenu)
              var toString = JSON.parse(string)
              var temp = new Array()
              temp = toString.split('token=')
              // console.log(temp[2])
              // console.log("-----------------------------------------")
              var temp_2 = new Array()
              temp_2 = temp[2].split('&amp;ma=')
              const token = temp_2[0]
              const ma = temp_2[1].substr(0, 7)
              const accUrl = 'https://www.krungsrionline.com/BAY.KOL.WebSite/Pages/MyAccount.aspx?token=' + token + '&ma=' + ma
              // console.log("account url: " + accUrl)
              // console.log("-----------------------------------------")
              request.get(accUrl, function (err, res, body) {
                // console.log("body" + res.body)
                const $ = cheerio.load(body)
                var transactionTable = $('tbody > tr').each((index, element) => {
                  const tds = $(element).find('td')
                  var createDate = $(tds[0]).text()
                  var transaction = $(tds[1]).text()
                  var depositCredit = $(tds[3]).text()
                  var latestCredit = $(tds[4]).text()
                  var refer = $(tds[5]).text()
                  // console.log('time: ', createDate)
                  var date = createDate.split('/')
                  var time = date[2].split(' ')
                  // console.log("date: ", date)
                  // console.log("time: ", time)
                  var datetime = time[0] + '-' + date[1] + '-' + date[0] + ' ' + time[1]
                  // console.log("datetime: ", datetime)
                  creatDate = datetime
		  var tableRow = {
                    datetime,
                    transaction,
                    depositCredit,
                    latestCredit,
                    refer
                  }
                  transactionData.push(tableRow)
                })
                if (transactionData.length > 0 && transactionData[0].createDate != '\n                                        NO TRANSACTION TODAY\n                                    ') {
                  response.json({
                    message: 'OK',
                    data: transactionData
                  })
                } else if (transactionData[0].createDate == '\n                                        NO TRANSACTION TODAY\n                                    ') {
                  response.json({
                    message: 'no transaction today'
                  })
                } else {
                  response.json({
                    message: 'Error'
                  })
                }
              })
            })
          }
        })
      })
    }
  })

module.exports = router
