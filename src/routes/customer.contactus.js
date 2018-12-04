const customerContactUs = require('../models/customer.contactus.model')
const express = require('express')
const router = express.Router()

// Create a new customer
// POST localhost:3000/customer
router.post('/customercontacts', (req, res) => {
  if(!req.body) {
    return res.status(400).send('Request body is missing')
  }

  if(!req.body.customerEmail) {
    // ...
  }


  const model = new CustomerContactUs(req.body)
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
router.get('/customercontacts', (req, res) => {
  if(!req.query.customerContactId) {
    return res.status(400).send('Missing URL parameter: customerContactId')
  }

  customerContactUs.findOne({
    customerContactId: req.query.customerContactId
  })
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})


// GET ALL
router.get('/customercontacts/all', (req, res) => {
    customerContactUs.find()
      .then(doc => {
        res.json(doc)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  })

  
// UPDATE
router.put('/customer', (req, res) => {
  if(!req.query.customerContactId) {
    return res.status(400).send('Missing URL parameter: customerContactId')
  }

  customerContactUs.findOneAndUpdate({
    customerContactId: req.query.customerContactId
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
router.delete('/customercontacts', (req, res) => {
  if(!req.query.customerContactId) {
    return res.status(400).send('Missing URL parameter: customerContactId')
  }

  customerContactUs.findOneAndRemove({
    customerContactId: req.query.customerContactId
  })
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

module.exports = router