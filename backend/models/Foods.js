const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const FoodSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
    },
    type: {
        type: String,
        required: true,
        enum: ['Veg', 'Non-Veg']
    },
    shop: {
        type: String,
        required: true
    },
    sold: {
        type: Number,
        default: 0
    },
    rated: {
        type: Number,
        default: 0
    }
    ,
    addons: [{ name: String, price: Number }],

    tags: [String],

    number_rated: {
        type: Number,
        default: 0
    }
});

module.exports = Food = mongoose.model("Foods", FoodSchema);
