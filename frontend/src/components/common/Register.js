import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { render } from 'react-dom';
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Register_buyer = (props) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState(""); const [age, setAge] = useState(0);
  const [batch, setBatch] = useState("");
  const [password, setPassword] = useState("");

  const onChangeName = (event) => {
    setName(event.target.value);
  };
  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const onChangeContact = (event) => {
    setContact(event.target.value);
  };
  const onChangeAge = (event) => {
    setAge(event.target.value);
  };
  const onChangeBatch = (event) => {
    setBatch(event.target.value);
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const resetInputs = () => {
    setName("");
    setEmail("");
    setContact("");
    setAge(0);
    setBatch("");
    setPassword("");
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newBuyer = {
      name: name,
      email: email,
      contact: contact,
      age: age,
      batch: batch,
      password: password
    };

    axios
      .post("/api/buyer/register", newBuyer)
      .then((response) => {
        alert("Registered " + newBuyer.email);
        console.log(response.data);
        window.location.href = "/login";
      });

    resetInputs();
  };

  return (
    <Grid container align={"center"} spacing={2}>
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
          label="Email"
          variant="outlined"
          value={email}
          onChange={onChangeEmail}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Contact Number"
          variant="outlined"
          value={contact}
          onChange={onChangeContact}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Age"
          variant="outlined"
          value={age}
          onChange={onChangeAge}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl sx={{ m: 1, minWidth: 250 }}>
          <InputLabel id="demo">Batch</InputLabel>
          <Select
            labelId="demo"
            id="demo-autowidth"
            value={batch}
            onChange={onChangeBatch}
            autoWidth
            label="Batch"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="UG1">UG1</MenuItem>
            <MenuItem value="UG2">UG2</MenuItem>
            <MenuItem value="UG3">UG3</MenuItem>
            <MenuItem value="UG4">UG4</MenuItem>
            <MenuItem value="UG5">UG5</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Password"
          type="password"
          value={password}
          autoComplete="current-password"
          variant="outlined"
          onChange={onChangePassword}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmit}>
          Register
        </Button>
      </Grid>
    </Grid>
  );
};

const Register_vendor = (props) => {

  const [managername, setManagername] = useState("");
  const [shopname, setShopname] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [opentime, setOpentime] = useState("");
  const [closetime, setClosetime] = useState("");
  const [password, setPassword] = useState("");

  const onChangeManagername = (event) => {
    setManagername(event.target.value);
  };
  const onChangeShopname = (event) => {
    setShopname(event.target.value);
  };
  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const onChangeContact = (event) => {
    setContact(event.target.value);
  };
  const onChangeOpentime = (event) => {
    setOpentime(event.target.value);
  };
  const onChangeClosetime = (event) => {
    setClosetime(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const resetInputs = () => {
    setManagername("");
    setShopname("");
    setEmail("");
    setContact("");
    setOpentime("");
    setClosetime("");
    setPassword("");
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newVendor = {
      managername: managername,
      shopname: shopname,
      email: email,
      contact: contact,
      opentime: opentime,
      closetime: closetime,
      password: password
    };

    axios
      .post("/api/vendor/register", newVendor)
      .then((response) => {
        alert("Registered " + newVendor.email);
        console.log(response.data);
        window.location.href = "/login";
      });

    resetInputs();
  };

  return (
    <Grid container align={"center"} spacing={2}>

      <Grid item xs={12}>
        <TextField
          label="Manager Name"
          variant="outlined"
          value={managername}
          onChange={onChangeManagername}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="Shop Name"
          variant="outlined"
          value={shopname}
          onChange={onChangeShopname}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={onChangeEmail}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Contact Number"
          variant="outlined"
          value={contact}
          onChange={onChangeContact}
        />
      </Grid>


      <Grid item xs={12}>
        <TextField
          label="Opening Time"
          variant="outlined"
          value={opentime}
          onChange={onChangeOpentime}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="Closing Time"
          variant="outlined"
          value={closetime}
          onChange={onChangeClosetime}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField

          label="Password"
          type="password"
          value={password}
          autoComplete="current-password"
          variant="outlined"
          onChange={onChangePassword}
        />
      </Grid>

      <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmit}>
          Register
        </Button>
      </Grid>
    </Grid >

  );

};

const Register = (props) => {
  const [user, setUser] = useState('');

  const handleChange = (event) => {
    setUser(event.target.value);
  };

  return (
    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12} align={"center"}>
        <FormControl sx={{ m: 1, minWidth: 250 }}>
          <InputLabel id="simple-select-label">USER</InputLabel>
          <Select
            labelId="simple-select-label"
            id="demo-simple-select"
            value={user}
            label="USER"
            onChange={handleChange}
          >
            <MenuItem value={0}>Buyer</MenuItem>
            <MenuItem value={1}>Vendor</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      {user === 0 && <Register_buyer />}
      {user === 1 && <Register_vendor />}
    </Grid>
  );
};

export default Register;
