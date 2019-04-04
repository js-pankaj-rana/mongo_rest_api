const SellInvoice = require('../models/invoice.model')
const express = require('express')
const router = express.Router()
const verifyToken = require('./auth');
const jwt = require('jsonwebtoken');
const {
  secretkey
} = require('../key');

// POST localhost:3500/invoice
router.post('/invoice', verifyToken, (req, res) => {
  if (!req.body) {
    return res.status(400).send('Request body is missing')
  }
  jwt.verify(req.token, secretkey, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {

     SellInvoice.countDocuments({}, (err, count) => {
       count = ++count;

           if(count < 10){
            count = `BNR000${count}` 
          }
          
          if((count > 10) && (count < 100)){
            count = `BNR00${count}`  
          }
            
          if((count > 100) && (count < 1000)){
            count = `BNR0${count}`
          }
       
        req.body = {...req.body,  invoiceNumber : count}

        const model = new SellInvoice(req.body)
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
     });
    }
  })
})

// GET
router.get('/invoice', (req, res) => {
  if (!req.query.invoiceId) {
    return res.status(400).send('Missing URL parameter: invoiceId')
  } else {
    SellInvoice.findOne({
        invoiceId: req.query.invoiceId
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
router.get('/invoices', (req, res) => {
    SellInvoice.find()
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})


// UPDATE
router.put('/invoice', verifyToken, (req, res) => {
  if (!req.query.invoiceId) {
    return res.status(400).send('Missing URL parameter: invoiceId')
  }

  jwt.verify(req.token, secretkey, (err, authData) => {
    if (err) {
      console.log("diya diya diya");
      res.sendStatus(403);
    } else {
        SellInvoice.findOneAndUpdate({
          invoiceId: req.query.invoiceId
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
router.delete('/invoice', verifyToken, (req, res) => {
  if (!req.query.invoiceId) {
    return res.status(400).send('Missing URL parameter: invoiceId')
  }
  jwt.verify(req.token, secretkey, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
        SellInvoice.findOneAndRemove({
          invoiceId: req.query.invoiceId
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