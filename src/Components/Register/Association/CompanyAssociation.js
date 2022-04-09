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
import SearchField from "react-search-field";
import "./CompanyAssociation.css";

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
  // console.log(props);

  const [loading, setLoading] = useState(false);
  const [value, setValue] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [disabled, setDisabled] = useState(props.disabled);
  const [asscDetails, setAsscDetails] = React.useState({
    isAssociated: {
      value: null,
    },
    companyID: {
      value: null,
    },
    companyName: {
      value: null,
    },
    companyPhone: {
      value: null,
    },
    managerName: {
      value: null,
    },
    managerContactNo: {
      value: null,
    },
  });

  const [companyMessage, setCompanyMessage] = useState(null);
  const [companyFound, setCompanyFound] = useState(null);

  const changeHandler = (key, value) => {
    let tempAsscDetails = { ...asscDetails };
    tempAsscDetails[key].value = value;
    setAsscDetails(tempAsscDetails);
  };

  const handleChange = (val) => {
    if (val) {
      if (val == 2) {
        let tempAsscDetails = { ...asscDetails };
        tempAsscDetails.companyID.value = null;
        tempAsscDetails.isAssociated.value = false;
        tempAsscDetails.companyName.value = null;
        tempAsscDetails.managerName.value = null;
        tempAsscDetails.managerContactNo.value = null;
        setAsscDetails(tempAsscDetails);
      } else if (val == 1 || val == 3) {
        let tempAsscDetails = { ...asscDetails };
        tempAsscDetails.companyID.value = null;
        tempAsscDetails.isAssociated.value = true;
        tempAsscDetails.companyName.value = null;
        tempAsscDetails.managerName.value = null;
        tempAsscDetails.managerContactNo.value = null;
      }
      setValue(val);
      console.log(val);
    } else {
      setValue(null);
    }
  };

  // isAssociated,userID : individualID,companyID,companyName,managerName,managerContactNo
  const submitHandler = () => {
    setLoading(true);
    // console.log(asscDetails);
    axios
      .post("/userAssociation", {
        companyID: asscDetails.companyID.value,
        companyName: asscDetails.companyName.value,
        isAssociated: asscDetails.isAssociated.value,
        managerName: asscDetails.managerName.value,
        managerContactNo: asscDetails.managerContactNo.value,
        resourceID: props.resourceID,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setDisabled(true);
          props.getData({
            status: 1,
            moveToScreen: 3,
          });
        }
      })
      .catch((e) => {
        setLoading(false);
        setError(e.response.data.error);
      });
  };

  const handleSearchChange = (value, event) => {
    console.log(value);
    let tempPreRegData = { ...asscDetails };
    if (!value || value === null || value === "") {
      const found = null;
      setCompanyFound(found);
      tempPreRegData["companyName"].value = null;
      tempPreRegData["companyPhone"].value = null;
    }
    setAsscDetails(tempPreRegData);
  };
  const checkValidMobileNUmber = (value) => {
    let pattern = /^[0-9]{1,10}$/;
    return pattern.test(value);
  };
  const handleSearchClick = (enteredValue) => {
    let tempPreRegData = { ...asscDetails };
    let valid = checkValidMobileNUmber(enteredValue);
    if (valid) {
      tempPreRegData["companyPhone"].value = enteredValue;
      tempPreRegData["companyName"].value = null;
    } else {
      tempPreRegData["companyName"].value = enteredValue;
      tempPreRegData["companyPhone"].value = null;
    }
    setAsscDetails(tempPreRegData);

    axios
      .post("/getCompanyDetails", {
        companyName: asscDetails.companyName.value,
        companyMobileNumber: asscDetails.companyPhone.value,
      })
      .then((response) => {
        setLoading(false);
        let tempPreRegData = {...asscDetails}
        if (response.status === 200) {
          console.log(response.data);
          tempPreRegData['companyID'].value = response.data.resourceID
          setCompanyMessage(response.data.message);
          setCompanyFound(true);
          setAsscDetails(tempPreRegData);
        }
      })
      .catch((e) => {
        setLoading(false);
        setCompanyFound(false);
        setCompanyMessage(e.response.data.message);
        console.log(e.response.data.message);
      });
  };
  let container = null;
  container = (
    <div>
      <Grid>
        <h1 style={{ textAlign: "center" }}>Association with Company</h1>
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
              <FormControlLabel
                value="1"
                control={<Radio disabled={disabled} />}
                label="Yes"
              />
              <FormControlLabel
                value="2"
                control={<Radio disabled={disabled} />}
                label="No"
              />
              <FormControlLabel
                value="3"
                control={<Radio disabled={disabled} />}
                label="Prefer Not to Disclose"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );

  // when the individual is associated with a company i.e it clicks on Yes
  let container1 = null;

  if (value == 1) {
    container1 = (
      <div>
        <Grid style={{ textAlign: "left", padding: "0% 0% 1% 3%" }}>
          <FormControl variant="filled" style={{ width: "60%" }}>
            <SearchField
              placeholder="Search for Company Name or Phone Number"
              onSearchClick={(value) => {
                handleSearchClick(value);
              }}
              onChange={(value, event) => {
                handleSearchChange(value, event);
              }}
            />
          </FormControl>
        </Grid>
      </div>
    );
  }

  if (loading) {
    <CircularProgress />;
  }

  let container3 = null;
  if (companyFound === false && value == 1) {
    container3 = (
      <div>
        <p
          style={{ fontSize: 14,  color: "red", margin: 5, marginLeft:200 }}
        >
          {companyMessage}, Please enter company details properly!
        </p>
        <Grid style={{ textAlign: "left", padding: "0% 0% 1% 3%" }}>
          <TextField
            style={{ padding: "1% 1% 1% 0%", width: "60%" }}
            id="filled-basic"
            label="Company Name"
            variant="filled"
            value={null}
            onChange={(e) => changeHandler("companyName", e.target.value)}
          />
        </Grid>
        <Grid style={{ textAlign: "left", padding: "0% 0% 1% 3%" }}>
          <TextField
            style={{ padding: "1% 1% 1% 0%", width: "60%" }}
            id="filled-basic"
            label="Manager Name"
            variant="filled"
            value={asscDetails.managerName.value}
            onChange={(e) => changeHandler("managerName", e.target.value)}
          />
        </Grid>
        <Grid style={{ textAlign: "left", padding: "0% 0% 1% 3%" }}>
          <TextField
            style={{ padding: "1% 1% 1% 0%", width: "60%" }}
            id="filled-basic"
            label="Contact No"
            variant="filled"
            value={asscDetails.managerContactNo.value}
            onChange={(e) => changeHandler("managerContactNo", e.target.value)}
          />
        </Grid>
      </div>
    );
  } else if (companyFound === true && value == 1) {
    container3 = (
      <div>
        <p
          style={{
            fontSize: 14,
            color: "green",
            margin: 5,
            marginLeft:300
          }}
        >
          {companyMessage}
        </p>
        <Grid style={{ textAlign: "left", padding: "0% 0% 1% 3%" }}>
          <TextField
            style={{ padding: "1% 1% 1% 0%", width: "60%" }}
            id="filled-basic"
            label="Company Name"
            variant="filled"
            disabled={true}
            value={asscDetails.companyName.value}
            onChange={(e) => changeHandler("companyName", e.target.value)}
          />
        </Grid>
      </div>
    );
  }
  return (
    <Paper elevation={24} style={{ height: 620, margin: 10, overflow: "auto" }}>
      {container}
      {container1}
      {container3}
      <p style={{ fontSize: 12, textAlign: "center", color: "red", margin: 5 }}>
        {error}
      </p>
      <Grid style={{ textAlign: "center", padding: "2% 0% 3% 0%" }}>
        <Button
          style={{ borderRadius: "18px", justifyContent: "center" }}
          type="submit"
          color="primary"
          variant="contained"
          onClick={submitHandler}
          disabled={disabled}
        >
          Continue
        </Button>
      </Grid>
    </Paper>
  );
}
