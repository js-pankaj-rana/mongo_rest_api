const UserRegistration = require('../models/registration.model');
const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
const secretkey = "e93b7767-18d4-485a-80bb-ccfcce5fd968";

// Create a new customer
// POST localhost:3500/api/adminuser
 router.post('/user', (req, res) => {
  if(!req.body) {
    return res.status(400).send('Request body is missing')
  }

  const model = new UserRegistration(req.body)
  model.save()
    .then(doc => {
      if(!doc || doc.length === 0) {
        return res.status(500).send(doc)
      }
      const {userId, userFirstName, userLastName, userEmail, userRole} = doc;
    //   res.status(201).send(doc)
        jwt.sign({user: doc}, secretkey, { expiresIn: '24h' }, (err, token) => {
            res.json({
                token,
                userId,
                userFirstName,
                userLastName,
                userEmail,
                userRole
            });
        });
    })
    .catch(err => {
      res.status(500).json(err)
    })
}) 

router.get('/user', (req, res) => {
  UserRegistration.findOne({userId: req.query.userId})
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
router.get('/user', (req, res) => {
   if(!req.query.userEmail && !req.query.userPassword) {
      return res.status(400).send('Missing URL parameter: userEmail and userPassword')
    } 
  console.log(req.query.userEmail)
  UserRegistration.findOne({ $and: [
      {userEmail: req.query.userEmail},
      {userPassword: req.query.userPassword}
    ] 
  })
    .then(doc => {
      console.log(doc);
        if(doc){
          const {userFirstName, userLastName, userId, userEmail, userRole} = doc;
            jwt.sign({user: doc}, secretkey, { expiresIn: '6h' }, (err, token) => {
              res.json({
                      token,
                      userId,
                      userFirstName,
                      userLastName,
                      userEmail,
                      userRole
                  });
              });
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
router.get('/users', (req, res) => {
    UserRegistration.find()
      .then(doc => {
        res.json(doc)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  })
  
  
// UPDATE
 router.put('/user', (req, res) => {
  if(!req.query.userId) {
    return res.status(400).send('Missing URL parameter: userId')
  }

  UserRegistration.findOneAndUpdate({
    userId: req.query.userId
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
/* router.delete('/adminuser', (req, res) => {
  if(!req.query.contactFormId) {
    return res.status(400).send('Missing URL parameter: contactFormId')
  }

  UserRegistration.findOneAndRemove({
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