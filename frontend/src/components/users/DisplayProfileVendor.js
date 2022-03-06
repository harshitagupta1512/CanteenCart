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

const DisplayProfileVendor = (props) => {

  const navigate = useNavigate();
  var user = localStorage.getItem("user");
  var x = localStorage.getItem("email");

  const loggedVendor = {
    email: x,

  };

  const [managername, setManagername] = useState("");
  const [shopname, setShopname] = useState("");
  const [contact, setContact] = useState("");
  const [opentime, setOpentime] = useState("");
  const [closetime, setClosetime] = useState("");

  axios
    .post("/api/vendor/profile", loggedVendor)
    .then((response) => {
      console.log(response.data);
      setManagername(response.data.managername);
      setShopname(response.data.shopname);
      setContact(response.data.contact);
      setOpentime(response.data.opentime);
      setClosetime(response.data.closetime);
      localStorage.setItem("shop", response.data.shopname);
    })
    .catch(function (error) {
      console.log(error);
    });


  localStorage.setItem("shop", shopname);

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
          <ListItemText primary="VENDOR" />
        </ListItem>
        <ListItem>
          <ListItemText primary="EMAIL" secondary={x} />
        </ListItem>
        <ListItem>
          <ListItemText primary="MANAGER NAME" secondary={managername} />
        </ListItem>
        <ListItem>
          <ListItemText primary="SHOP NAME" secondary={shopname} />
        </ListItem>
        <ListItem>
          <ListItemText primary="CONTACT" secondary={contact} />
        </ListItem>
        <ListItem>
          <ListItemText primary="OPENING TIME" secondary={opentime} />
        </ListItem>
        <ListItem>
          <ListItemText primary="CLOSING TIME" secondary={closetime} />
        </ListItem>
      </List>
      < Button variant="contained" onClick={() => navigate("edit")} >
        EDIT PROFILE
      </Button>
    </div>);
};

export default DisplayProfileVendor;
