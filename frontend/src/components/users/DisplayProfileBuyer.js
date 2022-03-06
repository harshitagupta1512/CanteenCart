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

const DisplayProfileBuyer = (props) => {

    const navigate = useNavigate();
    var x = localStorage.getItem("email");

    const loggedBuyer = {
        email: x,
    };

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [contact, setContact] = useState("");
    const [batch, setBatch] = useState("");

    const onChangeName = (event) => {
        setName(event.target.value);
    };

    axios
        .post("/api/buyer/profile", loggedBuyer)
        .then((response) => {
            console.log(response.data);
            setName(response.data.name);
            setAge(response.data.age);
            setContact(response.data.contact);
            setBatch(response.data.batch);
        })
        .catch(function (error) {
            console.log(error);
        });
    return (
        <div>
            <List
                sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                }}
            >
                <ListItem>
                    <ListItemText primary="BUYER" />
                </ListItem>
                <ListItem>
                    <ListItemText primary="EMAIL" secondary={x} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="NAME" secondary={name} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="CONTACT" secondary={contact} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="AGE" secondary={age} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="BATCH" secondary={batch} />
                </ListItem>
            </List>

            <Button variant="contained" onClick={() => navigate("edit")} >
                EDIT PROFILE
            </Button>
        </div >);
};

export default DisplayProfileBuyer;
