const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    shop: {
        type: String,
        required: true,
    },
    stage: {
        type: String,
        default: "PLACED",
        enum: ["PLACED", "ACCEPTED", "COOKING", "READY FOR PICKUP", "COMPLETED", "REJECTED"],
    },
    rating: {
        type: Number,
        default: 0
    },
    quantity: {
        type: Number,
        default: 0
    },
    placedTime: {
        type: String
    },
    cost: {
        type: Number,
        default: 0,
        required: true
    },
    addons: [String]
});

module.exports = Order = mongoose.model("Orders", OrderSchema);
