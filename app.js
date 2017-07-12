const express = require('express')
const mustache = require('mustache-express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const vendorRoutes = require('./routes/vendor')
const customerRoutes = require('./routes/customer')
const Machine = require('./models/schema.js').Machine

app.engine('mustache', mustache())
app.set('view engine', 'mustache')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
mongoose.Promise = require('bluebird')
mongoose.connect('mongodb://localhost:27017/vendingmachine')

app.listen(3000, function () {
  console.log('Server is ON! Go to 0.0.0.0:3000')
})

// Initialize the machine collection:
var machine = new Machine()
machine.totalMoney = 0
machine.log.push({
  status: 'Success',
  data: {
    item: 'Food',
    moneyInput: 0,
    changeGiven: 0,
    time: Date.now
  }
})
machine.save()

app.use(customerRoutes)
app.use(vendorRoutes)

module.exports = app
