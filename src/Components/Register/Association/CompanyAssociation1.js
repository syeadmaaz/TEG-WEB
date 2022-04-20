import React, { useState, useEffect } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import axios from "../../../axios_tteg";

import {
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";

export default function CompanyAssociation(props) {
  console.log(props)
  // const [error, setError] = React.useState(null);
  // const [helperText, setHelperText] = React.useState(null);

  const [loading,setLoading] = useState(false)
  const [value, setValue] = React.useState(null);
  const [cName, setCName] = React.useState(null);
  const [compName, setCompName] = React.useState("");
  const [error,setError] = React.useState(null);
  const [disabled,setDisabled] = useState(props.disabled);
  const [asscDetails,setAsscDetails] = React.useState({
    isAssociated:{
      value:null
    },
    companyID:{
      value:null
    },
    companyName:{
      value:null
    },
    managerName:{
      value:null
    },
    managerContactNo:{
      value:null
    }
  })
  //const [newCompanyData,setNewCompanyData]


  useEffect(()=>{
    setLoading(true)
    axios.get('/getCompanyDetails')
    .then(response=>{
      console.log(response)
      console.log(response.data)
      setLoading(false)
      setCName(response.data);
    })
    .catch(e=>{
      setLoading(false)
    })
  },[])


  // const handleChange = (event) => {
  //   setValue(event.target.value);
  //   console.log(value);
  //   setHelperText(" ");
  //   setError(false);
  // };

  const compChange = (value) => {
    let tempAsscDetails = {... asscDetails};
    if(value === 20){
      setCompName(value)
      tempAsscDetails.companyID.value = null;
      tempAsscDetails.isAssociated.value = true;
    }
    else{
      setCompName(null);
      tempAsscDetails.companyID.value = value;
      tempAsscDetails.isAssociated.value = true;
      tempAsscDetails.companyName.value = null;
      tempAsscDetails.managerName.value = null;
      tempAsscDetails.managerContactNo.value = null;
    }
    setAsscDetails(tempAsscDetails)
  };

  const changeHandler = (key,value)=>{
    let tempAsscDetails = {... asscDetails};
    tempAsscDetails[key].value = value;
    setAsscDetails(tempAsscDetails)
  }

  const handleChange = (val) => {
    if (val) {
      if(val == 2){
        let tempAsscDetails = {... asscDetails};
        setCompName(null);
        tempAsscDetails.companyID.value = null;
        tempAsscDetails.isAssociated.value = false;
        tempAsscDetails.companyName.value = null;
        tempAsscDetails.managerName.value = null;
        tempAsscDetails.managerContactNo.value = null;
        setAsscDetails(tempAsscDetails);
      }
      else if(val == 3){
        let tempAsscDetails = {... asscDetails};
        setCompName(null);
        tempAsscDetails.companyID.value = null;
        tempAsscDetails.isAssociated.value = true;
        tempAsscDetails.companyName.value = null;
        tempAsscDetails.managerName.value = null;
        tempAsscDetails.managerContactNo.value = null;
      }
      setValue(val);
      console.log(val);
      // extendPage(val);
    } 
    else {
      setValue(null);
    }
  };

  
  // isAssociated,userID : individualID,companyID,companyName,managerName,managerContactNo
  const submitHandler = ()=>{
    setLoading(true);
    console.log(asscDetails);
    axios.post('/userAssociation',{
      companyID:asscDetails.companyID.value,
      companyName:asscDetails.companyName.value,
      isAssociated: asscDetails.isAssociated.value,
      managerName:asscDetails.managerName.value,
      managerContactNo:asscDetails.managerContactNo.value,
      resourceID: props.resourceID
    })
    .then(response=>{
      if(response.status === 200){
        setDisabled(true);
        props.getData({
          status:1,
          moveToScreen:3
        })
      }
    })
    .catch(e=>{
      setLoading(false);
      setError(e.response.data.error)
    })
  }

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   if (value === 1) {
  //     setHelperText("You got it!");
  //     setError(false);
  //   } else if (value === 2) {
  //     // setHelperText("Sorry, wrong answer!");
  //     // setError(true);
  //   } else {
  //     setHelperText("Please select an option.");
  //     setError(true);
  //   }
  // };

  let container = null;
  container = (
    <div>
      <Grid>
        <p style={{ textAlign: "center", fontWeight:'bold', fontSize:24 }}>Association with Company</p>
        <hr style={{ width: "50%" }}></hr>
      </Grid>
      <Grid style={{ display: "block" }}>
        <Grid
          style={{
            padding: "1% 1% 0% 3%",
            textAlign: "left",
            overflow: "auto",
          }}
        >
          <h3>Are you associated with any company ?</h3>
        </Grid>
        <Grid style={{ textAlign: "left", padding: "0% 0% 1% 3%" }}>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={(event) => handleChange(event.target.value)}
              
            >
              <FormControlLabel value="1" control={<Radio disabled = {disabled} />} label="Yes" />
              <FormControlLabel value="2" control={<Radio disabled = {disabled} />} label="No" />
              <FormControlLabel value="3" control={<Radio disabled = {disabled} />} label="Prefer Not to Disclose" />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );

  let container1 = null;

  if (value == 1 && cName) {
    console.log(value);
    container1 = (
      <div>
        <Grid style={{ textAlign: "left", padding: "0% 0% 1% 3%" }}>
          <FormControl variant="filled" style={{ width: "60%" }}>
            <InputLabel id="demo-simple-select-filled-label">
              Company Name
            </InputLabel>
            <Select
              style={{ textAlign: "left" }}
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={compName?compName:(asscDetails.companyID.value)}
              onChange={(e)=>compChange(e.target.value)}
            >
              {/* <MenuItem value={10}>Select a Company Name</MenuItem> */}
              {cName.map((item) => (
                <MenuItem value={item.userID}>
                  {item.entityName}
                </MenuItem>
              ))}
              <MenuItem value={20}>Others</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </div>
    );
  }

  if (loading && !cName) {
    <CircularProgress/>
  }


  let conatiner3 = null;
  if (compName == 20 && value == 1) {
    conatiner3 = (
      <div>
        <Grid style={{ textAlign: "left", padding: "0% 0% 1% 3%" }}>
          <TextField
            style={{ padding: "1% 1% 1% 0%", width: "60%" }}
            id="filled-basic"
            label="Company Name"
            variant="filled"
            value = {asscDetails.companyName.value}
            onChange = {(e)=>changeHandler('companyName',e.target.value)}
          />
        </Grid>
        <Grid style={{ textAlign: "left", padding: "0% 0% 1% 3%" }}>
          <TextField
            style={{ padding: "1% 1% 1% 0%", width: "60%" }}
            id="filled-basic"
            label="Manager Name"
            variant="filled"
            value = {asscDetails.managerName.value}
            onChange = {(e)=>changeHandler('managerName',e.target.value)}
          />
        </Grid>
        <Grid style={{ textAlign: "left", padding: "0% 0% 1% 3%" }}>
          <TextField
            style={{ padding: "1% 1% 1% 0%", width: "60%" }}
            id="filled-basic"
            label="Contact No"
            variant="filled"
            value = {asscDetails.managerContactNo.value}
            onChange = {(e)=>changeHandler('managerContactNo',e.target.value)}
          />
        </Grid>
      </div>
    );
  }

  return (
    <Paper elevation={24} style={{ height: 620,margin: 10,overflow: 'auto' }}>
      {container}
      {container1}
      {conatiner3}
      <p style = {{fontSize:12, textAlign: 'center',color:'red', margin:5}}>{error}</p>
      <Grid style={{ textAlign: "center", padding: "2% 0% 3% 0%" }}>
        <Button
          style={{ borderRadius: "18px", justifyContent: "center" }}
          type="submit"
          color="primary"
          variant="contained"
          onClick = {submitHandler}
          disabled = {disabled}
        >
          Continue
        </Button>
      </Grid>
    </Paper>
  );
}
