import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { render } from 'react-dom';
import ReactDOM from "react-dom";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const AddFoodItem = (props) => {

    var shop = localStorage.getItem("shop");

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [type, setType] = useState("Veg");
    const [tagstr, setTagstr] = useState("");
    const [str, setStr] = useState("");

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

    const resetInputs = () => {
        setName("");
        setPrice(0);
        setType("");
        setTagstr("");
        setStr("");
    };

    const onSubmit = (event) => {

        event.preventDefault();
        var tags = tagstr.split(",");
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

        const newFood = {
            name: name,
            price: price,
            type: type,
            tags: tags,
            addons: addons,
            shop: shop,
            rating: 0,
        };

        console.log(newFood);

        axios
            .post("/api/food/add", newFood)
            .then((response) => {
                alert("Created " + newFood.name);
                console.log(response.data);
            });

        resetInputs();
    };
    return (
        <Grid container align={"center"} spacing={2}>
            <Grid item xs={12}>
                <ListItem button>
                    <ListItemText primary="Canteen" secondary={shop} />
                </ListItem>
            </Grid>
            <Grid item xs={12}>
                <TextField
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
                    ADD
                </Button>
            </Grid>
        </Grid >
    );
};
export default AddFoodItem;