  
var express = require('express')
var app = express()
var morgan = require('morgan')
var methodOverride = require('method-override')
var bodyParser = require('body-parser')
const krungsri = require('./services/krungsri')
const krungsribiz = require('./services/krungsribiz')

const PORT = 7000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'))
app.use(methodOverride())

app.get('/', (req, res) => {
  res.json({message: 'ok'})
})

app.get('/check', (req, res)=>{
  res.send("hello world") 
  console.log('it work in port' + PORT)
  let d = "{\"Statement\":[{\"AccountNo\":null,\"AccountType\":0,\"TranDateTime\":\"2020-08-21T18:45:59\",\"PostDateTime\":null,\"TranCodeSTM\":\"1712\",\"TranDetailTH\":\"TN  0680416655\",\"TranDetailEN\":\"TN  0680416655\",\"TranRef\":\"0680416655\",\"Mnemonic\":\"TN \",\"ItemNo\":\"00000\",\"ChequeRef\":\"0680416655\",\"AmountType\":1,\"AmountTypeString\":null,\"TranAmount\":50.00,\"Amount\":null,\"AvialBal\":6152.49,\"Balance\":null,\"TellerID\":\"9975WMB \",\"ProcBR\":\"0700\",\"TranChannel\":\"9975WMB\",\"Items\":null,\"Terms\":null,\"MaturityDateTime\":null,\"BackDate\":null,\"Sequence\":null,\"MnemonicInfo\":null,\"PrincipalPaid\":null,\"InterestPaid\":null,\"DelayPenalty\":null,\"Contract\":null,\"Credit\":null,\"Debit\":null,\"OutsPrincipal\":null,\"OutsInterest\":null,\"OutsSupspened\":null,\"TotalInterest\":0.00,\"CreatedBy\":\"\",\"CreatedDate\":\"2020-08-21T21:53:52.947148+07:00\",\"UpdatedBy\":\"\",\"UpdatedDate\":\"2020-08-21T21:53:52.947148+07:00\",\"ErrorCode\":null,\"ErrorMessage\":null,\"ErrorMessageTH\":null,\"ErrorMessageEN\":null,\"IsError\":false,\"EAIErrorCode\":null,\"EAIErrorMessage\":null},{\"AccountNo\":null,\"AccountType\":0,\"TranDateTime\":\"2020-08-21T18:56:03\",\"PostDateTime\":null,\"TranCodeSTM\":\"1712\",\"TranDetailTH\":\"TN  0290359064\",\"TranDetailEN\":\"TN  0290359064\",\"TranRef\":\"0290359064\",\"Mnemonic\":\"TN \",\"ItemNo\":\"00000\",\"ChequeRef\":\"0290359064\",\"AmountType\":1,\"AmountTypeString\":null,\"TranAmount\":56.00,\"Amount\":null,\"AvialBal\":6208.49,\"Balance\":null,\"TellerID\":\"9940WMB \",\"ProcBR\":\"0700\",\"TranChannel\":\"9940WMB\",\"Items\":null,\"Terms\":null,\"MaturityDateTime\":null,\"BackDate\":null,\"Sequence\":null,\"MnemonicInfo\":null,\"PrincipalPaid\":null,\"InterestPaid\":null,\"DelayPenalty\":null,\"Contract\":null,\"Credit\":null,\"Debit\":null,\"OutsPrincipal\":null,\"OutsInterest\":null,\"OutsSupspened\":null,\"TotalInterest\":0.00,\"CreatedBy\":\"\",\"CreatedDate\":\"2020-08-21T21:53:52.948148+07:00\",\"UpdatedBy\":\"\",\"UpdatedDate\":\"2020-08-21T21:53:52.948148+07:00\",\"ErrorCode\":null,\"ErrorMessage\":null,\"ErrorMessageTH\":null,\"ErrorMessageEN\":null,\"IsError\":false,\"EAIErrorCode\":null,\"EAIErrorMessage\":null},{\"AccountNo\":null,\"AccountType\":0,\"TranDateTime\":\"2020-08-21T19:21:15\",\"PostDateTime\":null,\"TranCodeSTM\":\"1712\",\"TranDetailTH\":\"TN  1631504688\",\"TranDetailEN\":\"TN  1631504688\",\"TranRef\":\"1631504688\",\"Mnemonic\":\"TN \",\"ItemNo\":\"00000\",\"ChequeRef\":\"1631504688\",\"AmountType\":1,\"AmountTypeString\":null,\"TranAmount\":150.00,\"Amount\":null,\"AvialBal\":6358.49,\"Balance\":null,\"TellerID\":\"7945WMB \",\"ProcBR\":\"0700\",\"TranChannel\":\"MOBILE\",\"Items\":null,\"Terms\":null,\"MaturityDateTime\":null,\"BackDate\":null,\"Sequence\":null,\"MnemonicInfo\":null,\"PrincipalPaid\":null,\"InterestPaid\":null,\"DelayPenalty\":null,\"Contract\":null,\"Credit\":null,\"Debit\":null,\"OutsPrincipal\":null,\"OutsInterest\":null,\"OutsSupspened\":null,\"TotalInterest\":0.00,\"CreatedBy\":\"\",\"CreatedDate\":\"2020-08-21T21:53:52.948148+07:00\",\"UpdatedBy\":\"\",\"UpdatedDate\":\"2020-08-21T21:53:52.948148+07:00\",\"ErrorCode\":null,\"ErrorMessage\":null,\"ErrorMessageTH\":null,\"ErrorMessageEN\":null,\"IsError\":false,\"EAIErrorCode\":null,\"EAIErrorMessage\":null},{\"AccountNo\":null,\"AccountType\":0,\"TranDateTime\":\"2020-08-21T19:32:24\",\"PostDateTime\":null,\"TranCodeSTM\":\"1712\",\"TranDetailTH\":\"TN  3001520977\",\"TranDetailEN\":\"TN  3001520977\",\"TranRef\":\"3001520977\",\"Mnemonic\":\"TN \",\"ItemNo\":\"00000\",\"ChequeRef\":\"3001520977\",\"AmountType\":1,\"AmountTypeString\":null,\"TranAmount\":300.00,\"Amount\":null,\"AvialBal\":6658.49,\"Balance\":null,\"TellerID\":\"9922WMB \",\"ProcBR\":\"0700\",\"TranChannel\":\"9922WMB\",\"Items\":null,\"Terms\":null,\"MaturityDateTime\":null,\"BackDate\":null,\"Sequence\":null,\"MnemonicInfo\":null,\"PrincipalPaid\":null,\"InterestPaid\":null,\"DelayPenalty\":null,\"Contract\":null,\"Credit\":null,\"Debit\":null,\"OutsPrincipal\":null,\"OutsInterest\":null,\"OutsSupspened\":null,\"TotalInterest\":0.00,\"CreatedBy\":\"\",\"CreatedDate\":\"2020-08-21T21:53:52.948148+07:00\",\"UpdatedBy\":\"\",\"UpdatedDate\":\"2020-08-21T21:53:52.948148+07:00\",\"ErrorCode\":null,\"ErrorMessage\":null,\"ErrorMessageTH\":null,\"ErrorMessageEN\":null,\"IsError\":false,\"EAIErrorCode\":null,\"EAIErrorMessage\":null},{\"AccountNo\":null,\"AccountType\":0,\"TranDateTime\":\"2020-08-21T20:08:50\",\"PostDateTime\":null,\"TranCodeSTM\":\"1712\",\"TranDetailTH\":\"TN  1472769644\",\"TranDetailEN\":\"TN  1472769644\",\"TranRef\":\"1472769644\",\"Mnemonic\":\"TN \",\"ItemNo\":\"00000\",\"ChequeRef\":\"1472769644\",\"AmountType\":1,\"AmountTypeString\":null,\"TranAmount\":50.00,\"Amount\":null,\"AvialBal\":6708.49,\"Balance\":null,\"TellerID\":\"9922WMB \",\"ProcBR\":\"0700\",\"TranChannel\":\"9922WMB\",\"Items\":null,\"Terms\":null,\"MaturityDateTime\":null,\"BackDate\":null,\"Sequence\":null,\"MnemonicInfo\":null,\"PrincipalPaid\":null,\"InterestPaid\":null,\"DelayPenalty\":null,\"Contract\":null,\"Credit\":null,\"Debit\":null,\"OutsPrincipal\":null,\"OutsInterest\":null,\"OutsSupspened\":null,\"TotalInterest\":0.00,\"CreatedBy\":\"\",\"CreatedDate\":\"2020-08-21T21:53:52.948148+07:00\",\"UpdatedBy\":\"\",\"UpdatedDate\":\"2020-08-21T21:53:52.948148+07:00\",\"ErrorCode\":null,\"ErrorMessage\":null,\"ErrorMessageTH\":null,\"ErrorMessageEN\":null,\"IsError\":false,\"EAIErrorCode\":null,\"EAIErrorMessage\":null},{\"AccountNo\":null,\"AccountType\":0,\"TranDateTime\":\"2020-08-21T20:54:20\",\"PostDateTime\":null,\"TranCodeSTM\":\"1712\",\"TranDetailTH\":\"TN  1400539258\",\"TranDetailEN\":\"TN  1400539258\",\"TranRef\":\"1400539258\",\"Mnemonic\":\"TN \",\"ItemNo\":\"00000\",\"ChequeRef\":\"1400539258\",\"AmountType\":1,\"AmountTypeString\":null,\"TranAmount\":250.00,\"Amount\":null,\"AvialBal\":6958.49,\"Balance\":null,\"TellerID\":\"9965WMB \",\"ProcBR\":\"0700\",\"TranChannel\":\"9965WMB\",\"Items\":null,\"Terms\":null,\"MaturityDateTime\":null,\"BackDate\":null,\"Sequence\":null,\"MnemonicInfo\":null,\"PrincipalPaid\":null,\"InterestPaid\":null,\"DelayPenalty\":null,\"Contract\":null,\"Credit\":null,\"Debit\":null,\"OutsPrincipal\":null,\"OutsInterest\":null,\"OutsSupspened\":null,\"TotalInterest\":0.00,\"CreatedBy\":\"\",\"CreatedDate\":\"2020-08-21T21:53:52.948148+07:00\",\"UpdatedBy\":\"\",\"UpdatedDate\":\"2020-08-21T21:53:52.948148+07:00\",\"ErrorCode\":null,\"ErrorMessage\":null,\"ErrorMessageTH\":null,\"ErrorMessageEN\":null,\"IsError\":false,\"EAIErrorCode\":null,\"EAIErrorMessage\":null},{\"AccountNo\":null,\"AccountType\":0,\"TranDateTime\":\"2020-08-21T21:46:36\",\"PostDateTime\":null,\"TranCodeSTM\":\"1712\",\"TranDetailTH\":\"TN  1485625887\",\"TranDetailEN\":\"TN  1485625887\",\"TranRef\":\"1485625887\",\"Mnemonic\":\"TN \",\"ItemNo\":\"00000\",\"ChequeRef\":\"1485625887\",\"AmountType\":1,\"AmountTypeString\":null,\"TranAmount\":100.00,\"Amount\":null,\"AvialBal\":7058.49,\"Balance\":null,\"TellerID\":\"9923WMB \",\"ProcBR\":\"0700\",\"TranChannel\":\"9923WMB\",\"Items\":null,\"Terms\":null,\"MaturityDateTime\":null,\"BackDate\":null,\"Sequence\":null,\"MnemonicInfo\":null,\"PrincipalPaid\":null,\"InterestPaid\":null,\"DelayPenalty\":null,\"Contract\":null,\"Credit\":null,\"Debit\":null,\"OutsPrincipal\":null,\"OutsInterest\":null,\"OutsSupspened\":null,\"TotalInterest\":0.00,\"CreatedBy\":\"\",\"CreatedDate\":\"2020-08-21T21:53:52.949148+07:00\",\"UpdatedBy\":\"\",\"UpdatedDate\":\"2020-08-21T21:53:52.949148+07:00\",\"ErrorCode\":null,\"ErrorMessage\":null,\"ErrorMessageTH\":null,\"ErrorMessageEN\":null,\"IsError\":false,\"EAIErrorCode\":null,\"EAIErrorMessage\":null}],\"PageIndex\":4,\"RecordCount\":37,\"PageSize\":10,\"AvialBal\":7058.49,\"CreatedBy\":\"\",\"CreatedDate\":\"2020-08-21T21:53:52.823148+07:00\",\"UpdatedBy\":\"\",\"UpdatedDate\":\"2020-08-21T21:53:52.823148+07:00\",\"ErrorCode\":null,\"ErrorMessage\":null,\"ErrorMessageTH\":null,\"ErrorMessageEN\":null,\"IsError\":false,\"EAIErrorCode\":null,\"EAIErrorMessage\":null}"
  console.log(JSON.parse(d))
})

app.use('/api/v0.1/bank', krungsri)
app.use('/api/v0.2/bank', krungsribiz)

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept")
  res.header('Access-Control-Allow-Credentials', true)

  next()
})

app.listen(PORT, () => {
  console.log('app is on PORT: ', PORT)
})
