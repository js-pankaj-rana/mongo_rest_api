const CustomerModel = require('../models/customer.model');
const express = require('express');
const router = express.Router();
const verifyToken =require('./auth');
const jwt =require('jsonwebtoken');
const {secretkey} = require('./../key');

// Create a new customer
// POST localhost:3000/customer

router.post('/customer', verifyToken, (req, res) => {
  if(!req.body) {
    return res.status(400).send('Request body is missing')
  }

  jwt.verify(req.token, secretkey, (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
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
    }
  })
})

// GET
router.get('/customer', verifyToken, (req, res) => {
  if(!req.query.customerId) {
    return res.status(400).send('Missing URL parameter: customerId')
  }

  jwt.verify(req.token, secretkey, (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      CustomerModel.findOne({
        customerId: req.query.customerId
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
router.get('/customers/all', verifyToken, (req, res) => {

  jwt.verify(req.token, secretkey, (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      CustomerModel.find()
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
router.put('/customer', verifyToken, (req, res) => {

  
  if(!req.query.customerId) {
    return res.status(400).send('Missing URL parameter: customerId')
  }
  jwt.verify(req.token, secretkey, (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
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
    }
  })
})
// DELETE
router.delete('/customer', verifyToken, (req, res) => {
  if(!req.query.customerId) {
    return res.status(400).send('Missing URL parameter: customerId')
  }
  jwt.verify(req.token, secretkey, (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      CustomerModel.findOneAndRemove({
        customerId: req.query.customerId
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