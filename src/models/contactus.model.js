const mongoose = require('mongoose');
const uuid = require('uuid');

const ContactUsFormSchema = new mongoose.Schema({
    contactFormId: {
        type: String,
        default: function genUUID(){
            return uuid.v1()
        },
        unique: true
    },
    contactUserName: String,
    contactUserEmail: {
        type: String
    },
    contactUserMessage: {
        type: String
    },
    contactCreatedAt: Date,
    contactStartDate: Date
})

module.exports = mongoose.model('ContactUsForm', ContactUsFormSchema);