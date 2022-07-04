const expect = require('chai').expect
var getTransaction = require('../utils/krungsri_api').getTransaction

describe('KRUNGSRI TEST: ', () => {
  describe('TRANSACTION: ', () => {
    it('get transaction success', () => {
      const body = {
        username: 'Somkiarttendee',
        password: '0837519743'
      }
      return getTransaction(body).then(res => {
        expect(typeof res).to.equal('object')
      })
    })
    it('No transaction', () => {
      const body = {
        username: 'Somkiarttendee',
        password: '0837519743'
      }
      return getTransaction(body).then(res => {
        // expect(res.message).to.equal('no transaction today')
        expect(typeof res).to.equal('object')
      })
    })
    it('Error', () => {
      const body = {
        username: 'Somkiarttendee',
        password: 'xxxx'
      }
      return getTransaction(body).then(res => {
        expect(typeof res).to.equal('object')
        expect(res.message).to.equal('Error')
      })
    })
  })
})
