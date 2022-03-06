//validator and is-empty dependencies
const validator = require('validator');
const isEmpty = require("is-empty");

module.exports = function validateRegisterBuyer(data) {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.contact = !isEmpty(data.contact) ? data.contact : "";
    data.age = !isEmpty(data.age) ? data.age : "";
    data.batch = !isEmpty(data.batch) ? data.batch : "";

    if (isEmpty(data.name)) {
        errors.name = "Name field is required";
    }

    if (isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    if (isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    if (isEmpty(data.batch)) {
        errors.batch = "Batch field is required";
    }

    if (isEmpty(data.contact)) {
        errors.contact = "Contact number is required";
    }
    if (isEmpty(data.age)) {
        errors.age = "Age field is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};