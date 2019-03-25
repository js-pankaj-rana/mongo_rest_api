const mongoose = require('mongoose');
const uuid = require('uuid');



const product = new mongoose.Schema({
    productName: {
        type: String
    },
    productDescription: {
        type: String
    },
    Qty: {
        type: Number
    },
    grossAmonut: {
        type: Number,
        default: 00
    },
    discount: {
        type: Number,
        default: -00
    },
    advance: {
        type: Number,
        default: -00
    },
    taxableValue: {
        type: Number,
        default: -00
    },
    igst: {
        type: Number,
    },
    sgst: {
        type: Number,
    },
    cgst: {
        type: Number,
    }
})


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
    productDetail: [product]
})

module.exports = mongoose.model('SellInvoice', sellInvoice);
