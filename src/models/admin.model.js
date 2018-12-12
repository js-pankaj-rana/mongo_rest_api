const mongoose = require('mongoose');


const AdminModelSchema = new mongoose.Schema({
    adminUserId: {
        type: String,
        unique: true
    },
    adminUserName: String,
    adminUserPassword: {
        type: String
    },
    adminUserCreatedAt: {
        type:  Date,
        default: Date.now
    },
    adminUserIsAuthorised: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('AdminModel', AdminModelSchema);
