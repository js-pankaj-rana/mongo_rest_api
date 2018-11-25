const mongoose = require('mongoose');
const uuid = require('uuid');

const CustomerContactSchema = new mongoose.Schema({
    customerContactId: {
        type: String,
        default: function genUUID(){
            return uuid.v1()
        },
        unique: true
    },
    customerContactDate: {
        type: Date,
        default: Date.now
    },
    customerContactName: String,
    customerContactEmail: {
        type: String
    },
    customerContactMessage: {
        type: String
    }
})

module.exports = mongoose.model('CustomerContactUs', CustomerContactSchema);