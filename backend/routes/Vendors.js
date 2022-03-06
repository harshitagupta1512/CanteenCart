//api routes
//registration and login for vendors

var express = require("express");
var router = express.Router();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const keys = require("../../config/keys");

// Load input validation
const validateRegister = require("../input_validation/register_vendor");
const validateLogin = require("../input_validation/login_vendor");

// Load Vendor model
const Vendor = require("../models/Vendors");

// GET request 
// Getting all the vendors
router.get("/", function (req, res) {
    Vendor.find(function (err, vendors) {
        if (err) {
            console.log(err);
        } else {
            res.json(vendors);
        }
    })
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them
// POST request

// Add a vendor to db
router.post("/register", (req, res) => {
    const { errors, isValid } = validateRegister(req.body);
    if (!isValid) {
        return res.status(400).send(err);
    }

    Vendor.findOne({ email: req.body.email }).then(vendor => {
        // Check if vendor email exists
        if (!vendor) {
            //add a new vendor in the database
            const newVendor = new Vendor({
                managername: req.body.managername,
                shopname: req.body.shopname,
                email: req.body.email,
                contact: req.body.contact,
                opentime: req.body.opentime,
                closetime: req.body.closetime,
                password: req.body.password
            });
            newVendor.save()
                .then(vendor => {
                    res.status(200).json(vendor);
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
router.post("/login", (req, res) => {
    const { errors, isValid } = validateLogin(req.body);
    if (!isValid) {
        return res.status(400).send(errors);
    }
    const email = req.body.email;
    const password = req.body.password;

    // Find vendor by email
    Vendor.findOne({ email: email, password: password }).then(vendor => {
        // Check if vendor email exists
        if (!vendor) {
            return res.status(404).json({
                error: "Email not found",
            });
        }
        else {
            res.send("Vendor Found - Login successful");
            return vendor;
        }
    });
});

router.post("/profile", (req, res) => {

    const email = req.body.email;
    Vendor.findOne({ email }).then(vendor => {
        if (!vendor) {
            return res.status(404).json({
                error: "Email not found",
            });
        }
        else {

            res.status(200).json(vendor);
            return vendor;
        }
    });
});

router.post("/profile/edit", (req, res) => {

    Vendor.updateOne({ email: req.body.email }, {
        $set: { managername: req.body.managername, shopname: req.body.shopname, contact: req.body.contact, opentime: req.body.opentime, closetime: req.body.closetime, password: req.body.password }
    }).then(vendor => {
        if (!vendor) {
            return res.status(404).json({
                error: "Email not found",
            });
        }
        else {
            res.send(vendor);
            res.status(200).json(vendor);
            return vendor;
        }
    });
});


module.exports = router;