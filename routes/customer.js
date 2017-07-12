const express = require('express')
const router = express.Router()
const Item = require('../models/schema.js').Item
const Machine = require('../models/schema.js').Machine
const bodyParser = require('body-parser')

// Allows customer to view all items in vending machine
router.get('/api/customer/items', function (req, res) {
  Item.find()
  .then(function (items) {
    res.json(items)
  })
  .catch(function (error) {
    res.status(404).json(error)
  })
})

// Allows customer to purchase an item
router.post('/api/customer/items/:itemId/purchases', function (req, res) {
  let moneyInput = req.body.moneyGiven

  Item.findOne({
    _id: req.params.itemId
  })
  .then(function (item) {
    let changeGiven = moneyInput - item.cost
    item.quantity -= 1
    item.save()
    .then(function (item) {
      Machine.findOne()
      .then(function (machine) {
        if (changeGiven > 0) {
          machine.totalMoney += item.cost
          machine.log.push({
            status: 'Success',
            data: {
              item: item.description,
              moneyInput: moneyInput,
              changeGiven: changeGiven,
              time: Date.now()
            }
          })
          machine.save()
          .then(function (machine) {
            res.json({
              status: 'Success',
              data: {
                item: item.description,
                moneyInput: moneyInput,
                changeGiven: changeGiven,
                time: Date.now()
              }
            })
          })
          .catch(function (error) {
            res.status(400).json(error)
          })
        } else {
          machine.log.push({
            status: 'Failure',
            data: {
              moneyInput: moneyInput,
              moneyRequired: item.cost
            }
          })
          machine.save()
          .then(function (machine) {
            res.json({
              status: 'Failure',
              data: {
                moneyInput: moneyInput,
                moneyRequired: item.cost
              }
            })
          })
          .catch(function (error) {
            res.status(400).json(error)
          })
        }
      })
    })
  })
  .catch(function (error) {
    res.status(404).json({errorMessage: 'Item not found in inventory. Please select again'})
  })
})

module.exports = router
