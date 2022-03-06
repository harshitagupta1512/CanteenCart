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
import requirePropFactory from "@mui/utils/requirePropFactory";
import { alertClasses } from "@mui/material";
import emailjs from "emailjs-com";

//Orders dashboard for the vendor

const Reject = (props) => {

    //we have the orderID and orderStage
    var orderID = props.orderID;
    var orderStage = props.orderStage;
    var orderEmail = props.orderEmail;
    var orderCost = props.orderCost;
    var shop = localStorage.getItem("shop");

    const ChangeStage = (props) => {

        if (orderStage == "PLACED") {

            const buyer = {
                email: orderEmail,
                wallet: Number(orderCost)
            };

            axios
                .put("/api/buyer/wallet/add", buyer)
                .then((response) => {
                    alert("Amount refunded to wallet balance");
                    console.log(response.data);
                });

            const order = {
                id: orderID,
                stage: "REJECTED"
            };

            axios
                .post("/api/order/change/stage", order)
                .then((response) => {
                    alert("Rejected " + order.id);
                    console.log(response.data);

                    emailjs.send("service_lg4ccz8", "template_hno068a", {

                        status: "REJECTED",
                        shop_name: shop,
                        buyer: orderEmail,

                    }, "user_VFqheCHMAXwwWYzw2BulN")
                        .then((result) => {
                            if (result.text === "OK") {
                                alert("ORDER REJECTED - EMAIL SENT")
                                window.location.reload()
                            }
                            else {
                                console.log(result.text);
                                alert("ERROR - EMAIL NOT SENT")
                                window.location.reload()
                            }
                        }, (error) => {
                            alert("ERROR - EMAIL NOT SENT")
                            window.location.reload()
                            console.log(error.text);
                        });

                    console.log(response.data);
                });
        };
    };

    return (
        <Button variant="contained" onClick={() => {
            {
                {
                    ChangeStage();
                }
            }
        }}>
            REJECT
        </Button>);
};

const Move = (props) => {

    var shop = localStorage.getItem("shop");
    //we have the orderID and orderStage
    var orderID = props.orderID;
    var orderStage = props.orderStage;
    var orderEmail = props.orderEmail;

    const [check, setCheck] = useState(0);
    const loggedVendor = {
        shop: shop
    };

    axios
        .post("/api/order/vendor/stats", loggedVendor)
        .then((response) => {
            console.log(response.data);
            setCheck(response.data.check);
        })
        .catch(function (error) {
            console.log(error);
        });

    const ChangeStage = (props) => {

        if (orderStage == "PLACED") {

            if (check == 1) {
                const order = {
                    id: orderID,
                    stage: "ACCEPTED"
                };
                axios
                    .post("/api/order/change/stage", order)
                    .then((response) => {

                        alert("ACCEPTED " + order.id);

                        emailjs.send("service_lg4ccz8", "template_hno068a", {

                            status: "ACCEPTED",
                            shop_name: shop,
                            buyer: orderEmail,

                        }, "user_VFqheCHMAXwwWYzw2BulN")
                            .then((result) => {
                                if (result.text === "OK") {
                                    alert("ORDER ACCEPTED - EMAIL SENT")
                                    window.location.reload()
                                }
                                else {
                                    console.log(result.text);
                                    alert("ERROR - EMAIL NOT SENT")
                                    window.location.reload()
                                }
                            }, (error) => {
                                alert("ERROR - EMAIL NOT SENT")
                                window.location.reload()
                                console.log(error.text);
                            });

                        console.log(response.data);
                    });
            }

            else {
                alert("a vendor cannot accept more than 10 orders");
            }
        };
        if (orderStage == "ACCEPTED") {
            const order = {
                id: orderID,
                stage: "COOKING"
            };
            axios
                .post("/api/order/change/stage", order)
                .then((response) => {
                    alert("COOKING " + order.id);
                    console.log(response.data);
                    window.location.href = "/vendor/orders";
                });
        };
        if (orderStage == "COOKING") {
            const order = {
                id: orderID,
                stage: "READY FOR PICKUP"
            };
            axios
                .post("/api/order/change/stage", order)
                .then((response) => {
                    alert("READY FOR PICKUP " + order.id);
                    console.log(response.data);
                    window.location.href = "/vendor/orders";
                });
        };
        if (orderStage == "PICKED") {
            const order = {
                id: orderID,
                stage: "COMPLETED"
            };
            axios
                .post("/api/order/change/stage", order)
                .then((response) => {
                    alert("COMPLETED " + order.id);
                    console.log(response.data);
                    window.location.href = "/vendor/orders";
                });
        };


    };

    return (
        <Button variant="contained" onClick={() => {
            ChangeStage();
        }}>
            MOVE TO NEXT STAGE
        </Button>);
};

const OrdersVendor = (props) => {

    //get the current logged vendor's shopname

    var x = localStorage.getItem("email");
    const currentVendor = {
        email: x
    };

    axios
        .post("/api/vendor/profile", currentVendor)
        .then((response) => {
            console.log(response.data);
            localStorage.setItem("shop", response.data.shopname);
        })
        .catch(function (error) {
            console.log(error);
        });

    var s = localStorage.getItem("shop");

    const loggedVendor = {
        email: x,
        shop: s
    };

    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    const order = {
        shop: s
    };

    useEffect(() => {
        axios
            .post("/api/order/vendor/all", order)
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
                        <ListItemText primary="Canteen" secondary={s} />
                    </ListItem>
                </Grid>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">INDEX</TableCell>
                                <TableCell align="right">ID</TableCell>
                                <TableCell align="right">ITEM NAME</TableCell>
                                <TableCell align="right">QUANTITY</TableCell>
                                <TableCell align="right">COST</TableCell>
                                <TableCell align="right">USER</TableCell>
                                <TableCell align="right">PLACED TIME</TableCell>
                                <TableCell align="right">ADD-ONS</TableCell>
                                <TableCell align="right">STAGE</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order, ind) => (
                                <TableRow key={ind}>
                                    <TableCell align="right">{ind + 1}</TableCell>
                                    <TableCell align="right">{order._id}</TableCell>
                                    <TableCell align="right">{order.name}</TableCell>
                                    <TableCell align="right">{order.quantity}</TableCell>
                                    <TableCell align="right">{order.cost}</TableCell>
                                    <TableCell align="right">{order.email}</TableCell>
                                    <TableCell align="right">{order.placedTime}</TableCell>
                                    <TableCell align="right">{order.addons.map((props) => <div>{props}</div>)}</TableCell>
                                    <TableCell align="right">{order.stage}</TableCell>
                                    <TableCell >
                                        <Move orderID={order._id} orderStage={order.stage} orderEmail={order.email} orderCost={order.cost} />
                                    </TableCell>
                                    <TableCell>
                                        <Reject orderID={order._id} orderStage={order.stage} orderEmail={order.email} orderCost={order.cost} />
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

export default OrdersVendor;
