const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = (data) => {
    let errors = {};

    data.adminKey = !isEmpty(data.adminKey) ? data.adminKey : '';
    data.name = !isEmpty(data.name) ?  data.name : '';
    data.username = !isEmpty(data.username) ?  data.username : '';
    data.password = !isEmpty(data.password) ?  data.password : '';
    data.confirmPassword = !isEmpty(data.confirmPassword) ?  data.confirmPassword : '';

    if (Validator.isEmpty(data.adminKey)) {
        errors.adminKey = 'Admin key is required!';
    }

    if (!Validator.isLength(data.name, { min: 2, max: 15 })) {
        errors.name = 'name must be from 2 to 15 characters long!'
    }
    if(Validator.isNumeric(data.name)) {
        errors.name = 'Name cannot be a number';
    }
    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name is required!';
    }

    if (!Validator.isLength(data.username, { min: 5, max: 15 })) {
        errors.username = 'username must be from 5 to 15 characters long!'
    }
    if (Validator.isEmpty(data.username)) {
        errors.username = 'username is required!';
    }

    if (!Validator.isLength(data.password, { min: 8})) {
        errors.password = 'password must be at least 8 characters long!'
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = 'password is required!';
    }

    if (!Validator.equals(data.password, data.confirmPassword)) {
        errors.confirmPassword = 'Passwords do not match!'
    }

    if (Validator.isEmpty(data.confirmPassword)) {
        errors.confirmPassword = 'Please confirm your password!';
    }

    if (Validator.equals(data.username, data.password)) {
        errors.password = 'Username and password cannot be the same'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};