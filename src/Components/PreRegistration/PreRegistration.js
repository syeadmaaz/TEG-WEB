import React, { useState, useEffect } from "react";
import classes from "./PreRegistration.module.css";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Select,
  Typography,
  Link,
  Box,
  MenuItem,
  InputLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  CircularProgress,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import Checkbox from "@mui/material/Checkbox";
import axios from "../../axios_tteg";
import PreRegCompleted from "./PreRegCompleted";
import Logo from "../../assets/images/logo.png";

const PreRegistrationPage = (props) => {
  const [preRegData, setPreRegData] = useState({
    name: {
      value: null,
      valid: false,
    },
    mobile: {
      value: null,
      valid: false,
    },
    domainTypeID: {
      value: 0,
      valid: false,
    },
    email: {
      value: null,
      valid: true,
    },
    resourceTypeID: {
      value: "C",
      valid: true,
    },

    subscriberTypeID: {
      value: 0,
      valid: false,
    },
    refferalID: {
      value: null,
      valid: true,
    },
  });
  const [error, setError] = useState(null);
  const [domain, setDomain] = React.useState("");
  const [domainBase, setDomainBase] = useState(null);
  const [domainBaseSelected, setDomainBaseSelected] = useState([]);
  const [subscriberType, setSubscriberType] = React.useState("");
  const [totalSubscriberType, setTotalSubscriberType] = useState(null);
  const [mobileNumError, setMobileNumError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [agreeCheckBox, setAgreeCheckBox] = useState(null);
  const [preRegCompleted, setPreRegCompleted] = useState({
    status: false,
    message: null,
  });
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/registerPIUtility1", {})
      .then((response) => {
        console.log(response);
        setLoading(false);
        setDomain(response.data.domain);
        setDomainBase(response.data.domainBase);
        setTotalSubscriberType(response.data.subscriberType);
        handleSubscriberType(response.data.subscriberType);
      })
      .catch((e) => console.log(e.response.data.error));
  }, []);

  const handleChangeDomain = (data) => {
    if (data.length > 0) {
      let concatData = "";
      domainBase.map((item) => {
        data.map((innerItem) => {
          if (item.domainBaseID == innerItem) concatData += item.domainBaseID;
        });
      });
      domain.map((item) => {
        if (item.domainCode === concatData) {
          let tempPreRegData = { ...preRegData };
          tempPreRegData["domainTypeID"].value = item.domainID;
          tempPreRegData["domainTypeID"].valid = true;
          setPreRegData(tempPreRegData);
        }
      });
    } else {
      let tempPreRegData = { ...preRegData };
      tempPreRegData["domainTypeID"].value = null;
      tempPreRegData["domainTypeID"].valid = false;
      setPreRegData(tempPreRegData);
    }
    setDomainBaseSelected(data);
  };

  const handleSubscriberType = (subscriberType) => {
    let filteredSubscriberType = [];
    subscriberType.map((item) => {
      if (item.resourceTypeID === preRegData.resourceTypeID.value) {
        filteredSubscriberType.push(item);
      }
    });
    setSubscriberType(filteredSubscriberType);
  };

  console.log(preRegData);

  const handleChange = (key, value) => {
    console.log(key, value);
    let tempPreRegData = { ...preRegData };
    if (value) {
      if (key === "resourceTypeID") {
        tempPreRegData[key].value = value;
        tempPreRegData[key].valid = true;
        tempPreRegData["subscriberTypeID"].value = null;
        tempPreRegData["subscriberTypeID"].valid = false;
        handleSubscriberType(totalSubscriberType);
      } else if (key === "mobile") {
        let valid = checkValidMobileNUmber(value);
        tempPreRegData[key].value = value;
        tempPreRegData[key].valid = valid;
        valid
          ? setMobileNumError(null)
          : setMobileNumError("Enter 10 digit mobile number");
      } else {
        tempPreRegData[key].value = value;
        tempPreRegData[key].valid = true;
      }
    } else {
      if (key === "mobile") {
        let valid = checkValidMobileNUmber(value);
        tempPreRegData[key].value = value;
        tempPreRegData[key].valid = valid;
      } else if (key === "email" || "refferalID") {
        tempPreRegData[key].value = null;
        tempPreRegData[key].valid = true;
      } else {
        tempPreRegData[key].value = null;
        tempPreRegData[key].valid = false;
      }
    }
    setPreRegData(tempPreRegData);
  };

  const checkValidPassword = (value) => {
    let pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*_?&])[A-Za-z\d@$!%*_?&]{8,}$/;
    return pattern.test(value);
  };

  const checkValidConfirmPassword = (value) => {
    return value === preRegData["password"].value;
  };

  const checkValidMobileNUmber = (value) => {
    let pattern = /^[0-9]{1,10}$/;
    return pattern.test(value);
  };

  const submitHandler = () => {
    let isValid = true;
    Object.keys(preRegData).map((item) => {
      isValid = isValid && preRegData[item].valid;
    });
    isValid = isValid && agreeCheckBox;
    if (isValid) {
      setLoading(true);
      axios
        .post("/preRegister", {
          email: preRegData.email.value,
          name: preRegData.name.value,
          mobile: preRegData.mobile.value,
          subscriberTypeID: preRegData.subscriberTypeID.value,
          domainID: preRegData.domainTypeID.value,
          resourceTypeID: preRegData.resourceTypeID.value,
          subscriberCategoryID: props.subscriberCategoryID,
          refferalID: preRegData.refferalID.value,
        })
        .then((response) => {
          setLoading(false);
          console.log(response);
          if (response.status === 201) {
            setPreRegCompleted({
              status: true,
              message: response.data.message,
              screen: 1,
            });
            setUserData({
              resourceID: response.data.resourceID,
              resourceTypeID: response.data.resourceTypeID,
              registrationComplete: response.data.registrationComplete,
            });
          } else {
            setPreRegCompleted({ status: false, message: null });
            setError(response.data.error);
          }
        })
        .catch((e) => {
          setLoading(false);
          setError(e.response.data.error);
        });
    } else {
      setError("*Please fill appropriate data");
    }
  };

  let container = null;
  if (loading || !domain || !subscriberType || !domainBase) {
    container = (
      <Box style={{ padding: "2%", width: "85%", margin: "auto" }}>
        <Paper elevation={24} style={{ padding: 20 }}>
          <Grid className={classes.style}>
            <Grid>
              <p
                style={{
                  textAlign: "center",
                  padding: "20px 10px",
                  justifyContent: "center",
                  margin: "0px auto",
                  fontSize:24,
                  fontWeight:'bold'
                }}
              >
                Register
                <hr style={{ width: "50%" }} />
              </p>
            </Grid>
            <Grid
              style={{
                textAlign: "center",
                alignItems: "center",
                margin: "15% auto",
              }}
            >
              <CircularProgress />
            </Grid>
          </Grid>
        </Paper>
      </Box>
    );
  } else if (preRegCompleted.status && userData) {
    container = (
      <PreRegCompleted
        message={preRegCompleted.message}
        resourceID={userData.resourceID}
        resourceTypeID={userData.resourceTypeID}
        registrationComplete={userData.registrationComplete}
        screen={preRegCompleted.screen}
      />
    );
  } else {
    container = (
      <Box style={{ padding: "2%", width: "85%", margin: "auto" }}>
        <Paper elevation={24} style={{ padding:20 }}>
          <Grid>
            <img src = {Logo} style = {{maxWidth:'100%'}}/>
            <Grid className={classes.style}>
              <Grid>
                <p
                  style={{
                    textAlign: "center",
                    padding: "20px 10px",
                    justifyContent: "center",
                    margin: "0px auto",
                    fontSize:24,
                    fontWeight:'bold'
                  }}
                >
                  Register
                  <hr style={{ width: "50%" }} />
                </p>
              </Grid>
              <p style={{ padding: "0 7.5%", color: "red", fontSize: "small" }}>
                Fields marked with * are compulsary
              </p>
              <Grid
                style={{
                  background: "aliceblue",
                  margin: "20px 7%",
                  display: "flex",
                }}
              >
                <FormControl style={{ padding: "10px" }}>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={preRegData.resourceTypeID.value}
                    onChange={(e) =>
                      handleChange("resourceTypeID", e.target.value)
                    }
                  >
                    <FormControlLabel
                      value="C"
                      control={<Radio />}
                      label="I am a Company"
                    />
                    <FormControlLabel
                      value="I"
                      control={<Radio />}
                      label="I am an Individual"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <div
                className={classes.TextFields}
                style={{ textAlign: "center", width: "100%" }}
              >
                <Grid  style={{ width: "100%", textAlign: "center",display:'block' }}>
                  <Grid>
                    <TextField
                      style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                      id="filled-basic"
                      label="Name as in Govt.ID*"
                      variant="filled"
                      value={preRegData.name.value}
                      onChange={(e) => handleChange("name", e.target.value)}
                    />
                  </Grid>
                  <Grid>
                    <FormControl
                      variant="filled"
                      style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                    >
                      <InputLabel id="demo-simple-select-filled-label">
                        Domain*
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        multiple={true}
                        value={domainBaseSelected}
                        onChange={(e) => handleChangeDomain(e.target.value)}
                      >
                        {domainBase.map((item) => (
                          <MenuItem value={item.domainBaseID}>
                            {item.domainBaseName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid>
                    <TextField
                      style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                      id="filled-basic"
                      label="Email"
                      variant="filled"
                      value={preRegData.email.value}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                  </Grid>
                </Grid>

                <Grid style={{ width: "100%", textAlign: "center" }}>
                  <Grid>
                    <TextField
                      style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                      id="filled-basic"
                      label="Contact Number*"
                      variant="filled"
                      value={preRegData.mobile.value}
                      onChange={(e) => handleChange("mobile", e.target.value)}
                    />
                    <p
                      style={{
                        fontSize: 12,
                        textAlign: "center",
                        color: "red",
                      }}
                    >
                      {mobileNumError}
                    </p>
                  </Grid>
                  <Grid>
                    <FormControl
                      variant="filled"
                      style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                    >
                      <InputLabel id="demo-simple-select-filled-label">
                        Subscriber Type*
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={preRegData.subscriberTypeID.value}
                        onChange={(e) =>
                          handleChange("subscriberTypeID", e.target.value)
                        }
                      >
                        {subscriberType.map((item) => (
                          <MenuItem value={item.subscriberTypeID}>
                            {item.subscriberTypeName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid>
                    <TextField
                      style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                      id="filled-basic"
                      label="Refferal ID"
                      variant="filled"
                      value={preRegData.refferalID.value}
                      onChange={(e) =>
                        handleChange("refferalID", e.target.value)
                      }
                    />
                  </Grid>
                </Grid>
              </div>

              <Grid>
                <FormGroup style={{ padding: "0 8%" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={agreeCheckBox}
                        onChange={(e) => setAgreeCheckBox(e.target.checked)}
                      />
                    }
                    label="I confirm that I have checked the information entered by me as per instructions provided on the form. Please go ahead with saving the information"
                  />
                </FormGroup>
              </Grid>
              <p
                style={{
                  fontSize: 12,
                  textAlign: "center",
                  color: "red",
                  margin: 5,
                }}
              >
                {error}
              </p>

              <Grid
                style={{
                  padding: "0 5%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <Button variant="text" onClick={() => props.getData(2)}>
                    Back
                  </Button>
                </div>
                <div>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    onClick={submitHandler}
                  >
                    Submit
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    );
  }

  return <div>{container}</div>;
};

export default PreRegistrationPage;
