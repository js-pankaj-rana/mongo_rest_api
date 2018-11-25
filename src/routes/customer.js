const CustomerModel = require('../models/customer.model')
const express = require('express')
const router = express.Router()

// Create a new customer
// POST localhost:3000/customer
router.post('/customer', (req, res) => {
  if(!req.body) {
    return res.status(400).send('Request body is missing')
  }

  if(!req.body.customerEmail) {
    // ...
  }

  // let user = {
  //   name: 'firstname lastname',
  //   email: 'email@gmail.com'
  // }

  const model = new CustomerModel(req.body)
  model.save()
    .then(doc => {
      if(!doc || doc.length === 0) {
        return res.status(500).send(doc)
      }

      res.status(201).send(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

// GET
router.get('/customer', (req, res) => {
  if(!req.query.customerId) {
    return res.status(400).send('Missing URL parameter: customerId')
  }

  CustomerModel.findOne({
    customerId: req.query.customerId
  })
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})


// GET ALL
router.get('/customers/all', (req, res) => {
    CustomerModel.find()
      .then(doc => {
        res.json(doc)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  })

  
// UPDATE
router.put('/customer', (req, res) => {
  if(!req.query.customerId) {
    return res.status(400).send('Missing URL parameter: customerId')
  }

  CustomerModel.findOneAndUpdate({
    customerId: req.query.customerId
  }, req.body, {
    new: true
  })
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

// DELETE
router.delete('/customer', (req, res) => {
  if(!req.query.customerId) {
    return res.status(400).send('Missing URL parameter: customerId')
  }

  CustomerModel.findOneAndRemove({
    customerId: req.query.customerId
  })
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

module.exports = router