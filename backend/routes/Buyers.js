//api routes
//registration and login for buyers

var express = require("express");
var router = express.Router();

//const bcrypt = require("bcryptjs");
//const jwt = require("jsonwebtoken");
//const keys = require("../../config/keys");

// Load input validation
const validateRegister = require("./../input_validation/register_buyer");
const validateLogin = require("./../input_validation/login_buyer");

// Load Buyer model
const Buyer = require("../models/Buyers");

// GET request 
// Getting all the buyers

router.get("/", function (req, res) {
    Buyer.find(function (err, buyers) {
        if (err) {
            console.log(err);
        } else {
            res.json(buyers);
        }
    })
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them
// POST request

// Add a buyer to db
router.post("/register", (req, res) => {

    const { errors, isValid } = validateRegister(req.body);
    if (!isValid) {
        return res.status(400).send(err);
    }

    Buyer.findOne({ email: req.body.email }).then(buyer => {
        // Check if buyer email exists
        if (!buyer) {
            //add a new buyer in the database
            const newBuyer = new Buyer({
                name: req.body.name,
                email: req.body.email,
                contact: req.body.contact,
                age: req.body.age,
                batch: req.body.batch,
                password: req.body.password

            });
            newBuyer.save()
                .then(buyer => {
                    res.status(200).json(buyer);
                })
                .catch(err => {
                    res.status(400).send(err);
                });
        }
        else {
            return res.status(400).json({ email: "Email already exists" });
        }
    });

});


// POST request 
// Login

router.post("/profile", (req, res) => {

    Buyer.findOne({ email: req.body.email }).then(buyer => {
        if (!buyer) {
            return res.status(404).json({
                error: "Email not found",
            });
        }
        else {
            res.status(200).json(buyer);
            return buyer;
        }
    });
});

router.post("/login", (req, res) => {
    const { errors, isValid } = validateLogin(req.body);
    if (!isValid) {
        return res.status(400).send(errors);
    }
    const email = req.body.email;
    const password = req.body.password;

    // Find buyer by email
    Buyer.findOne({ email: email, password: password }).then(buyer => {
        // Check if buyer email exists
        if (!buyer) {
            return res.status(404).json({
                error: "Email not found",
            });
        }
        else {
            res.send("Buyer Found - Login Successful");
            return buyer;
        }
    });
});

router.post("/profile/edit", (req, res) => {

    Buyer.updateOne({ email: req.body.email }, {
        $set: { name: req.body.name, age: req.body.age, contact: req.body.contact, batch: req.body.batch }
    }).then(buyer => {
        if (!buyer) {
            return res.status(404).json({
                error: "Email not found",
            });
        }
        else {
            res.send(buyer);
            res.status(200).json(buyer);
            return buyer;
        }
    });
});

router.post("/edit/wallet", (req, res) => {

    Buyer.updateOne({ email: req.body.email }, {
        $set: { wallet: req.body.wallet }
    }).then(buyer => {
        if (!buyer) {
            return res.status(404).json({
                error: "Email not found",
            });
        }
        else {
            res.send(buyer);
            res.status(200).json(buyer);
            return buyer;
        }
    });
});

router.put("/wallet/add", (req, res) => {

    const email = req.body.email;
    const wallet = req.body.wallet;

    Buyer.findOne({ email: email })
        .then((buyer_found) => {
            if (Number(wallet) < 0) {
                res.status(400).send({ error: "Wallet balance cannot be negative" });
            } else {
                buyer_found.wallet = Number(buyer_found.wallet) + Number(wallet);
                buyer_found
                    .save()
                    .then((buyer_found) => res.json(buyer_found))
                    .catch((err) => res.send(err));
            }
        })
        .catch((err) => {
            res.status(404).send(err);
        });
});

module.exports = router;