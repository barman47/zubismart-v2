const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },

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

    image: {
        type: String
    },

    dateAdded: {
        type: Date,
        default: new Date()
    }
});

ProductSchema.index({'$**': 'text'});

module.exports =  Product = mongoose.model('product', ProductSchema);