const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = (data) => {
    let errors = {};

    data.firstName = !isEmpty(data.firstName) ?  data.firstName : '';
    data.lastName = !isEmpty(data.lastName) ?  data.lastName : '';
    data.phone = !isEmpty(data.phone) ?  data.phone : '';
    data.address = !isEmpty(data.address) ?  data.address : '';

    if (!Validator.isLength(data.firstName, { min: 2, max: 15 })) {
        errors.firstName = 'First name must be from 2 to 15 characters long!'
    }
    if(Validator.isNumeric(data.firstName)) {
        errors.firstName = 'First name cannot be a number!';
    }
    if (Validator.isEmpty(data.firstName)) {
        errors.firstName = 'First name is required!';
    }

    if (!Validator.isLength(data.lastName, { min: 2, max: 15 })) {
        errors.lastName = 'Last name must be from 2 to 15 characters long!'
    }
    if(Validator.isNumeric(data.lastName)) {
        errors.lastName = 'Last name cannot be a number!';
    }
    if (Validator.isEmpty(data.lastName)) {
        errors.lastName = 'Last name is required!';
    }

    if (!Validator.isMobilePhone(data.phone)) {
        errors.phone = 'Ivnalid Phone number';
    }
    if (Validator.isEmpty(data.phone)) {
        errors.phone = 'Phone number is required!';
    }

    if (Validator.isEmpty(data.address)) {
        errors.address = 'Delivery address is required!';
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
};