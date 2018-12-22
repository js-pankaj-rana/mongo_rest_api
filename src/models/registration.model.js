const mongoose = require('mongoose');

const UserRegistrationModelSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true
    },
    userFirstName: String,
    userLastName: String,
    userEmail: {
        type: String,
        unique: true
    },
    userPassword: {
        type: String
    },
    userCreatedAt: {
        type: String
    },
    userRole: {
        type: String,
        default: 'user'
    }
})

module.exports = mongoose.model('UserRegistration', UserRegistrationModelSchema);
