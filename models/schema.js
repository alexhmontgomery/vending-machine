const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  description: {type: String, required: true},
  cost: {type: Number, required: true},
  quantity: {type: Number, required: true},
  createdAt: {type: Date, required: true, default: Date.now}
  // updatedAt: {type: Date, required: true, default: Date.now}
})

module.exports = {
  Item: mongoose.model('Item', itemSchema)
}
