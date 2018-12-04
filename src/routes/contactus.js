const ContactUsForm = require('../models/contactus.model')
const express = require('express')
const router = express.Router()
// const cors = require('cors')

// const projectURLs = ['https://www.ranasteelco.com', 'https://www.ranasteelco.in']
// const projectURLs = ['http://localhost:3000', 'http://localhost:3000.in']

/* var corsOptions = {
  origin: function (origin, callback) {
    if (projectURLs.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
} */



// Create a new customer
// POST localhost:3000/customer
router.post('/contactus', (req, res) => {
  if(!req.body) {
    return res.status(400).send('Request body is missing')
  }

  const model = new ContactUsForm(req.body)
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
router.get('/contactus', (req, res) => {
  if(!req.query.contactFormId) {
    return res.status(400).send('Missing URL parameter: contactFormId')
  }

  ContactUsForm.findOne({
    contactFormId: req.query.contactFormId
  })
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})


// GET ALL
router.get('/contactus/all', (req, res) => {
    ContactUsForm.find()
      .then(doc => {
        res.json(doc)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  })

  
// UPDATE
router.put('/contactus', (req, res) => {
  if(!req.query.contactFormId) {
    return res.status(400).send('Missing URL parameter: contactFormId')
  }

  ContactUsForm.findOneAndUpdate({
    contactFormId: req.query.contactFormId
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
router.delete('/contactus', (req, res) => {
  if(!req.query.contactFormId) {
    return res.status(400).send('Missing URL parameter: contactFormId')
  }

  ContactUsForm.findOneAndRemove({
    contactFormId: req.query.contactFormId
  })
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

module.exports = router