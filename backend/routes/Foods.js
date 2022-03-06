//api routes

//add a food item
//edit a food item
//delete a food item
//display all food items from all the vendors - for the user
//display all food items from a given vendor - for the vendor
//display a single food item given shop and item name

var express = require("express");
var router = express.Router();

// Load Food model

const Food = require("../models/Foods");

// GET request 
// Getting all the food items

router.get("/all", function (req, res) {
    Food.find(function (err, foods) {
        if (err) {
            res.send("ERROR");
            console.log(err);
        } else {
            res.json(foods);
        }
    })
});

// Add a food item to db
router.post("/add", (req, res) => {

    //primary key = shop name + item name

    Food.findOne({ shop: req.body.shop, name: req.body.name }).then(food => {
        // Check if the food item exists
        if (!food) {
            //add a new food item in the database
            const newFood = new Food({
                name: req.body.name,
                price: req.body.price,
                rating: req.body.rating,
                type: req.body.type,
                shop: req.body.shop,
                addons: req.body.addons,
                tags: req.body.tags
            });

            newFood.save()
                .then(food => {
                    res.status(200).json(food);
                })
                .catch(err => {
                    res.status(400).send(err);
                });
        }

        else {
            return res.status(400).json({ name: "Food item already exists" });
        }
    });

});

router.post("/vendor/all", (req, res) => {
    const shop = req.body.shop;
    Food.find({ shop: shop }).then(food => {
        if (!food) {
            return res.status(404).json({
                error: "Vendor not found",
            });
        }
        else {
            res.send(food);
            res.send("Vendor Found");
            return food;
        }
    });
});

router.post("/vendor/stats", (req, res) => {
    const shop = req.body.shop;

    Food.find({ shop: shop }).sort({ sold: -1 }).limit(5).then(food => {
        if (!food) {
            return res.status(404).json({
                error: "Vendor not found",
            });
        }
        else {
            res.send(food);
            res.send("Vendor Found");
            return food;
        }
    });

});

router.post("/edit", (req, res) => {

    const shop = req.body.shop;
    const name = req.body.name;

    Food.updateOne({ shop: shop, name: name }, {
        $set: { name: req.body.name, price: req.body.price, type: req.body.type, tags: req.body.tags, addons: req.body.addons }
    }).then(food => {
        if (!food) {
            return res.status(404).json({
                error: "Food item not found",
            });
        }
        else {
            res.send(food);
            res.status(200).json(food);
            return food;
        }
    });
});

router.post("/update/sold", (req, res) => {

    const shop = req.body.shop;
    const name = req.body.name;

    Food.findOne({ shop: shop, name: name }).then(food => {
        if (!food) {
            return res.status(404).json({
                error: "Food item not found",
            });
        }
        else {

            food.sold += 1
            food.save()
                .then(food => {
                    res.status(200).json(food);
                })
                .catch(err => {
                    res.status(400).send(err);
                });
            res.send(food);
            res.status(200).json(food);
            return food;
        }
    });
});

router.post("/update/rated", (req, res) => {

    const shop = req.body.shop;
    const name = req.body.name;

    Food.findOne({ shop: shop, name: name }).then(food => {
        if (!food) {
            return res.status(404).json({
                error: "Food item not found",
            });
        }
        else {

            food.rated += 1
            food.save()
                .then(food => {
                    res.status(200).json(food);
                })
                .catch(err => {
                    res.status(400).send(err);
                });
            res.send(food);
            res.status(200).json(food);
            return food;
        }
    });
});


router.post("/delete", (req, res) => {

    const shop = req.body.shop;
    const name = req.body.name;

    Food.deleteOne({ shop: shop, name: name }).then(food => {
        if (!food) {
            return res.status(404).json({
                error: "Food item not found",
            });
        }
        else {
            res.send(food);
            res.status(200).json(food);
            return food;
        }
    });
});

router.post("/find", (req, res) => {

    const shop = req.body.shop;
    const name = req.body.name;

    Food.findOne({ shop: shop, name: name }).then(food => {
        if (!food) {
            return res.status(404).json({
                error: "Food item not found",
            });
        }
        else {
            res.send(food);
            res.status(200).json(food);
            return food;
        }
    });
});


router.post("/find/id", (req, res) => {

    const id = req.body.id;

    Food.findOne({ _id: id }).then(food => {

        if (!food) {
            return res.status(404).json({
                error: "Food item not found",
            });
        }
        else {
            res.send(food);
            res.status(200).json(food);
            return food;
        }
    });
});


router.put("/rate", (req, res) => {

    let x = req.body.new;
    let name = req.body.name;
    let shop = req.body.shop;

    Food
        .findOne({ name: name, shop: shop })

        .then((food_found) => {

            let r = parseInt(food_found.rating) * parseInt(food_found.number_rated)

            r += parseInt(x)
            r /= (parseInt(food_found.number_rated) + 1);

            food_found.rating = r;

            food_found.number_rated = food_found.number_rated + 1;

            food_found
                .save()
                .then((food_found) => res.json(food_found))
                .catch((err) => res.send(err));
        })
        .catch((err) => {
            res.status(404).send(err);
        });
});

module.exports = router;