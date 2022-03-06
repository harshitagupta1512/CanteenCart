//setting up our database schema
//models folder
//pull in our required dependencies

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const FavSchema = new Schema({

    userEmail: {
        type: String,
        required: true
    },
    foodName: {
        type: String,
        required: true
    },
    shopName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }

});

module.exports = Fav = mongoose.model("favs", FavSchema);
