//api routes
var express = require("express");
var router = express.Router();

// Load ORDER model

const Order = require("../models/Orders");


//get all orders for a vendor
router.post("/vendor/all", (req, res) => {
    const shop = req.body.shop;

    Order.find({ shop: shop }).then(order => {
        if (!order) {
            return res.status(404).json({
                error: "No orders for this vendor",
            });
        }
        else {
            res.send(order);
            res.send("Vendor Found");
            return order;
        }
    });
});

//get statistics for a vendor 
router.post("/vendor/stats", (req, res) => {

    const shop = req.body.shop;

    Order.find({ shop: shop }).then(order => {

        if (!order) {
            return res.status(404).json({
                error: "No orders for this vendor",
            });
        }

        else {
            let placed = order.length
            let completed = 0
            let pending = 0
            let accepted = 0;
            let cooking = 0;
            let check = 0;

            for (var i = 0; i < order.length; i++) {
                if (order[i].stage == "COMPLETED")
                    completed++;
                if (order[i].stage == "ACCEPTED")
                    accepted++;
                if (order[i].stage == "COOKING")
                    cooking++;
            }

            if (accepted + cooking < 10)
                check = 1;

            const response = {
                placed: placed,
                pending: placed - completed,
                completed: completed,
                accepted: accepted,
                cooking: cooking,
                check: check
            }
            res.send(response);
            return order;
        }
    });
});

//get all orders by a buyer
router.post("/buyer/all", (req, res) => {
    const email = req.body.email;

    Order.find({ email: email }).then(order => {
        if (!order) {
            return res.status(404).json({
                error: "No orders from this buyer",
            });
        }
        else {
            res.send(order);
            res.send("Buyer Found");
            return order;
        }
    });
});

//change stage of a order

router.post("/change/stage", (req, res) => {
    const id = req.body.id;
    Order.updateOne({ _id: id }, {
        $set: { stage: req.body.stage }
    }).then(order => {
        if (!order) {
            console.log("Order not found");
            return res.status(404).json({
                error: "Order not found",
            });
        }
        else {
            res.send(order);
            res.status(200).json(order);
            return order;
        }
    });
});


//place a order
router.post("/place", (req, res) => {

    var x = new Date().toLocaleTimeString();

    const order = new Order({
        name: req.body.name,
        email: req.body.email,
        shop: req.body.shop,
        stage: req.body.stage,
        quantity: req.body.quantity,
        addons: req.body.addons,
        cost: req.body.cost,
        placedTime: x,
    });

    order.save()
        .then(order => {
            res.status(200).json(order);
        })
        .catch(err => {
            console.log(err);
            res.status(400).send(err);
        });

});

//rate a order
router.post("/rate", (req, res) => {

    const id = req.body.id;

    Order.updateOne({ _id: id }, {
        $set: { rating: req.body.rating }
    }).then(order => {
        if (!order) {
            return res.status(404).json({
                error: "Order not found",
            });
        }
        else {
            res.send(order);
            res.status(200).json(order);
            return order;
        }
    });
});

router.post("/find", (req, res) => {

    const id = req.body.id;

    Order.findOne({ _id: id }).then(order => {
        if (!order) {
            return res.status(404).json({
                error: "Order not found",
            });
        }
        else {
            res.send(order);
            res.status(200).json(order);
            return order;
        }
    });
});

module.exports = router;