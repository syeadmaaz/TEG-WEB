import React, { useState } from "react";
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
import CloseIcon from '@mui/icons-material/Close';
import DashboardContainer from "../DashboardContainer";
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import axios from "../../../../axios_tteg";


export default function MachineOnboard(props) {
  const fileTypes = ["PDF"];

  const [goToOnboarding, setGoToOnboarding] = useState(false);

  const [ownerFound, setOwnerFound] = React.useState(null);

  const [value, setValue] = React.useState(new Date());

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [miData, setMIData] = useState({
      mType:{
          value: 0,
          valid: false
      },
      mMakeNum:{
        value: null,
        valid: false
    },
    mCap:{
        value: null,
        valid: false
    },
    serialNumber:{
        value: null,
        valid: false
    },
    mAvailableSectors:{
        value: null,
        valid: false
    },
  });
  const handleChange1 = (key,value)=>{
    const tempMIData = { ... miData};
    if(value){
      tempMIData[key].value = value;
      tempMIData[key].valid = true;
    }
    else{
      tempMIData[key].value = value;
      tempMIData[key].valid = false;
    }
    setMIData(tempMIData);
  }

  /*-----------Machine Owner-------- */

  const [oiData, setOIData] = useState({
    idName:{
        value: null,
        valid: false
    },
    idEmail:{
      value: null,
      valid: false
  },
  bankName:{
      value: null,
      valid: false
  },
  ifscCode:{
      value: null,
      valid: false
  },
  idAddress:{
      value: null,
      valid: false
  },
  mobNum:{
    value: null,
    valid: false
},
accNum:{
    value: null,
    valid: false
},
branchAddress:{
    value: null,
    valid: false
},
});
const handleChange2 = (key,value)=>{
  const tempOIData = { ... oiData};
  if(value){
    tempOIData[key].value = value;
    tempOIData[key].valid = true;
  }
  else{
    tempOIData[key].value = value;
    tempOIData[key].valid = false;
  }
  setOIData(tempOIData);
}



  const [docDetail, setDocDetail] = useState({
    file1: {
      docTypeID: "DT-00013",
      value: null,
      isUploaded: false,
      path: null,
    },
    file2: {
      docTypeID: "DT-00014",
      value: null,
      isUploaded: false,
      path: null,
    },
  });

  const uploadDocument = (file, key) => {

    // console.log(pdf.result);
    console.log(file);
    console.log(key);
    var formData = new FormData();

    formData.append("uploadedFile", file);
    formData.append("resourceID", props.resourceID);
    formData.append("docTypeID", docDetail[key].docTypeID);

    console.log(formData);

    setLoading(true)
    axios
      .post("/uploadMachine", formData, {
      })
      .then((response) => {
        console.log(response);
        setLoading(false);
        if (response.status === 200) {
          console.log(response)
          let tempDocDetail = { ...docDetail };
          console.log(tempDocDetail[key].isUploaded);
          tempDocDetail[key].value = null;
          tempDocDetail[key].isUploaded = true;
          tempDocDetail[key].path= response.data.path
          setDocDetail(tempDocDetail);
        }
      })
      .catch((e) => {
        setLoading(false);
        setError(e.response.error);
      });
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
  if (ownerFound === '2') {
    console.log(ownerFound);
    container2 = (
      <div>
            <Grid>
              <h3 style={{ textAlign: "center" }}>
                Please Enter Owner Details
              </h3>
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
                    onChange={(e)=>handleChange2('idName',e.target.value)}
                  />
                </Grid>
                <Grid>
                  <TextField
                    style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                    id="filled-basic"
                    label="Email ID"
                    variant="filled"
                    value={oiData.idEmail.value}
                    onChange={(e)=>handleChange2('idEmail',e.target.value)}
                  />
                </Grid>
                <Grid>
                  <TextField
                    style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                    id="filled-basic"
                    label="Bank name "
                    variant="filled"
                    value={oiData.bankName.value}
                    onChange={(e)=>handleChange2('bankName',e.target.value)}
                  />
                </Grid>
                <Grid>
                  <TextField
                    style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                    id="filled-basic"
                    label="IFSC"
                    variant="filled"
                    value={oiData.ifscCode.value}
                    onChange={(e)=>handleChange2('ifscCode',e.target.value)}
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
                    onChange={(e)=>handleChange2('idAddress',e.target.value)}
                  />
                </Grid>
                <Grid>
                  <TextField
                    style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                    id="filled-basic"
                    label="Mobile number"
                    variant="filled"
                    value={oiData.mobNum.value}
                    onChange={(e)=>handleChange2('mobNum',e.target.value)}
                  />
                </Grid>
                <Grid>
                  <TextField
                    style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                    id="filled-basic"
                    label="Account number"
                    variant="filled"
                    value={oiData.accNum.value}
                    onChange={(e)=>handleChange2('accNum',e.target.value)}
                  />
                </Grid>
                <Grid>
                  <TextField
                    style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                    id="filled-basic"
                    label="Branch address "
                    variant="filled"
                    value={oiData.branchAddress.value}
                    onChange={(e)=>handleChange2('branchAddress',e.target.value)}
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
        <Paper >
          <Grid>
           
            <Grid>
              <h3 style={{ textAlign: "center", margin:20 }}>
                Machine Info
              </h3>
            </Grid>

            <Grid>
              <Grid
                className={classes.displaying}
                style={{ textAlign: "center", width: "100%" }}
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
                        onChange={(e)=>handleChange1('mType',e.target.value)}
                      >
                        <MenuItem value={10}>HDD</MenuItem>
                        <MenuItem value={20}>Trencher</MenuItem>
                        <MenuItem value={30}>Tractor</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid>
                    <TextField
                      style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                      id="filled-basic"
                      label="Machine No + Machine Make"
                      variant="filled"
                      value={miData.mMakeNum.value}
                        onChange={(e)=>handleChange1('mMakeNum',e.target.value)}
                    />
                  </Grid>
                  <Grid>
                    <TextField
                      style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                      id="filled-basic"
                      label="Machine Capacity"
                      variant="filled"
                      value={miData.mCap.value}
                      onChange={(e)=>handleChange1('mCap',e.target.value)}
                    />
                  </Grid>
                </Grid>

                <Grid className={classes.style} style={{ textAlign: "center" }}>
                  <Grid>
                    <TextField
                      style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                      id="filled-basic"
                      label="Serial No"
                      variant="filled"
                      value={miData.serialNumber.value}
                      onChange={(e)=>handleChange1('serialNum',e.target.value)}
                    />
                  </Grid>
                  <Grid style={{ width: "70%", marginLeft: "15%" }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack spacing={1}>
                        <DesktopDatePicker
                          label="For desktop"
                          value={value}
                          minDate={new Date("2017-01-01")}
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
                      value={miData.mAvailableSectors.value}
                      onChange={(e)=>handleChange1('mAvailableSectors',e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid className={classes.styling1}>
              <Grid className={classes.alignItems}>
                <Grid>
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
                <Grid>
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
          <Grid style={{ textAlign: "left", padding: "0% 0% 0% 8%" }}>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                <h3>Are You the Owner of this Machine ?*</h3>
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                onChange={(event) => setOwnerFound(event.target.value)}
              >
                <FormControlLabel value="1" control={<Radio />} label="Yes" />
                <FormControlLabel value="2" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

          </Grid>
          {container2}
          <Grid style={{textAlign: 'center', padding: '1% 0% 1% 0%'}}>
                <Button  variant="contained">Continue</Button>
                </Grid>
          
        </Paper>
      </Box>
    </div>
  );
  return (
    <div>
      {container}
    </div>
  );
}
