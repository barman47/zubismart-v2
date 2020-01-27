const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },

    cart: {
        type: Schema.Types.ObjectId,
        ref: 'cart'
    },

    status: {
        type: String,
        default: 'Pending'
    }
});

module.exports = Order = mongoose.model('order', OrderSchema);