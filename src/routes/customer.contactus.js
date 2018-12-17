const customerContactUs = require('../models/customer.contactus.model')
const express = require('express')
const router = express.Router()
const verifyToken =require('./auth');
const jwt = require('jsonwebtoken');
const {secretkey} = require('./../key');

// Create a new customer
// POST localhost:3000/customer
router.post('/customercontacts', (req, res) => {
  if(!req.body) {
    return res.status(400).send('Request body is missing')
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
router.get('/customercontacts', verifyToken, (req, res) => {
  if(!req.query.customerContactId) {
    return res.status(400).send('Missing URL parameter: customerContactId')
  }

  
  jwt.verify(req.token, secretkey, (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      customerContactUs.findOne({
        customerContactId: req.query.customerContactId
      })
        .then(doc => {
          res.json(doc)
        })
        .catch(err => {
          res.status(500).json(err)
        })
    }
  })
})


// GET ALL
router.get('/customercontacts/all', verifyToken, (req, res) => {
  
  jwt.verify(req.token, secretkey, (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      customerContactUs.find()
        .then(doc => {
          res.json(doc)
        })
        .catch(err => {
          res.status(500).json(err)
        })
    }
  })
})

  
// UPDATE
router.put('/customercontact', verifyToken, (req, res) => {
  if(!req.query.customerContactId) {
    return res.status(400).send('Missing URL parameter: customerContactId')
  }

  jwt.verify(req.token, secretkey, (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
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
    }
  })
})

// DELETE
router.delete('/customercontacts', verifyToken, (req, res) => {
  if(!req.query.customerContactId) {
    return res.status(400).send('Missing URL parameter: customerContactId')
  }

  jwt.verify(req.token, secretkey, (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      customerContactUs.findOneAndRemove({
        customerContactId: req.query.customerContactId
      })
      .then(doc => {
        res.json(doc)
      })
      .catch(err => {
        res.status(500).json(err)
      })
    }
  })
})

module.exports = router