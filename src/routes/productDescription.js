const ProductDescription = require('../models/product.description.model')
const express = require('express')
const router = express.Router()
const verifyToken =require('./auth');
const jwt = require('jsonwebtoken');
const {secretkey} = require('./../key');


// Create a new customer
// POST localhost:3000/api/productdetaildesc
router.post('/productdetaildesc', verifyToken, (req, res) => {
  if(!req.body) {
    return res.status(400).send('Request body is missing')
  }
    jwt.verify(req.token, secretkey, (err, authData) => {
      if(err) {
        res.sendStatus(403);
      } else {
        const model = new ProductDescription(req.body)
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
router.get('/productdetaildesc', verifyToken, (req, res) => {
  if(!req.query.productDesId ) {
    return res.status(400).send('Missing URL parameter: productDesId')
  }
  else {
    ProductDescription.findOne({
      productDesId: req.query.productDesId
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
router.get('/productdetaildescs', verifyToken, (req, res) => {
  jwt.verify(req.token, secretkey, (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
        ProductDescription.find()
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
router.put('/productdetaildesc', verifyToken,  (req, res) => {
  if(!req.query.productDesId) {
    return res.status(400).send('Missing URL parameter: productId')
  }

  jwt.verify(req.token, secretkey, (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
        ProductDescription.findOneAndUpdate({
         productDesId: req.query.productDesId
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
router.delete('/productdetaildesc', verifyToken, (req, res) => {
  if(!req.query.productDesId) {
    return res.status(400).send('Missing URL parameter: productDesId')
  }
  jwt.verify(req.token, secretkey, (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
        ProductDescription.findOneAndRemove({
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