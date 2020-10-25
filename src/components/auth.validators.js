import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function ValidateInputs(user) {
    let errors = {};


    if (user.loginFlag) {
        console.log("Validating LoginForm Data")
        if (validator.isEmpty(user.email)) {
            errors.email = 'Username is required';
        }

        if (validator.isEmpty(user.password)) {
            errors.password = 'Password is required';
        }
    } else {
        console.log("Validating SignUp Form Data")
    }


    return {
        errors,
        isValid: isEmpty(errors)
    };
}