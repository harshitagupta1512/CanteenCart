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

const EditProfileBuyer = () => {

    var x = localStorage.getItem("email");
    const loggedBuyer = {
        email: x,
    };

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [contact, setContact] = useState("");
    const [batch, setBatch] = useState("");
    const [password, setPassword] = useState("");


    React.useEffect(() => {
        axios
            .post("/api/buyer/profile", loggedBuyer)
            .then((response) => {
                console.log(response.data);
                setName(response.data.name);
                setAge(response.data.age);
                setContact(response.data.contact);
                setBatch(response.data.batch);
                setPassword(response.data.password);

            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])

    const onChangeName = (event) => {
        setName(event.target.value);
    };
    const onChangeContact = (event) => {
        setContact(event.target.value);
    };
    const onChangeAge = (event) => {
        setAge(event.target.value);
    };
    const onChangeBatch = (event) => {
        setBatch(event.target.value);
    };
    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const editedBuyer = {
            name: name,
            email: x,
            contact: contact,
            age: age,
            batch: batch,
        };

        //link to backend function to edit profile

        axios
            .post("/api/buyer/profile/edit", editedBuyer)
            .then((response) => {
                alert("Edited " + editedBuyer.email);
                console.log(response.data);
                window.location.href = "/buyer/profile";
            });
    };

    return (
        <Grid container align={"center"} spacing={2}>
            <Grid item xs={12}>
                <TextField
                    id="name"
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={onChangeName}
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
                    label="Age"
                    variant="outlined"
                    value={age}
                    onChange={onChangeAge}
                />
            </Grid>
            <Grid item xs={12}>
                <FormControl sx={{ m: 1, minWidth: 250 }}>
                    <InputLabel id="demo">Batch</InputLabel>
                    <Select
                        labelId="demo"
                        id="demo-autowidth"
                        value={batch}
                        onChange={onChangeBatch}
                        autoWidth
                        label="Batch"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="UG1">UG1</MenuItem>
                        <MenuItem value="UG2">UG2</MenuItem>
                        <MenuItem value="UG3">UG3</MenuItem>
                        <MenuItem value="UG4">UG4</MenuItem>
                        <MenuItem value="UG5">UG5</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" onClick={onSubmit}>
                    Edit
                </Button>
            </Grid>
        </Grid>
    );
};

export default EditProfileBuyer;