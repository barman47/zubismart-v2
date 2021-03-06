const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },

    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'product',
        },
        quantity: {
            type: Number,
            default: 1
        }
    }]
});

module.exports = Cart = mongoose.model('cart', CartSchema);