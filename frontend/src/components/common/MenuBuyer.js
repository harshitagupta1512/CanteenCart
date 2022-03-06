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
import Checkbox from '@mui/material/Checkbox';
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useNavigate } from "react-router-dom";
import React, { Component } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { stepClasses } from "@mui/material";
import Fuse from "fuse.js";
import { Box } from "@mui/system";

//Food Dashboard for the buyer
const Check = (props) => {
    var email = localStorage.getItem("email");
    var id = props.id;
    var name = props.name;
    var shop = props.shop;
    var price = props.price;

    const handleChange = (event) => {
        const newFav = {
            userEmail: email,
            foodName: name,
            shopName: shop,
            price: price
        };

        axios
            .post("/api/fav/add", newFav)
            .then((response) => {
                alert("Added to Favourites");
                console.log(response.data);
            });
    };

    return (
        <Button
            color="error"
            variant="contained"
            onClick={() => {
                handleChange()
            }}>
            ADD TO FAVS
        </Button>
    );
}

function SetCheckbox(props) {

    return (
        <Box>
            <div> VEG
                <Checkbox
                    checked={props.veg}
                    onChange={props.handleChange1}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            </div>
            <div>
                NON-VEG
                <Checkbox
                    checked={props.nonveg}
                    onChange={props.handleChange2}
                    inputProps={{ 'aria-label': 'controlled' }}

                />
            </div>
        </Box>
    );
}

const MenuBuyer = (props) => {

    localStorage.setItem("orderPrice", 0);

    var email = localStorage.getItem("email");

    const [quantity, setQuantity] = React.useState(0);
    const [amount, setAmount] = React.useState(0);

    const onChangeQuantity = (event) => {
        setQuantity(event.target.value);
    };

    const onChangeAmount = (event) => {
        setAmount(event.target.value);
    };

    const navigate = useNavigate();
    const [foods, setFoods] = useState([]);
    const [searchFoods, setSearchFoods] = useState([]);

    React.useEffect(() => {
        axios
            .get("/api/food/all")
            .then((response) => {
                setFoods(response.data);
                setSearchFoods(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    const [search, setSearch] = useState("");

    const Search = (query) => {
        setSearch(query);
        if (!query) {
            let temp = [...searchFoods]
            setFoods(temp);
            return;
        }

        let temp = [...searchFoods]

        const fuse = new Fuse(temp, {
            keys: ["name"]
        });

        const result = fuse.search(query);

        const finalLength = result.length;
        let final = [];

        if (finalLength === 0) {
            setFoods([]);
            return;
        }
        else {
            result.forEach(element => {
                final.push(element.item);
            });
            setFoods(final)
        }
    };

    const [isVeg, setIsVeg] = React.useState(true);
    const [isNonVeg, setIsNonVeg] = React.useState(true);

    const handleChange1 = (event) => {
        setIsVeg(event.target.checked);
    };
    const handleChange2 = (event) => {
        setIsNonVeg(event.target.checked);
    };

    return (
        <div>
            <Grid container align={"center"} spacing={1}>
                <TextField
                    label="SEARCH BAR"
                    variant="outlined"
                    value={search}
                    onChange={(event) => Search(event.target.value)}
                />
                <Box>
                    <SetCheckbox handleChange1={handleChange1} handleChange2={handleChange2} veg={isVeg} nonveg={isNonVeg} />
                </Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">INDEX</TableCell>
                                <TableCell align="right">ADD TO FAVS</TableCell>
                                <TableCell align="right">NAME</TableCell>
                                <TableCell align="right">PRICE</TableCell>
                                <TableCell align="right">TYPE</TableCell>
                                <TableCell align="right">VENDOR</TableCell>
                                <TableCell align="right">RATING</TableCell>
                                <TableCell align="right">TAGS</TableCell>
                                <TableCell>ADD-ONS</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                foods.map((food, ind) => (

                                    (food.type == "Veg" && isVeg) || (food.type == "Non-Veg" && isNonVeg) || (!isVeg && !isNonVeg) ?

                                        < TableRow key={ind} >
                                            <TableCell align="right">{ind + 1}</TableCell>
                                            <TableCell align="right">
                                                <Check id={food._id} name={food.name} shop={food.shop} price={food.price} />
                                            </TableCell>
                                            <TableCell align="right">{food.name}</TableCell>
                                            <TableCell align="right">{food.price}</TableCell>
                                            <TableCell align="right">{food.type}</TableCell>
                                            <TableCell align="right">{food.shop}</TableCell>
                                            <TableCell align="right">{food.rating}</TableCell>
                                            <TableCell align="right">{food.tags.map((props) => <div>{props}</div>)}</TableCell>
                                            <TableCell align="right">
                                                {food.addons.map((item, i) => (  //added this bracket
                                                    <Table>
                                                        <TableRow align="right" key={i}>
                                                            <TableCell align="right">{item.name}</TableCell>
                                                            <TableCell align="right">{item.price}</TableCell>
                                                        </TableRow>
                                                    </Table>
                                                ))}
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="contained" onClick={() => {
                                                    {
                                                        localStorage.setItem("fid", food._id);
                                                        navigate("place/order");
                                                    }
                                                }}>
                                                    PLACE ORDER
                                                </Button>
                                            </TableCell>
                                        </TableRow> : null
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid >
        </div >
    );
};
export default MenuBuyer;
