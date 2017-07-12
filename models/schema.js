const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  description: {type: String, required: true},
  cost: {type: Number, required: true},
  quantity: {type: Number, required: true},
  createdAt: {type: Date, required: true, default: Date.now}
  // updatedAt: {type: Date, required: true, default: Date.now}
})

const machineSchema = new mongoose.Schema({
  totalMoney: {type: Number, required: true},
  log: []
})

module.exports = {
  Item: mongoose.model('Item', itemSchema),
  Machine: mongoose.model('Machine', machineSchema)
}

// {
//   description: {type: String, required: true},
//   quantity: {type: Number, required: true},
//   time: {type: Date, default: Date.now},
//   moneyInput: {type: Number},
//   changeGiven: {type: Number}
// }
