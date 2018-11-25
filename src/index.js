const express = require('express');
const app = express(); 

const personRoute = require('./routes/person');
const customerRoute = require('./routes/customer');
const customerContactUsRoute = require('./routes/customer.contactus');

const mongoose = require('mongoose');
mongoose.connect(
    'mlab connecting script', {
        keepAlive: false,
        useNewUrlParser: true,
        reconnectTries: 30
    }
);


const path = require('path');

const bodyParser = require('body-parser');

app.use(bodyParser.json())

app.use( (req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`)
    //res.send('')
    next()

});

app.use('/api', customerRoute);
app.use('/api', customerContactUsRoute);
app.use('/api', personRoute);
// app.use('/api', customerRoute);
app.use(express.static('public'));

//Handler for 404 - Page not found

app.use( (req, res, next) => {
    res.status(404).send("we lost you")
});

//Handler for 500 - Internal server error 

app.use( (err, req, res, next) => {
    console.error(err.stack)
    res.sendFile(path.join(__dirname, '../public/500.html'))
});


const PORT = process.env.PORT || 3500 ;
app.listen(PORT, () => console.info(`Server has started on port ${PORT}`));
