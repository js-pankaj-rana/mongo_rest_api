const mongoose = require('mongoose');
const uuid = require('uuid');

const ProductSchema = new mongoose.Schema({
    productId: {
        type: String,
        default: function genUUID(){
            return uuid.v1()
        },
        unique: true
    },
    productEntryDate: {
        type: Date,
        default: Date.now
    },
    productModificationDate: {
        type: Date
    },
    productVisiblity: {
        type: Boolean,
        default: true
    },
    productCode: {
        type: String,
        unique: true,
    },
    productName: {
        type: String
    },
    productPrice: {
        type: Number
    },
    productStockNum: {
        type: Number
    },
    productAvaiblityLoation: {
        type: Array
    }
})

module.exports = mongoose.model('Product', ProductSchema);
