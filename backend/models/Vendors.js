const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const VendorSchema = new Schema({
    managername: {
        type: String,
        required: true
    },
    shopname: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
        type: String,
        required: false
    },
    opentime: {
        type: String,
        required: false
    },
    closetime: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true,
        default: "password"
    }

});

module.exports = Vendor = mongoose.model("vendors", VendorSchema);
