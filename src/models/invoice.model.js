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
      type: String,
      unique: true  
    },
    invoiceDate: {
        type: Date
    },
    orderDate: {
        type: Date
    },
    customerUUID: {
        type: String
    },
    invoiceCreatedAt: {
        type: Date,
        default: Date.now()
    },
    productDetails: {
        type: Array
    },
    totalPrice: {
        type: Number
    }
})

module.exports = mongoose.model('SellInvoice', sellInvoice);
