const mongoose = require('mongoose');
const uuid = require('uuid');


const sellInvoice = new mongoose.Schema({
    invoiceId: {
        type: String,
        default: function genUUID(){
            return uuid.v1()
        },
        unique: true
    },
    invoiceNumber: {
      type: Number,
      default: 0,
      unique: true  
    },
    invoiceDate: {
        type: Date,
        default: Date.now()  
    },
    customerName: {
        type: String
    },
    customerAddress: {
        type: String
    },
    customerMobile: {
        type: Number
    },
    customerEmail: {
        type: String
    },
    customerGstin: {
        type: String,
        unique: true
    },
    invoiceCreatedAt: {
        type: String
    },
    productDetails: {
        type: Array
    }
})

module.exports = mongoose.model('SellInvoice', sellInvoice);
