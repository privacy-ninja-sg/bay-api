const express = require('express')
const request = require('request')
const app = express()
const axios = require('axios')
const PORT = 8080
const FormData = require('form-data')
const cheerio = require('cheerio')
const cliProgress = require('cli-progress')
// USEFULL VALUE
const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Origin', req.headers.origin)
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept')
  next()
})

app.listen(PORT, () => {
  console.log('app is on PORT: ', PORT)
})
