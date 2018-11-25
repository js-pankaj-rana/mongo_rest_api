const express = require('express');
const router = express.Router();

router.get('/person', (req, res) => {
    if(req.query.name){
        res.send(`You have requested a person ${req.query.name}`);
    }
    else {
        res.send(`You have requested a person`);
    }
})

router.get('/person/:name', (req, res) => {
    res.send(`You have requested a person ${req.params.name}`);
})



router.get('/error', (req, res) => {
    throw new Error('This is a force error.')
    // res.send(`You have requested a person ${req.params.name}`);
})


module.exports = router;