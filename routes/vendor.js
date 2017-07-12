const express = require('express')
const router = express.Router()
const Item = require('../models/schema.js').Item
const Machine = require('../models/schema.js').Machine
const bodyParser = require('body-parser')

// Allows vendor to add items to the vending machine
router.post('/api/vendor/items', function (req, res) {
  const item = new Item()
  item.description = req.body.description
  item.cost = req.body.cost
  item.quantity = req.body.quantity
  item.createdAt = Date.now()
  item.save()
  .then(function (item) {
    res.json({item: item})
  })
  .catch(function (error) {
    res.status(400).json(error)
  })
})

// Allows vendor to update item quantity, description, and cost
router.put('/api/vendor/items/:itemId', function (req, res) {
  Item.findOne({
    _id: req.params.itemId
  })
  .then(function (item) {
    item.description = req.body.description
    item.cost = req.body.cost
    item.quantity = req.body.quantity
    item.save()
    .then(function (item) {
      res.json({item: item})
    })
  })
  .catch(function (error) {
    res.status(404).json({errorMessage: 'Item not found in inventory. Please select again'})
  })
})

// Allows vendor to see the total amount of money in the machine
router.get('/api/vendor/money', function (req, res) {
  Machine.findOne()
  .then(function (machine) {
    res.json({totalMoney: machine.totalMoney})
  })
  .catch(function (error) {
    res.status(400).json(error)
  })
})

// Allows vendor to see a list of all purchases made
router.get('/api/vendor/purchases', function (req, res) {
  Machine.findOne()
  .then(function (machine) {
    res.json({purchases: machine.log})
  })
  .catch(function (error) {
    res.status(400).json(error)
  })
})

module.exports = router
