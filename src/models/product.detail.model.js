const mongoose = require('mongoose');
const uuid = require('uuid');

const ProductDetailSchema = new mongoose.Schema({
    productDtlId: {
        type: String,
        default: function genUUID(){
            return uuid.v1()
        },
        unique: true
    },
    productDtlEntryDate: {
        type: Date,
        default: Date.now
    },
    productDtlModificationDate: {
        type: Date
    },
    productDtlCode:{
        type: String
    },
    productDtlImage: {
        type: String
    },
    productDtlGallaryImages: {
        type: Array
    },
    productDtlDiscriptionMsg: {
        type: Array
    }
})

module.exports = mongoose.model('ProductDetail', ProductDetailSchema);
