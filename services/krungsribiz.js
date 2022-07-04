/* eslint-disable no-use-before-define */
let request = require('request')
const express = require('express')
const querystring = require('querystring')
const router = express.Router()
const cheerio = require('cheerio')
const moment = require('moment')
const service = require('../utils/getTransaction')
let j = request.jar()
request = request.defaults({
  jar: j
});

const url = 'https://www.krungsribizonline.com/BAY.KOL.Corp.WebSite/Common/Login.aspx'


router.route('/krungsribiz')
.post(async (req, response) => { 
  const body = req.body
  if(!body.username || !body.password){
    response.json({
      message: "Error"
    })
  }else{
    var username = body.username
    var password = body.password
    var transactionData = []
    console.log('request to url: ' + url)
    await request.get(url, async(err, res, body)=>{
      //console.log("our body: " + body)
      const $ = cheerio.load(body)
      //data for LOGIN
      var __VIEWSTATE = $('input[name=__VIEWSTATE]').attr('value')
      __VIEWSTATE = await querystring.stringify({__VIEWSTATE})

      var __VIEWSTATEGENERATOR = $('input[name=__VIEWSTATEGENERATOR]').attr('value')
      __VIEWSTATEGENERATOR = await querystring.stringify({__VIEWSTATEGENERATOR})

      var __EVENTVALIDATION = $('input[name=__EVENTVALIDATION]').attr('value')
      __EVENTVALIDATION = await querystring.stringify({__EVENTVALIDATION})

      var __PREVIOUSPAGE = $('input[name=__PREVIOUSPAGE]').attr('value')
      __PREVIOUSPAGE = await querystring.stringify({__PREVIOUSPAGE})

      var data = `__LASTFOCUS=&__EVENTTARGET=ctl00%24cphLoginBox%24imgLogin&__EVENTARGUMENT=&${__VIEWSTATE}&__VIEWSTATEGENERATOR=0851128D&__VIEWSTATEENCRYPTED=&${__PREVIOUSPAGE}&${__EVENTVALIDATION}&ctl00%24cphLoginBox%24hddPWD=&ctl00%24cphLoginBox%24hddLanguage=TH&username=&password=&ctl00%24cphLoginBox%24txtUsernameSME=${username}&ctl00%24cphLoginBox%24txtPasswordSME=&ctl00%24cphLoginBox%24hdPassword=${password}&ctl00%24cphLoginBox%24hdLogin=`
      await request.post({
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        form: data,
        uri: url,
      }, async function (err, res, body) {
        if (err) {
          console.log(err);
        } else {
          //console.log("body of post: " + res.body);
          console.log("go to: " + res.headers.location)
          // console.log("data from res: " + JSON.stringify(res.headers))
          const responseUrl = res.headers.location
          request.get(responseUrl, async function (err, res, body) {
            var $ = cheerio.load(body)
            var accountMenu = $('.accmenu').html()
            var __VIEWSTATE = $('input[name=__VIEWSTATE]').attr('value')
            __VIEWSTATE = await querystring.stringify({__VIEWSTATE})
      
            var __VIEWSTATEGENERATOR = $('input[name=__VIEWSTATEGENERATOR]').attr('value')
            __VIEWSTATEGENERATOR = await querystring.stringify({__VIEWSTATEGENERATOR})
      
            var __EVENTVALIDATION = $('input[name=__EVENTVALIDATION]').attr('value')
            __EVENTVALIDATION = await querystring.stringify({__EVENTVALIDATION})
      
            var __PREVIOUSPAGE = $('input[name=__PREVIOUSPAGE]').attr('value')
            __PREVIOUSPAGE = await querystring.stringify({__PREVIOUSPAGE})

            var logoutMenu = $('.header_mainlinks').html()
            //console.log(logoutMenu)
            var logoutStr = JSON.stringify(logoutMenu)
            var logoutToStr = JSON.parse(logoutStr)
            var logoutTemp = new Array()
            logoutTemp = logoutToStr.split('token=')
            logoutTemp_2 = logoutTemp[1].split('&amp;rd=')
            logoutToken = logoutTemp_2[0]
            const logoutData = `__EVENTTARGET=ctl00%24lbtnLogoutPage&__EVENTARGUMENT=&__VIEWSTATE=${__VIEWSTATE}&__VIEWSTATEGENERATOR=${__VIEWSTATEGENERATOR}&__VIEWSTATEENCRYPTED=&__PREVIOUSPAGE=${__PREVIOUSPAGE}&__EVENTVALIDATION=${__EVENTVALIDATION}&ctl00%24hddNoAcc=&ctl00%24bannerTop%24hdTransactionType=&ctl00%24bannerTop%24hdCampaignCode=&ctl00%24bannerTop%24hdCampaignTxnType=&ctl00%24bannerTop%24hdCampaignMutualFundType=&ctl00%24bannerTop%24hdCampaignTransferType=&ctl00%24bannerTop%24hdAccNo=&ctl00%24bannerTop%24hdBillerId=&ctl00%24bannerTop%24hdUrlRedirect=&ctl00%24bannerTop%24hdAmount=&ctl00%24bannerTop%24hdTxnIsSuccess=&ctl00%24bannerTop%24hdBillerCategory=&ctl00%24bannerTop%24hdBillerName=&ctl00%24bannerTop%24hdAJAXData=&ctl00%24hddIsLoadComplete=false&ctl00%24hdnCurrentPageQuickMenu=&ctl00%24hdnPageIndexQuickMenuLoaded=&ctl00%24cphSectionData%24campaignId_hd=&ctl00%24cphSectionData%24campaignCode_hd=&ctl00%24cphSectionData%24campaignName_hd=`
            const logoutLink = `https://www.krungsribizonline.com/BAY.KOL.Corp.WebSite/Common/Logout.aspx?token=${logoutToken}&rd=logout`
            //TOKEN AND MA
            var string = JSON.stringify(accountMenu)
            var toString = JSON.parse(string)
            var temp = new Array()
            temp = toString.split('token=')
            // console.log(temp[2])

            var temp_2 = new Array()
            temp_2 = temp[2].split('&amp;ma=')
            const token = temp_2[0]
            const ma = temp_2[1].substr(0, 5)
            var newUrl = `https://www.krungsribizonline.com/BAY.KOL.Corp.WebSite/Pages/MyAccount.aspx?token=${token}&ma=${ma}`
            await request.get(newUrl, async function (err, res, body) {
              const cookie = res.request.headers.cookie
              const getParameter = await service.getTransaction(cookie, 1)
              const myData = JSON.parse(getParameter)
              const { PageSize, RecordCount } = myData
              const page = Math.ceil(parseInt(RecordCount) / parseInt(PageSize))
              
              for(let i = 1;  i <= page ; i++) {
                const result = await service.getTransaction(cookie, i)
                const { Statement } = JSON.parse(result)
                Statement.map(transaction => {
                  const { TranDateTime, TranDetailEN, TranAmount, AvialBal, TellerID } = transaction
                  const datetime = moment(TranDateTime).format('YYYY-MM-DD HH:mm:ss')
                  let tableRow = {
                    createDate: datetime,
                    transaction: TranDetailEN,
                    depositCredit: TranAmount.toFixed(2),
                    latestCredit: AvialBal,
                    refer: TellerID
                  }
                  transactionData.push(tableRow)
                })
              }

              request.post({
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                form: logoutData,
                uri: logoutLink,
              }, (err, res, body) => {
                if(body){
                  console.log("Logout")
                }
                console.log("-----------------------------------------")
                // console.log(transactionData)
                if (transactionData.length > 0) {
                  response.json({
                    message: "OK",
                    data: transactionData
                  })
                } else if (transactionData.length == 0) {
                  response.json({
                    message: "no transaction today"
                  })
                } else {
                  response.json({
                    message: "Error"
                  })
                }
              })
            })
          })
        }
      })
    })
  }
})

router.route('/krungsribiz/withdraw')
  .post(async(req, res) => {
    const body = req.body
    
  })

module.exports = router