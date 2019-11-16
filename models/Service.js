const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
    category: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    image: {
        type: String
    },

    dateAdded: {
        type: Date,
        default: new Date()
    }
});

ServiceSchema.index({'$**': 'text'});

module.exports =  Service = mongoose.model('service', ServiceSchema);