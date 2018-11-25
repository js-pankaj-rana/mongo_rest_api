const mongoose = require('mongoose');
const uuid = require('uuid');

const CustomerSchema = new mongoose.Schema({
    customerId: {
        type: String,
        default: function genUUID(){
            return uuid.v1()
        },
        unique: true
    },
    customerEnrollement: {
        type: Date,
        default: Date.now
    },
    customerName: String,
    customerMobile: String,
    customerEmail: {
        type: String,
        unique: true
    },
    customerAddress: {
        type: String,
        default: 'unknown address'
    }
})

module.exports = mongoose.model('Customer', CustomerSchema);