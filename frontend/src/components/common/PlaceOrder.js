import { useState, useEffect } from "react";
import axios from "axios";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import React, { Component } from "react";
import { modalUnstyledClasses } from "@mui/base";

const PlaceOrder = (props) => {

    var email = localStorage.getItem("email");
    var fid = localStorage.getItem("fid");

    const [addons, setAddons] = React.useState([{}]);

    const f = {
        id: fid
    };

    const [food, setFood] = useState([]);

    useEffect(() => {
        axios
            .post("/api/food/find/id", f)
            .then((response) => {
                setAddons(response.data.addons);
                setFood(response.data);

            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    const [quantity, setQuantity] = React.useState(0);
    const [amount, setAmount] = React.useState(0);

    const onChangeQuantity = (event) => {
        setQuantity(event.target.value);
        setAmount(event.target.value * food.price);
    };

    const onChangeAmount = (event) => {
        setAmount(event.target.value);
    };

    const onChangeAddons = (event) => {
        setAddons(event.target.value);
    };

    const onChangeFood = (event) => {
        setFood(event.target.value);
    };


    const [list, setList] = React.useState([]);
    const onChangeList = (event) => {
        setList(event.target.value);
    };

    const onAdd = (event) => {
        var price = localStorage.getItem("aprice");
        var name = localStorage.getItem("aname");
        setAmount(amount + quantity * price);
        const newList = list.concat(name);
        setList(newList);
        console.log(list);
    };

    const loggedBuyer = {
        email: email,
    };
    const [wallet, setWallet] = useState("");
    const onChangeWallet = (event) => {
        setWallet(event.target.value);
    };

    //GET CURRENT WALLET BALANCE 
    useEffect(() => {
        axios
            .post("/api/buyer/profile", loggedBuyer)
            .then((response) => {
                console.log(response.data);
                setWallet(response.data.wallet);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    const onSubmit = (event) => {

        if (Number(wallet) >= Number(amount)) {

            const editedBuyer = {
                email: email,
                wallet: Number(wallet) - Number(amount)
            };


            axios
                .post("/api/buyer/edit/wallet", editedBuyer)
                .then((response) => {
                    alert("Amount deducted from wallet balance");
                    console.log(response.data);
                });


            const newOrder = {
                name: food.name,
                email: email,
                stage: "PLACED",
                shop: food.shop,
                quantity: quantity,
                addons: list,
                cost: amount,
            };

            console.log(newOrder);
            axios
                .post("/api/order/place", newOrder)
                .then((response) => {
                    alert("order placed");
                    console.log(response.data);
                    window.location.href = "/buyer/myorders";
                })

                .catch(function (error) {
                    console.log(error);
                });
        }
        else {
            alert("insufficient wallet balance");
        }
    };

    return (
        <div>
            <ListItem>
                <ListItemText primary="NAME" secondary={food.name} />
            </ListItem>
            <ListItem>
                <ListItemText primary="VENDOR" secondary={food.shop} />
            </ListItem>
            <ListItem>
                <ListItemText primary="PRICE" secondary={food.price} />
            </ListItem>

            <ListItem>
                <ListItemText primary="ADDONS" />
            </ListItem>

            {addons.map((item, i) => (  //added this bracket
                <TableRow align="right" key={i}>
                    <TableCell align="right">{item.name}</TableCell>
                    <TableCell align="right">{item.price}</TableCell>
                    <TableCell><Button variant="contained" onClick={() => {
                        localStorage.setItem("aname", item.name);
                        localStorage.setItem("aprice", item.price);
                        onAdd()
                    }}>ADD</Button></TableCell>
                </TableRow>
            ))
            }

            <TextField
                label="QUANTITY"
                variant="outlined"
                value={quantity}
                onChange={onChangeQuantity}
            />
            <ListItem>
                <ListItemText primary="AMOUNT" secondary={amount} />
            </ListItem>
            <Button variant="contained" onClick={() => { onSubmit() }}>
                PLACE ORDER
            </Button>
        </div >
    );
};

export default PlaceOrder;
