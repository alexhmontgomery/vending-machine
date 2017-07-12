const chai = require('chai')
const assert = chai.assert
const request = require('supertest')
const app = require('../app')

// TODO:
// A customer should be able to buy an item using money
// A customer should be able to buy an item, paying more than the item is worth (imagine putting a dollar in a machine for a 65-cent item) and get correct change. This change is just an amount, not the actual coins.
// A customer should not be able to buy items that are not in the machine, but instead get an error
// A vendor should be able to see total amount of money in machine
// A vendor should be able to see a list of all purchases with their time of purchase
// A vendor should be able to update the description, quantity, and costs of items in the machine
// A vendor should be able to add a new item to the machine

// COMPLETED:
// A customer should be able to get a list of the current items, their costs, and quantities of those items
describe('items list', function () {
  it('returns list of current items to customer', function (done) {
    request(app)
      .get('/api/customer/items')
      .expect(200)
      .expect('content-type', 'application/json; charset=utf-8')
      .end(done)
  })
})
