import React, { useState, useEffect } from "react";
import { Box, Grid, Paper } from "@mui/material";
import classes from "./machineOnboard.module.css";
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
import { FormControlLabel } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DashboardContainer from "../DashboardContainer";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
import axios from "../../../../axios_tteg";
import { useAlert } from "react-alert";
import Cookies from "universal-cookie";
import { parseWithOptions } from "date-fns/fp";

const cookies = new Cookies();


export default function ParticularMachineOnboard(props) {
  const fileTypes = ["PDF"];

  const [goToOnboarding, setGoToOnboarding] = useState(false);

  const [ownerFound, setOwnerFound] = React.useState(props.particularMachineDetails.machineDetails.resourceOwner === 'true' ? 1:2);

  const [value, setValue] = React.useState(new Date());

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [miData, setMIData] = useState({
    mType: {
      value: props.particularMachineDetails.machineDetails.machineTypeID.toString(),
      valid: true,
    },
    oem: {
      value: props.particularMachineDetails.machineDetails.OEM,
      valid: true,
    },
    machineCapacity: {
      value: props.particularMachineDetails.machineDetails.machineCapacityInTonnes,
      valid: true,
    },
    modelNumber: {
      value: props.particularMachineDetails.machineDetails.modelNumber,
      valid: true,
    },
    machineAvailableSectors: {
      value: props.particularMachineDetails.machineDetails.machineAvailabilitySectors,
      valid: true,
    },
  });

  const [machineType, setMachineType] = useState([]);

  useEffect(() => {
    console.log(props);
    
    setLoading(true);
    axios
      .get("/getMachineType", {})
      .then((response) => {
        console.log(response.data);
        setLoading(false);
        setMachineType(response.data.machineType);
        // setDomain(response.data.domain);
        // setDomainBase(response.data.domainBase);
        // setTotalSubscriberType(response.data.subscriberType);
        // handleSubscriberType(response.data.subscriberType);
      })
      .catch((e) => console.log(e.response.data.error));
  }, []);

  const handleChange1 = (key, value) => {
    const tempMIData = { ...miData };
    if (value) {
      tempMIData[key].value = value;
      tempMIData[key].valid = true;
    } else {
      tempMIData[key].value = value;
      tempMIData[key].valid = false;
    }
    setMIData(tempMIData);
  };

  /*-----------Machine Owner-------- */

  const [oiData, setOIData] = useState({
    idName: {
      value: props.particularMachineDetails.machineDetails.name,
      valid: true,
    },
    idEmail: {
      value: props.particularMachineDetails.machineDetails.email,
      valid: true,
    },
    bankName: {
      value: props.particularMachineDetails.machineDetails.bankName,
      valid: true,
    },
    ifscCode: {
      value: props.particularMachineDetails.machineDetails.ifscCode,
      valid: true,
    },
    idAddress: {
      value: props.particularMachineDetails.machineDetails.Address,
      valid: true,
    },
    mobNum: {
      value: props.particularMachineDetails.machineDetails.mobile,
      valid: true,
    },
    accNum: {
      value: props.particularMachineDetails.machineDetails.accountNumber,
      valid: true,
    },
    branchAddress: {
      value: props.particularMachineDetails.machineDetails.branchAddress,
      valid: true,
    },
  });
  const handleChange2 = (key, value) => {
    const tempOIData = { ...oiData };
    if (value) {
      tempOIData[key].value = value;
      tempOIData[key].valid = true;
    } else {
      tempOIData[key].value = value;
      tempOIData[key].valid = false;
    }
    setOIData(tempOIData);
  };

  const [docDetail, setDocDetail] = useState({
    file1: {
      docTypeID: "DT-00013",
      value: null,
      isUploaded: false,
      path: props.particularMachineDetails.machineDetails.machineInvoicePath,
    },
    file2: {
      docTypeID: "DT-00014",
      value: null,
      isUploaded: false,
      path: props.particularMachineDetails.machineDetails.machineOperationalManualPath,
    },
  });

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
      .post("/uploadMachine", formData, {})
      .then((response) => {
        console.log(response);
        setLoading(false);
        if (response.status === 200) {
          console.log(response);
          let tempDocDetail = { ...docDetail };
          console.log(tempDocDetail[key].isUploaded);
          tempDocDetail[key].value = null;
          tempDocDetail[key].isUploaded = true;
          tempDocDetail[key].path = response.data.path;
          setDocDetail(tempDocDetail);
        }
      })
      .catch((e) => {
        setLoading(false);
        setError(e.response.error);
      });
  };

  const submitHandler = () => {
    let tempMI = { ...miData };
    let tempOI = { ...oiData };
    let tempDocDetail = { ...docDetail };

    console.log(tempMI);
    console.log(tempOI);
    console.log(ownerFound);

    // let isValid = true;
    // Object.keys(tempHR).map((item) => {
    //   isValid = isValid && tempHR[item].valid;
    // });

    // if (isValid) {

    setLoading(true);
    axios
      .post("/machineOnboarding", {
        resourceID: cookies.get('userData').resourceID,
        machineTypeID: tempMI.mType.value,
        modelNumber: tempMI.modelNumber.value,
        OEM: tempMI.oem.value,
        machineCapacityInTonnes: tempMI.machineCapacity.value,
        machineAvailabilitySectors: tempMI.machineAvailableSectors.value,
        purchaseDates: value,
        resourceOwner: ownerFound == 1 ? true : false,
        machineOwnerDetails: {
          name: tempOI.idName.value,
          email: tempOI.idEmail.value,
          bankName: tempOI.bankName.value,
          ifscCode: tempOI.ifscCode.value,
          Address: tempOI.idAddress.value,
          mobile: tempOI.mobNum.value,
          accountNumber: tempOI.accNum.value,
          branchAddress: tempOI.branchAddress.value,
        },
        machineInvoicePath: tempDocDetail.file1.path,
        machineOperationalManualPath: tempDocDetail.file2.path
      })
      .then((response) => {
        setLoading(false);
        console.log(response);
        if (response.status == 200) {
          alert("Machine Details Entered Successfully");
          console.log("SUCESSFULL RESPONSE");
          console.log(response.data);
          props.getData(false);
        } else {
          setError(response.data.error);
        }
      })
      .catch((e) => {
        setLoading(false);
        setError(e.response.data.error);
      });
    // } else {
    //   setError("*Please fill appropraite data");
    // }
  };

  const submitHandle1 = (file1) => {
    let tempDocDetail = { ...docDetail };
    tempDocDetail.file1.value = file1;
    tempDocDetail.file1.isUploaded = false;
    setDocDetail(tempDocDetail);
  };
  const submitHandle2 = (file2) => {
    let tempDocDetail = { ...docDetail };
    tempDocDetail.file2.value = file2;
    tempDocDetail.file2.isUploaded = false;
    setDocDetail(tempDocDetail);
  };

  let container2 = null;
  if (ownerFound =="2") {
    console.log(ownerFound);
    container2 = (
      <div>
        <Grid>
          <h3 style={{ textAlign: "center" }}>Please Enter Owner Details</h3>
        </Grid>
        <Grid className={classes.details}>
          <Grid className={classes.owner}>
            <Grid>
              <TextField
                style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                id="filled-basic"
                label="Name as in govt ID"
                variant="filled"
                value={oiData.idName.value}
                onChange={(e) => handleChange2("idName", e.target.value)}
              />
            </Grid>
            <Grid>
              <TextField
                style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                id="filled-basic"
                label="Email ID"
                variant="filled"
                value={oiData.idEmail.value}
                onChange={(e) => handleChange2("idEmail", e.target.value)}
              />
            </Grid>
            <Grid>
              <TextField
                style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                id="filled-basic"
                label="Bank name "
                variant="filled"
                value={oiData.bankName.value}
                onChange={(e) => handleChange2("bankName", e.target.value)}
              />
            </Grid>
            <Grid>
              <TextField
                style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                id="filled-basic"
                label="IFSC"
                variant="filled"
                value={oiData.ifscCode.value}
                onChange={(e) => handleChange2("ifscCode", e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid className={classes.owner}>
            <Grid>
              <TextField
                style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                id="filled-basic"
                label="Address as in govt ID"
                variant="filled"
                value={oiData.idAddress.value}
                onChange={(e) => handleChange2("idAddress", e.target.value)}
              />
            </Grid>
            <Grid>
              <TextField
                style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                id="filled-basic"
                label="Mobile number"
                variant="filled"
                value={oiData.mobNum.value}
                onChange={(e) => handleChange2("mobNum", e.target.value)}
              />
            </Grid>
            <Grid>
              <TextField
                style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                id="filled-basic"
                label="Account number"
                variant="filled"
                value={oiData.accNum.value}
                onChange={(e) => handleChange2("accNum", e.target.value)}
              />
            </Grid>
            <Grid>
              <TextField
                style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                id="filled-basic"
                label="Branch address "
                variant="filled"
                value={oiData.branchAddress.value}
                onChange={(e) => handleChange2("branchAddress", e.target.value)}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }

  let container = null;
  container = (
    <div>
      <Box>
        <Paper
          elevation={0}
        >
          <Grid>

            <Grid>
              <Grid
                className={classes.displaying}
                style={{ textAlign: "center", width: "100%", padding :'20px' }}
              >
                <Grid className={classes.style}>
                  <Grid>
                    <FormControl
                      variant="filled"
                      style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                    >
                      <InputLabel id="demo-simple-select-filled-label">
                        Machine Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={miData.mType.value}
                        onChange={(e) => handleChange1("mType", e.target.value)}
                      >
                        {/* <MenuItem value={"MT00001"}>HDD</MenuItem>
                        <MenuItem value={"MT00002"}>Trencher</MenuItem>
                        <MenuItem value={"MT00003"}>Tractor</MenuItem> */}
                        {machineType.map(item=>{
                          return(
                            <MenuItem value={item.machineTypeID} >{item.machineTypeName}</MenuItem>
                          )
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid>
                    <TextField
                      style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                      id="filled-basic"
                      label="OEM"
                      variant="filled"
                      value={miData.oem.value}
                      onChange={(e) => handleChange1("oem", e.target.value)}
                    />
                  </Grid>
                  <Grid>
                    <TextField
                      style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                      id="filled-basic"
                      label="Machine Capacity(in tonnes)"
                      variant="filled"
                      value={miData.machineCapacity.value}
                      onChange={(e) =>
                        handleChange1("machineCapacity", e.target.value)
                      }
                    />
                  </Grid>
                </Grid>

                <Grid className={classes.style} style={{ textAlign: "center" }}>
                  <Grid>
                    <TextField
                      style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                      id="filled-basic"
                      label="Model No"
                      variant="filled"
                      value={miData.modelNumber.value}
                      onChange={(e) =>
                        handleChange1("modelNumber", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid
                    style={{
                      width: "70%",
                      marginLeft: "15%",
                      padding: "1% 0% 1% 0%",
                    }}
                  >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack spacing={1}>
                        <DesktopDatePicker
                          label="Purchase Date*"
                          value={value}
                          minDate={new Date("2017-01-01")}
                          maxDate={new Date()}
                          onChange={(newValue) => {
                            setValue(newValue);
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
                      label="Machine Available Sectors"
                      variant="filled"
                      value={miData.machineAvailableSectors.value}
                      onChange={(e) =>
                        handleChange1("machineAvailableSectors", e.target.value)
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid className={classes.styling1}>
              <Grid className={classes.alignItems}>
                <Grid style={{ textAlign: "left" }}>
                  <h3>Machine Invoice*</h3>
                </Grid>
                <Grid>
                  <Grid style={{ display: "flex" }}>
                    <Grid style={{ width: "80%" }}>
                      <FileUploader
                        multiple={false}
                        handleChange={submitHandle1}
                        name="file1"
                        types={fileTypes}
                      />
                    </Grid>
                    {/* <Checkbox checked={docDetail.file1.isUploaded} /> */}
                  </Grid>
                  <Grid style={{ display: "flex" }}>
                    <p style={{ textAlign: "left", width: "60%" }}>
                      {docDetail.file1.value
                        ? `File name: ${docDetail.file1.value.name}`
                        : "No files uploaded"}
                    </p>
                    <Grid style={{ padding: "1% 20% 1% 0%", width: "40%" }}>
                      <Button
                        style={{
                          borderRadius: "18px",
                          // justifyContent: "right",
                          marginLeft: "0%",
                        }}
                        type="submit"
                        color="primary"
                        variant="contained"
                        disabled={docDetail.file1.value ? false : true}
                        onClick={() => {
                          uploadDocument(docDetail.file1.value, "file1");
                        }}
                      >
                        Upload
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid className={classes.alignItems}>
                <Grid style={{ textAlign: "left" }}>
                  <h3>Machine Operational Manual*</h3>
                </Grid>
                <Grid>
                  <Grid style={{ display: "flex" }}>
                    <Grid style={{ width: "80%" }}>
                      <FileUploader
                        multiple={false}
                        handleChange={submitHandle2}
                        name="file2"
                        types={fileTypes}
                      />
                    </Grid>
                    {/* <Checkbox checked={docDetail.file2.isUploaded} /> */}
                  </Grid>
                  <Grid style={{ display: "flex" }}>
                    <p style={{ textAlign: "left", width: "60%" }}>
                      {docDetail.file2.value
                        ? `File name: ${docDetail.file2.value.name}`
                        : "No files uploaded"}
                    </p>
                    <Grid style={{ padding: "1% 20% 1% 0%", width: "40%" }}>
                      <Button
                        style={{
                          borderRadius: "18px",
                          // justifyContent: "right",
                          marginLeft: "0%",
                        }}
                        type="submit"
                        color="primary"
                        variant="contained"
                        disabled={docDetail.file2.value ? false : true}
                        onClick={() => {
                          uploadDocument(docDetail.file2.value, "file2");
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
          <Grid style={{ textAlign: "left", padding: "0% 0% 0% 7%" }}>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                <h3>Are You the Owner of this Machine ?*</h3>
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={ownerFound}
                value = {ownerFound}
                name="radio-buttons-group"
                onChange={(event) => setOwnerFound(event.target.value)}
              >
                <FormControlLabel value="1" control={<Radio />} label="Yes" />
                <FormControlLabel value="2" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid>
          {container2}
          <Grid style={{ textAlign: "center", padding: "1% 0% 1% 0%" }}>
            <Button variant="contained" onClick={submitHandler}>
              Update
            </Button>
          </Grid>
        </Paper>
      </Box>
    </div>
  );
  return (
    <div>
      {container}
      <p>{error}</p>
    </div>
  );
}
