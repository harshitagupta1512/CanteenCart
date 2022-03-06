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


const Stats = (props) => {

    var shop = localStorage.getItem("shop");

    const [placed, setPlaced] = useState("");
    const [completed, setCompleted] = useState("");
    const [pending, setPending] = useState("");

    const loggedVendor = {
        shop: shop
    };

    axios
        .post("/api/order/vendor/stats", loggedVendor)
        .then((response) => {
            console.log(response.data);

            setPlaced(response.data.placed);
            setCompleted(response.data.completed);
            setPending(response.data.pending);
        })
        .catch(function (error) {
            console.log(error);
        });

    const [foods, setFoods] = useState([]);

    axios
        .post("/api/food/vendor/stats", loggedVendor)
        .then((response) => {
            setFoods(response.data);
        })
        .catch((error) => {
            console.log(error);
        });

    return (
        <div>
            <ListItem>
                <ListItemText primary="TOP 5 FOOD ITEMS" />
            </ListItem>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="right">INDEX</TableCell>
                        <TableCell align="right">NAME</TableCell>
                        <TableCell align="right">PRICE</TableCell>
                        <TableCell align="right">TYPE</TableCell>
                        <TableCell align="right">RATING</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {foods.map((food, ind) => (
                        <TableRow key={ind}>
                            <TableCell align="right">{ind + 1}</TableCell>
                            <TableCell align="right">{food.name}</TableCell>
                            <TableCell align="right">{food.price}</TableCell>
                            <TableCell align="right">{food.type}</TableCell>
                            <TableCell align="right">{food.rating}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <ListItem>
                <ListItemText primary="ORDERS PLACED" secondary={placed} />
            </ListItem>
            <ListItem>
                <ListItemText primary="PENDING ORDERS" secondary={pending} />
            </ListItem>
            <ListItem>
                <ListItemText primary="COMPLETED ORDERS" secondary={completed} />
            </ListItem>
        </div >);
};

export default Stats;
