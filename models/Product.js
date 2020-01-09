const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    category: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    brand: {
        type: String
    },

    image: {
        type: String
    },

    enabled: {
        type: Boolean,
        default: true
    },

    dateAdded: {
        type: Date,
        default: new Date()
    }
});

ProductSchema.index({'$**': 'text'});

module.exports =  Product = mongoose.model('product', ProductSchema);