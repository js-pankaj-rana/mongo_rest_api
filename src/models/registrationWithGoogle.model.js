const mongoose = require('mongoose');
const uuid = require('uuid');

const UserRegistrationWithSocialSchema = new mongoose.Schema({
    userId: {
        type: String,
        default: function genUUID(){
            return uuid.v1()
        },
        unique: true
    },
    userFirstName: String,
    userLastName: String,
    userEmail: {
        type: String,
        unique: true
    },
    imageUrl: {
        type: String,
        unique: true
    },
    userPassword: {
        type: String
    },
    userCreatedAt: {
        type: Date,
        default: Date.now()
    },
    userRole: {
        type: String,
        default: 'user'
    }
})

module.exports = mongoose.model('UserRegistrationWithSocial', UserRegistrationWithSocialSchema);
