const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = (data) => {
    let errors = {};

    data.name = !isEmpty(data.name) ?  data.name : '';
    data.category = !isEmpty(data.category) ?  data.category : '';


    if (Validator.isEmpty(data.name)) {
        errors.name = 'Brand name is required!';
    }

    if (Validator.isEmpty(data.category)) {
        errors.category = 'Brand category is required!';
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
};