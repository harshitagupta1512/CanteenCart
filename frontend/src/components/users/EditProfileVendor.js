import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { render } from 'react-dom';
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const EditProfileVendor = () => {

    var email = localStorage.getItem("email");
    const loggedVendor = {
        email: email,
    };

    const [managername, setManagername] = useState("");
    const [shopname, setShopname] = useState("");
    const [opentime, setOpentime] = useState("");
    const [closetime, setClosetime] = useState("");
    const [contact, setContact] = useState("");
    const [password, setPassword] = useState("");


    React.useEffect(() => {
        axios
            .post("/api/vendor/profile", loggedVendor)
            .then((response) => {
                console.log(response.data);
                setManagername(response.data.managername);
                setShopname(response.data.shopname);
                setContact(response.data.contact);
                setOpentime(response.data.opentime);
                setClosetime(response.data.closetime);
                setPassword(response.data.password);
            })

            .catch(function (error) {
                console.log(error);
            });
    }, [])

    const onChangeManagername = (event) => {
        setManagername(event.target.value);
    };
    const onChangeShopname = (event) => {
        setShopname(event.target.value);
    };

    const onChangeContact = (event) => {
        setContact(event.target.value);
    };
    const onChangeOpentime = (event) => {
        setOpentime(event.target.value);
    };
    const onChangeClosetime = (event) => {
        setClosetime(event.target.value);
    };

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();

        const editedVendor = {
            managername: managername,
            shopname: shopname,
            email: email,
            contact: contact,
            opentime: opentime,
            closetime: closetime,
            password: password
        };

        //link to backend function to edit profile

        axios
            .post("/api/vendor/profile/edit", editedVendor)
            .then((response) => {
                alert("Edited " + editedVendor.email);
                console.log(response.data);
                window.location.href = "/vendor/profile";
            });
    };

    return (
        <Grid container align={"center"} spacing={2}>

            <Grid item xs={12}>
                <TextField
                    label="Manager Name"
                    variant="outlined"
                    value={managername}
                    onChange={onChangeManagername}
                />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    label="Shop Name"
                    variant="outlined"
                    value={shopname}
                    onChange={onChangeShopname}
                />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    label="Contact Number"
                    variant="outlined"
                    value={contact}
                    onChange={onChangeContact}
                />
            </Grid>


            <Grid item xs={12}>
                <TextField
                    label="Opening Time"
                    variant="outlined"
                    value={opentime}
                    onChange={onChangeOpentime}
                />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    label="Closing Time"
                    variant="outlined"
                    value={closetime}
                    onChange={onChangeClosetime}
                />
            </Grid>

            <Grid item xs={12}>
                <TextField

                    label="Password"
                    type="password"
                    value={password}
                    autoComplete="current-password"
                    variant="outlined"
                    onChange={onChangePassword}
                />
            </Grid>

            <Grid item xs={12}>
                <Button variant="contained" onClick={onSubmit}>
                    EDIT
                </Button>
            </Grid>
        </Grid >

    );

};

export default EditProfileVendor;