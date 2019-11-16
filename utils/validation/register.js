const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = (data) => {
    let errors = {};

    data.firstName = !isEmpty(data.firstName) ?  data.firstName : '';
    data.lastName = !isEmpty(data.lastName) ?  data.lastName : '';
    data.email = !isEmpty(data.email) ?  data.email : '';
    data.phone = !isEmpty(data.phone) ?  data.phone : '';
    data.password = !isEmpty(data.password) ?  data.password : '';
    data.address = !isEmpty(data.address) ?  data.address : '';

    if (Validator.isEmpty(data.firstName)) {
        errors.firstName = 'First name is required!';
    }
    if (!Validator.isLength(data.firstName, { min: 2, max: 15 })) {
        errors.firstName = 'First name must be from 2 to 15 characters long!'
    }
    if(Validator.isNumeric(data.firstName)) {
        errors.firstName = 'First name cannot be a number!';
    }

    if (Validator.isEmpty(data.lastName)) {
        errors.lastName = 'Last name is required!';
    }
    if (!Validator.isLength(data.lastName, { min: 2, max: 15 })) {
        errors.lastName = 'Last name must be from 2 to 15 characters long!'
    }
    if(Validator.isNumeric(data.lastName)) {
        errors.lastName = 'Last name cannot be a number!';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email address is required!';
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = 'Invalid email address!';
    }

    if (!Validator.isLength(data.password, { min: 8})) {
        errors.password = 'Password must be at least 8 characters long!'
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password is required!';
    }

    if (Validator.isEmpty(data.phone)) {
        errors.phone = 'Phone number is required!';
    }
    if (!Validator.isMobilePhone(data.phone)) {
        errors.phone = 'Inalid Phone number';
    }

    if (!Validator.isEmpty(data.address) && !Validator.isLength(data.address, { min: 10 })) {
        errors.address = 'Address should be at least 10 characters long ';
    }
    if (!Validator.isEmpty(data.address) && !Validator.isLength(data.address, { max: 100 })) {
        errors.address = 'Address should not be more 100 characters long ';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};