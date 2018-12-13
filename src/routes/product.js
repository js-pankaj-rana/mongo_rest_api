const Product = require('../models/product.modal')
const express = require('express')
const router = express.Router()
const verifyToken = require('./auth');
const jwt = require('jsonwebtoken');
const {
  secretkey
} = require('./../key');


// Create a new customer
// POST localhost:3000/customer
router.post('/product', verifyToken, (req, res) => {
  if (!req.body) {
    return res.status(400).send('Request body is missing')
  }
  jwt.verify(req.token, secretkey, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const model = new Product(req.body)
      model.save()
        .then(doc => {
          if (!doc || doc.length === 0) {
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
router.get('/product', (req, res) => {
  if (!req.query.productId) {
    return res.status(400).send('Missing URL parameter: productId')
  } else {
    Product.findOne({
        productId: req.query.productId
      })
      .then(doc => {
        res.json(doc)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
})


// GET ALL
router.get('/products', (req, res) => {
  Product.find()
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})


// UPDATE
router.put('/product', verifyToken, (req, res) => {
  if (!req.query.productId) {
    return res.status(400).send('Missing URL parameter: productId')
  }

  jwt.verify(req.token, secretkey, (err, authData) => {
    if (err) {
      console.log("diya diya diya");
      res.sendStatus(403);
    } else {
      Product.findOneAndUpdate({
          productId: req.query.productId
        }, req.body, {
          new: true
        })
        .then(doc => {
          console.log(doc);
          res.json(doc)
        })
        .catch(err => {
          res.status(500).json(err)
        })
    }
  })
})

// DELETE
router.delete('/product', verifyToken, (req, res) => {
  if (!req.query.productId) {
    return res.status(400).send('Missing URL parameter: productId')
  }
  jwt.verify(req.token, secretkey, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      Product.findOneAndRemove({
          productId: req.query.productId
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