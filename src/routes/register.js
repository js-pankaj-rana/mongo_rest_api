const UserRegistrationWithSocial = require('./../models/registrationWithGoogle.model');
const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
const secretkey = "e93b7767-18d4-485a-80bb-ccfcce5fd968";

// Create a new customer
// POST localhost:3500/api/register

 router.post('/register', (req, res) => {
  if(!req.body) {
    return res.status(400).send('Request body is missing')
  }

  const model = new UserRegistrationWithSocial(req.body)
  model.save()
    .then(doc => {
        console.log("doc", doc)
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


router.post('/login', (req, res) => {
    if(!req.body) {
      return res.status(400).send('Request body is missing')
    }

    console.log("ss", req.body);

    UserRegistrationWithSocial.findOne({ $and: [
        {userEmail: req.body.userEmail},
        {userPassword: req.body.userPassword}
      ] 
    })
      .then(doc => {
          if(doc){
            const {userFirstName, userLastName, userId, userEmail, imageUrl} = doc;
              jwt.sign({user: doc}, secretkey, { expiresIn: '6h' }, (err, token) => {
                res.json({
                        token,
                        userId,
                        userFirstName,
                        userLastName,
                        userEmail,
                        imageUrl
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
    console.log(req.body);
  }) 

module.exports = router