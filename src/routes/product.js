const Product = require('../models/product.modal')
const express = require('express')
const router = express.Router()

// Create a new customer
// POST localhost:3000/customer
router.post('/product', (req, res) => {
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

  const model = new Product(req.body)
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
router.get('/product', (req, res) => {
  if(!req.query.productCode || !req.query.productId ) {
    return res.status(400).send('Missing URL parameter: productCode or productId')
  }

  if(req.query.productCode) {
      Product.findOne({
        productCode: req.query.productCode
      })
        .then(doc => {
          res.json(doc)
        })
        .catch(err => {
          res.status(500).json(err)
        })
    }
  else {
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
router.put('/product', (req, res) => {
  if(!req.query.productCode) {
    return res.status(400).send('Missing URL parameter: productCode')
  }

  Product.findOneAndUpdate({
    productCode: req.query.productCode
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
router.delete('/product', (req, res) => {
  if(!req.query.productCode) {
    return res.status(400).send('Missing URL parameter: productCode')
  }

  Product.findOneAndRemove({
    productCode: req.query.productCode
  })
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

module.exports = router