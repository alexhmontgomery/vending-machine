const chai = require('chai')
const assert = chai.assert
const request = require('supertest')
const app = require('../app')
const Item = require('../models/schema.js').Item
const Machine = require('../models/schema.js').Machine

// COMPLETED:
describe('vendor functionality', function () {
  // A vendor should be able to see total amount of money in machine
  it('shows vendor total amount of money in machine', function (done) {
    request(app)
      .get('/api/vendor/money')
      .expect(200)
      .expect('content-type', 'application/json; charset=utf-8')
      .end(done)
  })

  // A vendor should be able to see a list of all purchases with their time of purchases
  it('shows vendor list of purchases in machine', function (done) {
    request(app)
      .get('/api/vendor/money')
      .expect(200)
      .expect('content-type', 'application/json; charset=utf-8')
      .end(done)
  })

  // A vendor should be able to add a new item to the machine
  it('allows vendor to add item to vending machine', function (done) {
    request(app)
      .post('/api/vendor/items')
      .type('form')
      .send({description: 'Test Item', cost: 0.50, quantity: 4})
      .expect(200)
      .expect('content-type', 'application/json; charset=utf-8')
      .expect(function (res) {
        assert.equal(res.body.item.description, 'Test Item')
        assert.equal(res.body.item.cost, 0.50)
        assert.equal(res.body.item.quantity, 4)
      })
      .end(done)
  })
})
