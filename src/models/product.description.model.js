const mongoose = require('mongoose');
const uuid = require('uuid');

const ProductDescriptionSchema = new mongoose.Schema({
    productDesId: {
        type: String,
        default: function genUUID(){
            return uuid.v1()
        },
        unique: true
    },
    productDesCode: String,
    numberDoor: String,
    numberOfShelves: Number,
    needForThis: String,
    itemCondition: String,
    dimensions: String,
    color: {
        type: String,
        default: "User Preferance"
    },
    mirror: {
        type: String,
        default: "Optional"
    },
    numberOfSecretLocker: Number,
    brand:  {
        type: String,
        default: "BN & Rana Almirahs"
    },
    productDtlWarrrenty: {
        type: String,
        default: "2 yrs from date of purchase, no warranty of color and physical damages, warranty only for locks and handle"
    },
    productDtlDelivery: {
        type: String,
        default: "Within 5 days after order."
    },
    modeofPayment: {
        type: String,
        default: "Online netbanking"
    },
    prodcutMsg: {
        type: String,
        default: "It is a regular product for general purpose uses in office and household purpose"
    }, 
    productDtlEntryDate: {
        type: Date,
        default: Date.now
    },
    productDtlModificationDate: {
        type: Date
    }
})

module.exports = mongoose.model('productDtlDiscription', ProductDescriptionSchema);
