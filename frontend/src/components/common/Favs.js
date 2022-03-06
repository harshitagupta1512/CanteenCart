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
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Checkbox from '@mui/material/Checkbox';
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useNavigate } from "react-router-dom";
import React, { Component } from "react";

// Favs dashboard for buyer

const Favs = (props) => {

    var email = localStorage.getItem("email");
    const navigate = useNavigate();

    const [foods, setFoods] = useState([]);

    const loggedBuyer = {
        email: email,

    };

    axios
        .post("/api/fav/user", loggedBuyer)
        .then((response) => {
            setFoods(response.data);
        })
        .catch((error) => {
            console.log(error);
        });

    return (
        <div>
            <Grid container align={"center"} spacing={1}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">INDEX</TableCell>
                                <TableCell align="right">NAME</TableCell>
                                <TableCell align="right">VENDOR</TableCell>
                                <TableCell align="right">PRICE</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {foods.map((food, ind) => (
                                <TableRow key={ind}>
                                    <TableCell align="right">{ind + 1}</TableCell>
                                    <TableCell align="right">{food.foodName}</TableCell>
                                    <TableCell align="right">{food.shopName}</TableCell>
                                    <TableCell align="right">{food.price}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid >
        </div >
    );
};
export default Favs;
