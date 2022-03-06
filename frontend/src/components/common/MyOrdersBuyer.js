import { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useNavigate } from "react-router-dom";
//Orders dashboard for the vendor
import React, { Component } from "react";

const Rate = (props) => {

    var foodName = props.orderFoodName;
    var shopName = props.orderShopName;

    const [rating, setRating] = React.useState(0);
    const onChangeRating = (event) => {
        setRating(event.target.value);
    };
    //we have the orderID and orderStage
    var orderID = props.orderID;
    var orderStage = props.orderStage;

    const OnChange = (props) => {
        if (orderStage == "COMPLETED") {

            const order = {
                id: orderID,
                rating: rating
            };
            axios
                .post("/api/order/rate", order)
                .then((response) => {
                    alert("RATED " + order.id);
                    console.log(response.data);
                    window.location.href = "/buyer/myorders";
                });


            const food = {
                name: foodName,
                shop: shopName,
                new: rating
            }

            axios
                .put("/api/food/rate", food)
                .then((response) => {
                    alert("RATED " + food.name);
                    console.log(response.data);
                });
        };
    };

    return (
        <div>
            <Grid container align={"center"} spacing={1}>
                <Grid item xs={12}>
                    <TextField
                        label="Rating"
                        variant="outlined"
                        value={rating}
                        onChange={onChangeRating}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button variant="contained" onClick={() => {
                        OnChange();
                    }}>
                        RATE
                    </Button>
                </Grid>
            </Grid>
        </div>);
};

const Pickup = (props) => {

    //we have the orderID and orderStage
    var orderID = props.orderID;
    var orderStage = props.orderStage;

    const ChangeStage = (props) => {

        if (orderStage == "READY FOR PICKUP") {
            const order = {
                id: orderID,
                stage: "COMPLETED"
            };
            axios
                .post("/api/order/change/stage", order)
                .then((response) => {
                    alert("COMPLETED " + order.id);
                    console.log(response.data);
                    window.location.href = "/buyer/myorders";
                });
        };
    };

    return (
        <Button variant="contained" onClick={() => {
            ChangeStage();
        }}>
            PICKED UP
        </Button>);
};

const MyOrdersBuyer = (props) => {

    //buyer's email

    var x = localStorage.getItem("email");
    const currentBuyer = {
        email: x
    };

    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios
            .post("/api/order/buyer/all", currentBuyer)
            .then((response) => {
                setOrders(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <Grid container align={"center"} spacing={1}>
                <Grid item xs={12}>
                    <ListItem button>
                        <ListItemText primary="BUYER" secondary={x} />
                    </ListItem>
                </Grid>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">INDEX</TableCell>
                                <TableCell align="right">FOOD ITEM NAME</TableCell>
                                <TableCell align="right">VENDOR</TableCell>
                                <TableCell align="right">QUANTITY</TableCell>
                                <TableCell align="right">COST</TableCell>
                                <TableCell align="right">PLACED TIME</TableCell>
                                <TableCell align="right">STAGE</TableCell>
                                <TableCell align="right">RATING</TableCell>
                                <TableCell align="left">PICKUP</TableCell>
                                <TableCell align="center">RATE</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order, ind) => (
                                <TableRow key={ind}>
                                    <TableCell align="right">{ind + 1}</TableCell>
                                    <TableCell align="right">{order.name}</TableCell>
                                    <TableCell align="right">{order.shop}</TableCell>
                                    <TableCell align="right">{order.quantity}</TableCell>
                                    <TableCell align="right">{order.cost}</TableCell>
                                    <TableCell align="right">{order.placedTime}</TableCell>
                                    <TableCell align="right">{order.stage}</TableCell>
                                    <TableCell align="right">{order.rating}</TableCell>
                                    <TableCell>
                                        <Pickup orderID={order._id} orderStage={order.stage} />
                                    </TableCell>
                                    <TableCell >
                                        <Rate orderID={order._id} orderStage={order.stage} orderFoodName={order.name} orderShopName={order.shop} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid >
        </div >
    );
};

export default MyOrdersBuyer;
