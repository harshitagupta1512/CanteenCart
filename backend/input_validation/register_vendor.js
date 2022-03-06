//validator and is-empty dependencies
const validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterVendor(data) {

    let errors = {};
    data.managername = !isEmpty(data.managername) ? data.managername : "";
    data.shopname = !isEmpty(data.shopname) ? data.shopname : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.contact = !isEmpty(data.contact) ? data.contact : "";
    data.opentime = !isEmpty(data.opentime) ? data.opentime : "";
    data.closetime = !isEmpty(data.closetime) ? data.closetime : "";


    if (isEmpty(data.managername)) {
        errors.managername = "Manager name field is required";
    }
    if (isEmpty(data.shopname)) {
        errors.shopname = "Shop name field is required";
    }


    if (isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    if (isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    if (isEmpty(data.contact)) {
        flag = true;
        errors.contact = "Contact number is required";
    }

    if (isEmpty(data.opentime)) {
        flag = true;
        errors.opentime = "Opening Time field is required";
    }
    if (isEmpty(data.closetime)) {
        flag = true;
        errors.closetime = "Closing Time field is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};