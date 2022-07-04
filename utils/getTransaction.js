const axios = require('axios')

const getTransaction = async (cookie, index) => {
  const url = 'https://www.krungsribizonline.com/BAY.KOL.Corp.WebSite/Pages/MyAccount.aspx/GetStatementToday'
  const opts = {
    headers : {
      'Cookie': `${cookie}`
    }
  }
  let pageIndex = {
    'pageIndex': index
  }
  const result = await axios.post(url, pageIndex, opts)
  return result.data.d
}

module.exports = {
  getTransaction
}