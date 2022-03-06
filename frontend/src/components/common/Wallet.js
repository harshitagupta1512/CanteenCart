import axios from "axios";
import { useState, useEffect } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divide from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import { Grid } from "@mui/material";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";


const Wallet = (props) => {

    const navigate = useNavigate();

    var email = localStorage.getItem("email");

    const loggedBuyer = {
        email: email,
    };

    const [wallet, setWallet] = useState("");

    const onChangeWallet = (event) => {
        setWallet(event.target.value);
    };

    axios
        .post("/api/buyer/profile", loggedBuyer)
        .then((response) => {
            console.log(response.data);
            setWallet(response.data.wallet);
        })
        .catch(function (error) {
            console.log(error);
        });

    return (

        <Grid container align={"center"} spacing={2}>
            <ListItem>
                <ListItemText primary="EMAIL" secondary={email} />
            </ListItem>
            <ListItem>
                <ListItemText primary="CURRENT BALANCE" secondary={wallet} />
            </ListItem>
            <Grid item xs={12}>
                <Button variant="contained" onClick={() => {
                    localStorage.setItem("wallet", wallet);
                    navigate("add")
                }}>
                    ADD MONEY
                </Button>
            </Grid>
        </Grid >
    );
};

export default Wallet;
