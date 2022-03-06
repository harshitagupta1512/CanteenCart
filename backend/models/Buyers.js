//setting up our database schema
//models folder
//pull in our required dependencies

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BuyerSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	contact: {
		type: String,
		required: true
	},
	age: {
		type: Number,
		required: true
	},
	batch: {
		type: String,
		enum: ['UG1', 'UG2', 'UG3', 'UG4', 'UG5'],
		required: true
	},
	password: {
		type: String,
		required: true,
		default: "password"
	},
	wallet: {
		type: Number,
		default: 0
	}
});

module.exports = Buyer = mongoose.model("buyers", BuyerSchema);
