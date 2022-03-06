const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const DB_NAME = "tutorial"

// routes
var testAPIRouter = require("./routes/testAPI");
var BuyerRouter = require("./routes/Buyers");
var VendorRouter = require("./routes/Vendors");
var FoodRouter = require("./routes/Foods");
var FavRouter = require("./routes/Favs");
var OrderRouter = require("./routes/Orders");

//var OrderRouter = require("./routes/Orders");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection to MongoDB
mongoose.connect('mongodb://mongodb:27017/' + DB_NAME, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function () {
    console.log("MongoDB database connection established successfully !");
})


// setup API endpoints
app.use("/api/testAPI", testAPIRouter);
app.use("/api/buyer", BuyerRouter);
app.use("/api/vendor", VendorRouter);
app.use("/api/food", FoodRouter);
app.use("/api/fav", FavRouter);
app.use("/api/order", OrderRouter);

//app.use("/order", OrderRouter);


app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});
