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
//Food Dashboard for the vendor

const MenuVendor = (props) => {

    var x = localStorage.getItem("email");

    const loggedVendor = {
        email: x,

    };

    axios
        .post("/api/vendor/profile", loggedVendor)
        .then((response) => {
            console.log(response.data);
            localStorage.setItem("shop", response.data.shopname);
        })
        .catch(function (error) {
            console.log(error);
        });


    const navigate = useNavigate();
    const [foods, setFoods] = useState([]);

    var s = localStorage.getItem("shop");

    const food = {
        shop: s
    };

    useEffect(() => {
        axios
            .post("/api/food/vendor/all", food)
            .then((response) => {
                setFoods(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const deleteItem = (event) => {

        var name = localStorage.getItem("name");
        var shop = localStorage.getItem("shop");
        const toBeDeletedFood = {
            name: name,
            shop: shop
        };

        axios
            .post("/api/food/delete", toBeDeletedFood)
            .then((response) => {
                alert("Deleted " + toBeDeletedFood.name);
                console.log(response.data);
                window.location.href = "/";
            });
    };

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
                                <TableCell align="right">NAME</TableCell>
                                <TableCell align="right"> PRICE</TableCell>
                                <TableCell align="right">RATING</TableCell>
                                <TableCell align="right">TYPE</TableCell>
                                <TableCell align="right">VENDOR</TableCell>
                                <TableCell align="right">RATING</TableCell>
                                <TableCell align="right">TAGS</TableCell>
                                <TableCell >ADD-ONS</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {foods.map((food, ind) => (
                                <TableRow key={ind}>
                                    <TableCell align="right">{ind + 1}</TableCell>
                                    <TableCell align="right">{food.name}</TableCell>
                                    <TableCell align="right">{food.price}</TableCell>
                                    <TableCell align="right">{food.rating}</TableCell>
                                    <TableCell align="right">{food.type}</TableCell>
                                    <TableCell align="right">{food.shop}</TableCell>
                                    <TableCell align="right">{food.rating}</TableCell>
                                    <TableCell align="right">{food.tags.map((props) => <div>{props}</div>)}</TableCell>
                                    <TableCell align="right">
                                        {food.addons.map((item, i) => (  //added this bracket
                                            <TableRow align="right" key={i}>
                                                <TableCell align="right">{item.name}</TableCell>
                                                <TableCell align="right">{item.price}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableCell>

                                    <TableCell >
                                        <Button variant="contained" onClick={() => {
                                            localStorage.setItem("name", food.name);
                                            navigate("edit")
                                        }}>
                                            EDIT
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="contained" onClick={() => {
                                            localStorage.setItem("name", food.name);
                                            deleteItem();
                                        }}>
                                            DELETE
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid item xs={12}>
                    <Button variant="contained"
                        onClick={() => navigate("add")}
                    >
                        ADD A FOOD ITEM
                    </Button>
                </Grid >
            </Grid >
        </div >
    );
};
export default MenuVendor;
