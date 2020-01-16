const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = (data) => {
    let errors = {};

    data.category = !isEmpty(data.category) ?  data.category : '';
    data.description = !isEmpty(data.description) ?  data.description : '';
    data.price = !isEmpty(data.price) ?  data.price : '';
    data.shippingPrice = !isEmpty(data.shippingPrice) ?  data.shippingPrice : '';
    data.name = !isEmpty(data.name) ?  data.name : '';

    if (Validator.isEmpty(data.category)) {
        errors.category = 'Item category is required!';
    }

    if (Validator.isEmpty(data.description)) {
        errors.description = 'Item description is required!';
    }

    if (Validator.isEmpty(data.price)) {
        errors.price = 'Item price is required!';
    }

    if (!Validator.isNumeric(data.price)) {
        errors.price = 'Invalid price! Price must be a number without commas.';
    }

    if (Validator.isEmpty(data.shippingPrice)) {
        errors.shippingPrice = 'Item shipping Price is required!';
    }

    if (!Validator.isNumeric(data.shippingPrice)) {
        errors.shippingPrice = 'Invalid shipping Price! shipping Price must be a number without commas.';
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Item name is required!';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};