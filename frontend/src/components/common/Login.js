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

const Login_buyer = (props) => {

    //user = 0 for buyer
    //user = 1 for vendor

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const resetInputs = () => {
        setEmail("");
        setPassword("");
    };

    const onSubmit = (event) => {
        event.preventDefault();

        const newBuyer = {
            email: email,
            password: password
        };

        axios
            .post("/api/buyer/login", newBuyer)
            .then((response) => {
                alert("Logged in " + email);
                console.log(response.data);
                localStorage.setItem("usertype", "B");
                localStorage.setItem("email", email);
                window.location.href = "/";
            });
        resetInputs();
    };

    return (
        <Grid container align={"center"} spacing={2}>

            <Grid item xs={12}>
                <TextField
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={onChangeEmail}
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
                    Login
                </Button>
            </Grid>
        </Grid>
    );
};

const Login_vendor = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const resetInputs = () => {
        setEmail("");
        setPassword("");
    };

    const onSubmit = (event) => {
        event.preventDefault();

        const newVendor = {
            email: email,
            password: password
        };

        axios
            .post("/api/vendor/login", newVendor)
            .then((response) => {
                alert("Logged in " + email);
                console.log(response.data);
                localStorage.setItem("email", email);
                localStorage.setItem("usertype", "V");
                window.location.href = "/";

            });

        resetInputs();
    };

    return (
        <Grid container align={"center"} spacing={2}>
            <Grid item xs={12}>
                <TextField
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={onChangeEmail}
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
                    Login
                </Button>
            </Grid>
        </Grid >

    );

};

const Login = (props) => {

    const [user, setUser] = useState('');
    const onChangeUser_type = (event) => {
        setUser(event.target.value);
    };

    const handleChange = (event) => {
        setUser(event.target.value);
    };

    return (
        <Grid container align={"center"} spacing={2}>
            <Grid item xs={12} align={"center"}>
                <FormControl sx={{ m: 1, minWidth: 250 }}>
                    <InputLabel id="simple-select-label">USER</InputLabel>
                    <Select
                        labelId="simple-select-label"
                        id="demo-simple-select"
                        value={user}
                        label="USER"
                        onChange={handleChange}
                    >
                        <MenuItem value={0}>Buyer</MenuItem>
                        <MenuItem value={1}>Vendor</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            {user === 0 && <Login_buyer />}
            {user === 1 && <Login_vendor />}
        </Grid>
    );
};
export default Login;
