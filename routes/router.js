const express = require('express')
const router = express.Router()
// const router = require('express').Router()
const Item = require('../models/schema.js').Item

router.post('/api/vendor/items', function (req, res) {
  const item = new Item()
  item.description = 'chips'
  item.cost = 1.25
  item.quantity = 2
  item.createdAt
  item.save()
  .then(function (item) {
    res.json('item: ' + item)
  })
  .catch(function (error) {
    res.status(404).json(error)
  })
})

module.exports = router
