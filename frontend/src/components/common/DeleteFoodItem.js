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

const DeleteFoodItem = (props) => {

    var name = localStorage.getItem("name");
    var shop = localStorage.getItem("shop");
    const toBeDeletedBuyer = {
        name: name,
        shop: shop
    };

    axios
        .post("/api/food/delete", editedBuyer)
        .then((response) => {
            alert("Edited " + editedBuyer.email);
            console.log(response.data);
            window.location.href = "/";
        });

    return (<div>

    </div>);
};
export default DeleteFoodItem;