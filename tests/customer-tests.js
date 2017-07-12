const chai = require('chai')
const assert = chai.assert
const request = require('supertest')
const app = require('../app')
const Item = require('../models/schema.js').Item
const Machine = require('../models/schema.js').Machine

// COMPLETED:
describe('item purchases', function () {
  var testItem = false

  before(function (done) {
    const item = new Item()
    item.description = 'Test Item'
    item.cost = 0.50
    item.quantity = 4
    item.save()
    .then(function (item) {
      testItem = item
      console.log(testItem)
      done()
    })
  })
  // A customer should be able to get a list of the current items, their costs, and quantities of those items
  it('returns list of current items to customer', function (done) {
    request(app)
      .get('/api/customer/items')
      .expect(200)
      .expect('content-type', 'application/json; charset=utf-8')
      .end(done)
  })
  // A customer should be able to buy an item using money
  it('returns a verification that the item was purchased', function (done) {
    request(app)
      .post(`/api/customer/items/${testItem._id}/purchases`)
      .type('form')
      .send({moneyGiven: 1.25})
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(function (res) {
        assert.equal(res.body.status, 'Success')
        assert.equal(res.body.data.item, 'Test Item')
      })
      .end(done)
  })
  // A customer should be able to buy an item, paying more than the item is worth (imagine putting a dollar in a machine for a 65-cent item) and get correct change. This change is just an amount, not the actual coins.
  it('returns the proper change for a purchase', function (done) {
    request(app)
      .post(`/api/customer/items/${testItem._id}/purchases`)
      .type('form')
      .send({moneyGiven: 1.25})
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(function (res) {
        assert.equal(res.body.status, 'Success')
        assert.equal(res.body.data.changeGiven, 0.75)
      })
      .end(done)
  })
  // A customer should not be able to buy items that are not in the machine, but instead get an error
  it('returns an error for an item not in the machine', function (done) {
    request(app)
      .post('/api/customer/items/111111111/purchases')
      .type('form')
      .send({moneyGiven: 1.25})
      .expect(404)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(function (res) {
        assert.equal(res.body.errorMessage, 'Item not found in inventory. Please select again')
      })
      .end(done)
  })
})
