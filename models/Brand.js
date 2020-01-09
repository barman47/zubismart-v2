const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BrandSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    
    category: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('brand', BrandSchema);