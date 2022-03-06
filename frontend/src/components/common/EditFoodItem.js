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

const EditFoodItem = () => {

    var shop = localStorage.getItem("shop");
    var n = localStorage.getItem("name");

    const toBeEditedFood = {
        name: n,
        shop: shop
    };


    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [type, setType] = useState("");
    const [tagstr, setTagstr] = useState("");
    const [str, setStr] = useState("");

    React.useEffect(() => {
        axios
            .post("/api/food/find", toBeEditedFood)
            .then((response) => {
                console.log(response.data);
                setName(response.data.name);
                setPrice(response.data.price);
                setType(response.data.type);
                setTagstr(response.data.tags.join(','));
                var s = "";
                for (var i = 0; i < response.data.addons.length; i++) {
                    if (i == response.data.addons.length - 1) {
                        s = s + response.data.addons[i].name + ',' + response.data.addons[i].price;
                        continue;
                    }
                    s = s + response.data.addons[i].name + ',' + response.data.addons[i].price + ',';
                }

                setStr(s);
            })
            .catch(function (error) {
                console.log(error);
            });

        console.log(str);
    }, [])

    const onChangeName = (event) => {
        setName(event.target.value);
    };
    const onChangePrice = (event) => {
        setPrice(event.target.value);
    };
    const onChangeType = (event) => {
        setType(event.target.value);
    };
    const onChangeTagstr = (event) => {
        setTagstr(event.target.value);
    };
    const onChangeStr = (event) => {
        setStr(event.target.value);
    };

    const onSubmit = (event) => {

        var tags = [];
        var addons = [];
        event.preventDefault();
        tags = tagstr.split(",");
        var adds = str.split(",");
        var addons = [];
        var newAddon = {};
        for (let i = 0; i < adds.length; i++) {
            newAddon.name = adds[i];
            newAddon.price = adds[i + 1];
            console.log(newAddon);
            i++;
            addons.push({ ...newAddon });
        }

        console.log(addons);

        const editedFood = {
            name: name,
            price: price,
            type: type,
            tags: tags,
            addons: addons,
            shop: shop,
            rating: 0,
        };
        axios
            .post("/api/food/edit", editedFood)
            .then((response) => {
                alert("Edited " + editedFood.name);
                console.log(response.data);
                window.location.href = "/vendor/menu";
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
                    label="Price"
                    variant="outlined"
                    value={price}
                    onChange={onChangePrice}
                />
            </Grid>
            <Grid item xs={12}>
                <FormControl sx={{ m: 1, minWidth: 250 }}>
                    <InputLabel id="demo">Type</InputLabel>
                    <Select
                        labelId="demo"
                        id="demo-autowidth"
                        value={type}
                        onChange={onChangeType}
                        autoWidth
                        label="Type"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="Veg">Veg</MenuItem>
                        <MenuItem value="Non-Veg">Non-Veg</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Tags"
                    variant="outlined"
                    value={tagstr}
                    onChange={onChangeTagstr}
                />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    label="Addons"
                    variant="outlined"
                    value={str}
                    onChange={onChangeStr}
                />
            </Grid>

            <Grid item xs={12}>
                <Button variant="contained" onClick={onSubmit}>
                    Edit
                </Button>
            </Grid>
        </Grid>
    );
};

export default EditFoodItem;