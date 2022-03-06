//api routes
//add a fav food item for a user
//get all fav food items for a user

//fav schema {user, array of ids of buyer's fav food items}

var express = require("express");
var router = express.Router();
const Fav = require("../models/Favs");

router.post("/add", (req, res) => {

    Fav.findOne({ userEmail: req.body.userEmail, foodName: req.body.foodName, shopName: req.body.shopName }).then(fav => {
        if (!fav) {
            const newFav = new Fav({
                userEmail: req.body.userEmail,
                foodName: req.body.foodName,
                shopName: req.body.shopName,
                price: req.body.price

            });

            newFav.save()
                .then(fav => {
                    res.status(200).json(fav);
                })
                .catch(err => {
                    res.status(400).send(err);
                });
        }
        else {
            return res.status(400).json("Already added to Favorites");
        }
    });

});

router.post("/user", (req, res) => {
    const email = req.body.email;
    Fav.find({ userEmail: email }).then(fav => {
        if (!fav) {
            return res.status(404).json({
                error: "User not found",
            });
        }
        else {
            res.send(fav);
            res.send("User Found");
            return fav;
        }
    });
});

module.exports = router;