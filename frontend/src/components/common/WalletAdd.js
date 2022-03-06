import axios from "axios";
import { useState, useEffect } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divide from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import { Grid } from "@mui/material";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import React, { Component } from "react";

const WalletAdd = (props) => {

    var email = localStorage.getItem("email");
    var w = localStorage.getItem("wallet");

    const loggedBuyer = {
        email: email,
    };

    const [wallet, setWallet] = useState("");

    const onChangeWallet = (event) => {
        setWallet(event.target.value);
    };

    React.useEffect(() => {
        axios
            .post("/api/buyer/profile", loggedBuyer)
            .then((response) => {
                console.log(response.data);
                setWallet(response.data.wallet);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])

    const onSubmit = (event) => {
        event.preventDefault();
        const editedBuyer = {

            email: email,
            wallet: Number(wallet) + Number(w)
        };

        axios
            .post("/api/buyer/edit/wallet", editedBuyer)
            .then((response) => {
                alert("Added");
                console.log(response.data);
                window.location.href = "/buyer/wallet";
            });
    };

    return (
        <Grid container align={"center"} spacing={2}>
            <ListItem>
                <ListItemText primary="EMAIL" secondary={email} />
            </ListItem>
            <Grid item xs={12}>
                <TextField
                    id="name"
                    label="Wallet Balance"
                    variant="outlined"
                    value={wallet}
                    onChange={onChangeWallet}
                />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" onClick={onSubmit}>
                    ADD
                </Button>
            </Grid>
        </Grid >);
};

export default WalletAdd;