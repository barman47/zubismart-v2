const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = (data) => {
    let errors = {};

    data.category = !isEmpty(data.category) ?  data.category : '';
    data.description = !isEmpty(data.description) ?  data.description : '';
    data.phone = !isEmpty(data.phone) ?  data.phone : '';
    data.email = !isEmpty(data.email) ?  data.email : '';
    data.address = !isEmpty(data.address) ?  data.address : '';
    data.name = !isEmpty(data.name) ?  data.name : '';

    if (Validator.isEmpty(data.category)) {
        errors.category = 'Service category is required!';
    }

    if (Validator.isEmpty(data.description)) {
        errors.description = 'Service description is required!';
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Service name is required!';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Invalid email address!';
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email address is required!';
    }

    if (!Validator.isMobilePhone(data.phone)) {
        errors.phone = 'Inalid Phone number';
    }
    if (Validator.isEmpty(data.phone)) {
        errors.phone = 'Phone number is required!';
    }

    if (!Validator.isLength(data.address, { min: 10 })) {
        errors.address = 'Address should be at least 10 characters long';
    }
    if (!Validator.isLength(data.address, { max: 100 })) {
        errors.address = 'Address should not be more than 10 characters long';
    }
    if (Validator.isEmpty(data.address)) {
        errors.address = 'Address is required!';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
