const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = (data) => {
    let errors = {};

    data.name = !isEmpty(data.name) ?  data.name : '';
    data.email = !isEmpty(data.email) ?  data.email : '';
    data.password = !isEmpty(data.password) ?  data.password : '';

    if (!Validator.isLength(data.name, { min: 2, max: 15 })) {
        errors.name = 'name must be from 2 to 15 characters long!'
    }
    if(Validator.isNumeric(data.name)) {
        errors.name = 'Name cannot be a number';
    }
    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name is required!';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Invalid email address!';
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email address is required!';
    }

    if (!Validator.isLength(data.password, { min: 8})) {
        errors.password = 'Password must be at least 8 characters long!'
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password is required!';
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
};