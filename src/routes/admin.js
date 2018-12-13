const AdminModel = require('../models/admin.model');
const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
const secretkey = "e93b7767-18d4-485a-80bb-ccfcce5fd968";

// Create a new customer
// POST localhost:3500/api/adminuser
 router.post('/adminuser', (req, res) => {
  if(!req.body) {
    return res.status(400).send('Request body is missing')
  }

  const model = new AdminModel(req.body)
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

router.get('/adminuserid', (req, res) => {
  AdminModel.findOne({adminUserId: req.query.adminUserId})
  .then(doc => {
      if(doc){
         res.send({
          available: "no"
         })
        }
      else {
         res.send({
           available: "yes"
         })
      }
  })
  .catch(err => {
    res.status(500).json(err)
  })
})
// GET
router.get('/adminuser', (req, res) => {
   if(!req.query.adminUserId && !req.query.adminUserPassword) {
      return res.status(400).send('Missing URL parameter: adminUserId and adminUserPassword')
    } 
  console.log(req.query.adminUserId)
  AdminModel.findOne({ $and: [
      {adminUserId: req.query.adminUserId},
      {adminUserPassword: req.query.adminUserPassword}
    ] 
  })
    .then(doc => {
      console.log(doc);
        if(doc){
          const {adminUserName, adminUserId, adminUserIsAuthorised} = doc;
          if(adminUserIsAuthorised){
            jwt.sign({user: doc}, secretkey, { expiresIn: '1h' }, (err, token) => {
              res.json({
                      token,
                      adminUserName,
                      adminUserId
                  });
              });
            }
          }
        else {
            res.sendStatus(403);
        }
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

// GET ALL
router.get('/adminuser/all', (req, res) => {
    AdminModel.find()
      .then(doc => {
        res.json(doc)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  })
  
  
// UPDATE
/* router.put('/adminuser', (req, res) => {
  if(!req.query.contactFormId) {
    return res.status(400).send('Missing URL parameter: contactFormId')
  }

  AdminModel.findOneAndUpdate({
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
}) */

// DELETE
/* router.delete('/adminuser', (req, res) => {
  if(!req.query.contactFormId) {
    return res.status(400).send('Missing URL parameter: contactFormId')
  }

  AdminModel.findOneAndRemove({
    contactFormId: req.query.contactFormId
  })
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})
 */

module.exports = router