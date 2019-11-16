const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    avatar: {
        type: String
    },

    address: {
        type: String
    },

    createdAt: {
        type: Date,
        default: new Date()
    },

    lastSeen: {
        type: Date
    }
});

module.exports = User = mongoose.model('user', UserSchema);