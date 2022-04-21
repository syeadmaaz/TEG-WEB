import React, { useState, useEffect } from "react";
import { Box, Grid, Paper, CircularProgress } from "@mui/material";
import classes from "./HumanResourceOnboard.module.css";
import { TextField } from "@mui/material";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import { FileUploader } from "react-drag-drop-files";
import { RadioGroup } from "@mui/material";
import { Radio } from "@mui/material";
import { FormLabel } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DashboardContainer from "../DashboardContainer";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
import Cookies from "universal-cookie"

import axios from "../../../../axios_tteg";

const cookies = new Cookies();

export default function ParticularHumanResource(props) {
  const fileTypes = ["PDF"];

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [disable, setDisable] = useState(true);

  const [domain, setDomain] = React.useState("");
  const [domainBase, setDomainBase] = useState(null);
  const [domainBaseSelected, setDomainBaseSelected] = useState([]);

  const [hrData, setHRData] = useState({
    name: {
      value: props.particularHRDetails.humanResourceInfo.name,
      valid: true,
    },
    dob: {
      value: props.particularHRDetails.humanResourceInfo.dob,
      valid: false,
    },
    aadharNumber: {
      value: props.particularHRDetails.humanResourceInfo.aadharNumber,
      valid: false,
    },
    address: {
      value: props.particularHRDetails.humanResourceInfo.address,
      valid: false,
    },
    country: {
      value: props.particularHRDetails.humanResourceInfo.country,
      valid: false,
    },
    state: {
      value: props.particularHRDetails.humanResourceInfo.state,
      valid: false,
    },
    district: {
      value: props.particularHRDetails.humanResourceInfo.district,
      valid: false,
    },
    city: {
      value: props.particularHRDetails.humanResourceInfo.city,
      valid: false,
    },
    pin: {
      value: props.particularHRDetails.humanResourceInfo.pincode,
      valid: true,
    },
    educationalQualification: {
      value: props.particularHRDetails.humanResourceInfo.eduactionalQualification,
      valid: false,
    },
    maritalStatus: {
      value: props.particularHRDetails.humanResourceInfo.isMarried,
      valid: false,
    },
    tenure: {
      value: props.particularHRDetails.humanResourceInfo.tenure,
      valid: false,
    },
    registrationID: {
      value: props.particularHRDetails.humanResourceInfo.registrationID,
      valid: false,
    },
    skills: {
      value: props.particularHRDetails.humanResourceInfo.skills,
      valid: false,
    },
    experience: {
      value: props.particularHRDetails.humanResourceInfo.experience,
      valid: false,
    },
    domainTypeID: {
      value: [props.particularHRDetails.humanResourceInfo.domainTypeID],
      valid: false,
    },
    relationName: {
      value: props.particularHRDetails.humanResourceInfo.relationName,
      valid: false,
    },
    relationship: {
      value: props.particularHRDetails.humanResourceInfo.relationship,
      valid: false,
    },
    relationPhone: {
      value: props.particularHRDetails.humanResourceInfo.relationPhoneNumber,
      valid: false,
    },
    safePractice: {
      value: props.particularHRDetails.humanResourceInfo.safetyPractice,
      valid: false,
    },
    medicalFitness: {
      value: props.particularHRDetails.humanResourceInfo.medicalFitness,
      valid: false,
    },
  });

  const [docDetail, setDocDetail] = useState({
    fitnessCertificate: {
      docTypeID: "DT-00015",
      value: null,
      isUploaded: false,
      path: null,
    },
  });

  const submitHandler = () => {
    let tempHR = { ...hrData };

    let isValid = true;
    Object.keys(tempHR).map((item) => {
      isValid = isValid && tempHR[item].valid;
    });

    if (isValid && docDetail.fitnessCertificate.isUploaded) {
      console.log("SUBMIT API CALLING");

      setLoading(true);
      axios
        .post("/mResourceHumanResource", {
          resourceID: cookies.get('userData').resourceID,
          humanResourceInfo: {
            name: tempHR.name.value,
            dob: tempHR.dob.value,
            aadharNumber: tempHR.aadharNumber.value,
            address: tempHR.address.value,
            country: tempHR.country.value,
            state: tempHR.state.value,
            district: tempHR.district.value,
            city: tempHR.city.value,
            pincode: tempHR.pin.value,
            eduactionalQualification: tempHR.educationalQualification.value,
            isMarried: tempHR.maritalStatus.value,
            tenure: tempHR.tenure.value,
            registrationID: tempHR.registrationID.value,
            skills: tempHR.skills.value,
            experience: tempHR.experience.value,
            domainTypeID: tempHR.domainTypeID.value,
            relationName: tempHR.relationName.value,
            relationship: tempHR.relationship.value,
            relationPhoneNumber: tempHR.relationPhone.value,
            safetyPractice: tempHR.safePractice.value,
            medicalFitness: tempHR.medicalFitness.value,
            fitnessCertificatePath: docDetail.fitnessCertificate.path,
          },
        })
        .then((response) => {
          setLoading(false);
          // console.log(response)
          if (response.status === 200) {
            console.log("SUCESSFULL RESPONSE");
            console.log(response.data);
            setMessage(response.data.message);
            setDisableButton(true);
            alert('Registered Succefully');
            props.getData(false);
          } else {
            setMessage(response.data.error);
          }
        })
        .catch((e) => {
          setLoading(false);
          setMessage(e.response.data.error);
          console.log(e.response.data.error);
        });
    } else {
      setMessage("**Please Fill The Data Properly**");
    }
  };

  const inputHandler = (key, value) => {
    const tempHRData = { ...hrData };
    if (value) {
      tempHRData[key].value = value;
      tempHRData[key].valid = true;
    } else {
      tempHRData[key].value = value;
      tempHRData[key].valid = false;
    }
    setHRData(tempHRData);
  };

  const uploadDocument = (file, key) => {
    // console.log(pdf.result);
    console.log(file);
    console.log(key);
    var formData = new FormData();

    formData.append("uploadedFile", file);
    formData.append("resourceID", cookies.get('userData').resourceID);
    formData.append("docTypeID", docDetail[key].docTypeID);

    console.log(formData);

    setLoading(true);
    axios
      .post("/uploadFitnessCertificate", formData, {})
      .then((response) => {
        console.log(response);
        setLoading(false);
        if (response.status === 200) {
          console.log(response);
          let tempDocDetail = { ...docDetail };
          // console.log(tempDocDetail[key].isUploaded);
          // tempDocDetail[key].value = null;

          setDisable(true);
          setMessage(null);
          tempDocDetail[key].isUploaded = true;
          tempDocDetail[key].path = response.data.path;
          // console.log(tempDocDetail.path)
          setDocDetail(tempDocDetail);
        }
      })
      .catch((e) => {
        setLoading(false);
        setMessage(e.response.error);
      });
  };

  const fileHandler = (file) => {
    setDisable(false);
    let temp = { ...docDetail };
    temp.fitnessCertificate.value = file;
    temp.fitnessCertificate.isUploaded = false;
    setDocDetail(temp);
  };

  useEffect(() => {
      console.log(props)
    
    setLoading(true);
    axios
      .get("/registerPIUtility1", {})
      .then((response) => {
        console.log(response.data);
        setLoading(false);
        setDomain(response.data.domain);
        setDomainBase(response.data.domainBase);
        // setTotalSubscriberType(response.data.subscriberType);
        // handleSubscriberType(response.data.subscriberType);
        let concatData = '';
        // let ch = [];
        response.data.domain.map((item) => {
            if (item.domainID === props.particularHRDetails.humanResourceInfo.domainTypeID) {
              concatData = item.domainCode
            }
        })

        let ch = concatData.split("");
        setDomainBaseSelected(ch)


        // domainBase.map((item) => {
            
        //     data.map((innerItem) => {
        //       if (item.domainBaseID == innerItem) concatData += item.domainBaseID;
        //     });
        //   });
        //   response.data.domain.map((item) => {
        //     if (item.domainCode === concatData) {
        //       let tempHRData = { ...hrData };
        //       tempHRData["domainTypeID"].value = item.domainID;
        //       tempHRData["domainTypeID"].valid = true;
        //       setHRData(tempHRData);
        //     }
        //   });
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
          let tempHRData = { ...hrData };
          tempHRData["domainTypeID"].value = item.domainID;
          tempHRData["domainTypeID"].valid = true;
          setHRData(tempHRData);
        }
      });
    } else {
      let tempHRData = { ...hrData };
      tempHRData["domainTypeID"].value = null;
      tempHRData["domainTypeID"].valid = false;
      setHRData(tempHRData);
    }
    setDomainBaseSelected(data);
  };

  let container = null;
  if (loading || !domain || !domainBase) {
    container = (
      <Box>
        <Grid>
          <CircularProgress />
        </Grid>
      </Box>
    );
  } else {
    container = (
      <div>
        <Box>
          <Paper
            elevation={0}
            // style={{ height: 635, margin:10, overflow:'auto'}}
          >
            <Grid>

              <Grid>
                <Grid
                  className={classes.displaying}
                  style={{ textAlign: "center", width: "100%", padding:'20px 10px' }}
                >
                  <Grid className={classes.style}>
                    <Grid>
                      <Grid>
                        <TextField
                          style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                          id="filled-basic"
                          label="Name as in govt ID*"
                          variant="filled"
                          value={hrData.name.value}
                          onChange={(e) => inputHandler("name", e.target.value)}
                        />
                      </Grid>
                      <Grid>
                        <TextField
                          style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                          id="filled-basic"
                          label="Aadhar Card Number*"
                          variant="filled"
                          value={hrData.aadharNumber.value}
                          onChange={(e) =>
                            inputHandler("aadharNumber", e.target.value)
                          }
                        />
                      </Grid>
                      <Grid>
                        <TextField
                          style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                          id="filled-basic"
                          label="Country*"
                          variant="filled"
                          value={hrData.country.value}
                          onChange={(e) =>
                            inputHandler("country", e.target.value)
                          }
                        />
                      </Grid>
                      <Grid>
                        <TextField
                          style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                          id="filled-basic"
                          label="District*"
                          variant="filled"
                          value={hrData.district.value}
                          onChange={(e) =>
                            inputHandler("district", e.target.value)
                          }
                        />
                      </Grid>
                      <Grid>
                        <TextField
                          style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                          id="filled-basic"
                          label="Pin Code*"
                          variant="filled"
                          value={hrData.pin.value}
                          onChange={(e) => inputHandler("pin", e.target.value)}
                        />
                      </Grid>
                      <Grid
                        style={{ textAlign: "left", padding: "0% 0% 0% 15%" }}
                      >
                        <FormControl>
                          <FormLabel id="demo-radio-buttons-group-label">
                            <h3>Marital Status*</h3>
                          </FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            value={hrData.maritalStatus.value}
                            name="radio-buttons-group"
                            onChange={(event) =>
                              inputHandler("maritalStatus", event.target.value)
                            }
                          >
                            <FormControlLabel
                              value="Married"
                              control={<Radio />}
                              label="Married"
                            />
                            <FormControlLabel
                              value="Unmarried"
                              control={<Radio />}
                              label="Unmarried"
                            />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Grid>
                      <TextField
                        style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                        id="filled-basic"
                        label="Labour/ESI/PF Registration ID*"
                        variant="filled"
                        value={hrData.registrationID.value}
                        onChange={(e) =>
                          inputHandler("registrationID", e.target.value)
                        }
                      />
                    </Grid>
                    <Grid>
                      <TextField
                        style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                        id="filled-basic"
                        label="Experience in Years and Months*"
                        variant="filled"
                        value={hrData.experience.value}
                        onChange={(e) =>
                          inputHandler("experience", e.target.value)
                        }
                      />
                    </Grid>
                  </Grid>

                  <Grid
                    className={classes.style}
                    style={{ textAlign: "center" }}
                  >
                    <Grid
                      style={{
                        width: "70%",
                        margin: "0% 0% 0% 15%",
                        padding: "1% 0% 1% 0%",
                      }}
                    >
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={1}>
                          <DesktopDatePicker
                            label="Date Of Birth*"
                            value={hrData.dob.value}
                            minDate={new Date("01-01-1970")}
                            maxDate={new Date()}
                            onChange={(newValue) => {
                              inputHandler("dob", newValue);
                            }}
                            renderInput={(params) => (
                              <TextField variant="filled" {...params} />
                            )}
                          />
                        </Stack>
                      </LocalizationProvider>
                    </Grid>

                    <Grid>
                      <TextField
                        style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                        id="filled-basic"
                        label="Address*"
                        variant="filled"
                        value={hrData.address.value}
                        onChange={(e) =>
                          inputHandler("address", e.target.value)
                        }
                      />
                    </Grid>
                    <Grid>
                      <TextField
                        style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                        id="filled-basic"
                        label="State*"
                        variant="filled"
                        value={hrData.state.value}
                        onChange={(e) => inputHandler("state", e.target.value)}
                      />
                    </Grid>
                    <Grid>
                      <TextField
                        style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                        id="filled-basic"
                        label="City*"
                        variant="filled"
                        value={hrData.city.value}
                        onChange={(e) => inputHandler("city", e.target.value)}
                      />
                    </Grid>
                    <Grid>
                      <FormControl
                        variant="filled"
                        style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                      >
                        <InputLabel id="demo-simple-select-filled-label">
                          Educational Qualification*
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-filled-label"
                          id="demo-simple-select-filled"
                          value={hrData.educationalQualification.value}
                          onChange={(e) =>
                            inputHandler(
                              "educationalQualification",
                              e.target.value
                            )
                          }
                        >
                          <MenuItem value={"Matric"}>Matric</MenuItem>
                          <MenuItem value={"Intermediate"}>
                            Intermediate
                          </MenuItem>
                          <MenuItem value={"Graduate"}>Graduate</MenuItem>
                          <MenuItem value={"Post Graduate"}>
                            Post Graduate & Above
                          </MenuItem>
                          <MenuItem value={"None"}>None</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid
                      style={{ textAlign: "left", padding: "0% 0% 0% 15%" }}
                    >
                      <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">
                          <h3>Tenure*</h3>
                        </FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="demo-radio-buttons-group-label"
                          // defaultValue="female"
                          name="radio-buttons-group"
                          value={hrData.tenure.value}
                          onChange={(event) =>
                            inputHandler("tenure", event.target.value)
                          }
                        >
                          <FormControlLabel
                            value="Permanent"
                            control={<Radio />}
                            label="Permanent"
                          />
                          <FormControlLabel
                            value="Temporary"
                            control={<Radio />}
                            label="Temporary"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Grid>
                      <FormControl
                        variant="filled"
                        style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                      >
                        <InputLabel id="demo-simple-select-filled-label">
                          Skills*
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-filled-label"
                          id="demo-simple-select-filled"
                          value={hrData.skills.value}
                          onChange={(e) =>
                            inputHandler("skills", e.target.value)
                          }
                        >
                          <MenuItem value={"Planner"}>Planner</MenuItem>
                          <MenuItem value={"Constructor"}>Constructor</MenuItem>
                          <MenuItem value={"Driver"}>Driver</MenuItem>
                        </Select>
                      </FormControl>
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
                  </Grid>
                </Grid>
              </Grid>

              <Grid>
                <h3
                  style={{
                    textAlign: "left",
                    padding: "0% 0% 0% 7%",
                    color: "grey",
                  }}
                >
                  Next of Kin to be informed in case of accident
                </h3>
                <Grid className={classes.displaying}>
                  <Grid className={classes.style}>
                    <Grid>
                      <TextField
                        style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                        id="filled-basic"
                        label="Name*"
                        variant="filled"
                        value={hrData.relationName.value}
                        onChange={(e) =>
                          inputHandler("relationName", e.target.value)
                        }
                      />
                    </Grid>
                    <Grid>
                      <TextField
                        style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                        id="filled-basic"
                        label="Phone Number*"
                        variant="filled"
                        value={hrData.relationPhone.value}
                        onChange={(e) =>
                          inputHandler("relationPhone", e.target.value)
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid className={classes.style}>
                    <Grid>
                      <TextField
                        style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                        id="filled-basic"
                        label="Relationship*"
                        variant="filled"
                        value={hrData.relationship.value}
                        onChange={(e) =>
                          inputHandler("relationship", e.target.value)
                        }
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid className={classes.displaying}>
                <Grid className={classes.style}>
                  <Grid style={{ textAlign: "left", padding: "0% 0% 0% 15%" }}>
                    <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label">
                        <h3>
                          Willingness to work with safety practices compliance*
                        </h3>
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        // defaultValue="female"
                        name="radio-buttons-group"
                        value={hrData.safePractice.value}
                        onChange={(event) =>
                          inputHandler("safePractice", event.target.value)
                        }
                      >
                        <FormControlLabel
                          value="Yes"
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="No"
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid className={classes.style}>
                  <Grid style={{ textAlign: "left", padding: "0% 0% 0% 15%" }}>
                    <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label">
                        <h3>Medical Fitness*</h3>
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        // defaultValue="female"
                        value={hrData.medicalFitness.value}
                        name="radio-buttons-group"
                        onChange={(event) =>
                          inputHandler("medicalFitness", event.target.value)
                        }
                      >
                        <FormControlLabel
                          value="Yes"
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="No"
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              <Grid style={{ textAlign: "left", padding: "0% 0% 0% 7%" }}>
                <Grid>
                  <h3 style={{ textAlign: "left", color: "grey" }}>
                    Fitness Certificate*
                  </h3>
                </Grid>
                <Grid className={classes.styling1}>
                  <Grid>
                    <Grid style={{ display: "flex" }}>
                      <Grid style={{ width: "80%" }}>
                        <FileUploader
                          multiple={false}
                          handleChange={fileHandler}
                          name="file1"
                          types={fileTypes}
                        />
                      </Grid>
                      <Grid className={classes.alignItems}>
                        <Checkbox
                          checked={docDetail.fitnessCertificate.isUploaded}
                        />
                      </Grid>
                    </Grid>
                    <Grid style={{ display: "flex" }}>
                      <p style={{ textAlign: "left", width: "60%" }}>
                        {docDetail.fitnessCertificate.value
                          ? `File name: ${docDetail.fitnessCertificate.value.name}`
                          : "No files uploaded"}
                      </p>
                      <Grid style={{ padding: "3% 20% 1% 0%", width: "40%" }}>
                        <Button
                          style={{
                            borderRadius: "18px",
                            // justifyContent: "right",
                            marginLeft: "0%",
                          }}
                          type="submit"
                          color="primary"
                          variant="contained"
                          disabled={disable}
                          onClick={() => {
                            uploadDocument(
                              docDetail.fitnessCertificate.value,
                              "fitnessCertificate"
                            );
                          }}
                        >
                          Upload
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <p style={{fontSize: 16, fontWeight:"bold", color:"red"}}>
              {message}
            </p>
            <Grid style={{ textAlign: "center", padding: "3% 0% 3% 0%" }}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={disableButton}
                onClick={submitHandler}
              >
                Update
              </Button>
            </Grid>
          </Paper>
        </Box>
      </div>
    );
  }

  return <div>{container}</div>;
}
