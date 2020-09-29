import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function ValidateInputs(name) {
    let errors = {};
    console.log("Validating username password", name.username, name.password)
    if (validator.isEmpty(name.username)) {
        errors.username = 'Username is required';
    }

    if (validator.isEmpty(name.password)) {
        errors.password = 'Password is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}