import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Button,
  CircularProgress
} from "@mui/material";
import classes from "./BankDetails.module.css";

import axios from "../../../axios_tteg"


export default function BankDetails(props) {
  const [bankName, setBankName] = useState(null);
  const [loading,setLoading] = useState(false);
  const [bankDetails,setBankDetails] = useState({
    bankName:{
      value:null,
      valid:false
    },
    ifscCode:{
      value:null,
      valid:false
    },
    accountNumber:{
      value:null,
      valid:false
    },
    accountHoldername:{
      value:null,
      valid:false
    },
    branchAddress:{
      value:null,
      valid:false
    }
  });

  const [disabled,setDisabled] = useState(props.disabled);
  const [error,setError] = useState(null);

  useEffect(()=>{
    setLoading(true)
    axios.get('/registerBankNames')
    .then(response=>{
      console.log(response)
      setLoading(false)
      setBankName(response.data);
    })
    .catch(e=>{
      setLoading(false)
    })
  },[])

  
  const handleChange = (key,value)=>{
    const tempBankDetails = { ... bankDetails};
    if(value){
      tempBankDetails[key].value = value;
      tempBankDetails[key].valid = true;
    }
    else{
      tempBankDetails[key].value = value;
      tempBankDetails[key].valid = false;
    }
    setBankDetails(tempBankDetails);
  };

  console.log(props);

  const submitHandler = ()=>{
    let isValid = true;
    Object.keys(bankDetails).map(item=>{
      isValid = isValid && bankDetails[item].valid
    });
    console.log(props)
    if(isValid){
      setLoading(true)
      axios.post('/registerBank',{
        bankName:bankDetails.bankName.value,
        ifscCode:bankDetails.ifscCode.value,
        accountNumber:bankDetails.accountNumber.value,
        bankName:bankDetails.bankName.value,
        accountHolderName:bankDetails.accountHoldername.value,
        resourceID:props.resourceID,
        branchAddress:bankDetails.branchAddress.value,
      })
      .then(response=>{
        setLoading(false);
        console.log(response)
        if(response.status === 201){
          setDisabled(true);
          if(props.resourceTypeID === 'I'){
            props.getData({
              status:1,
              moveToScreen:5
            })
          }
          else{
            props.getData({
              status:1,
              moveToScreen:3
            })
          }
          
        }
        else{
          setError(response.data.error);
        }
      })
      .catch(e=>{
        setLoading(false);
        setError(e.response.data.error)
      })
    }
    else{
      setError('*Please fill appropraite data')
    }
  }

  console.log(bankDetails);

  let container = null;

  if(loading || !bankName){
    container = (
      <Box>
        <Paper elevation={24} style={{ height:620,margin:10, overflow:'auto'}}>
          <Grid >
            <Grid>
              <p
                style={{
                  textAlign: "center",
                  padding: "20px 10px",
                  justifyContent: "center",
                  margin:'0px auto',
                  fontSize:24,
                  fontWeight:'bold'
                }}
              >
                Bank Details
                <hr style={{ width: "50%" }} />
              </p>
            </Grid>
            <Grid>
              <CircularProgress/>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    )
  }
  else{
    container = (
      <Box>
        <Paper elevation={24} style={{ height:620,margin:10, overflow:'auto'}}>
          <Grid>
            <Grid>
              <Grid>
                <p
                  style={{
                    textAlign: "center",
                    padding: "20px 10px",
                    margin:'0px auto',
                    fontSize:24,
                    fontWeight:'bold'
                  }}
                >
                  Bank Details
                  <hr style={{ width: "50%" }} />
                </p>
              </Grid>
              <p style={{padding: '0 7.5%',color: 'red',fontSize: 'small'}}>Fields marked with * are compulsary</p>
              <Grid className={classes.InputStyle}>
                <Grid className={classes.InputBox}>
                  <Grid>
                    <FormControl
                      variant="filled"
                      style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                    >
                      <InputLabel id="demo-simple-select-filled-label">
                        Bank Name*
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={bankDetails.bankName.value}
                        disabled={disabled}
                        onChange={(e)=>handleChange('bankName',e.target.value)}
                      >
                        {bankName.map(item=>(
                            <MenuItem value={item.bankName}>{item.bankName}</MenuItem>
                          )
                        )}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid>
                    <TextField
                      style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                      id="filled-basic"
                      label="IFSC Code*"
                      variant="filled"
                      disabled={disabled}
                      value = {bankDetails.ifscCode.value}
                      onChange={(e)=>handleChange('ifscCode',e.target.value)}
                    />
                  </Grid>
                  <Grid>
                    <TextField
                      style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                      id="filled-basic"
                      label="Account Holder Name*"
                      variant="filled"
                      disabled={disabled}
                      value = {bankDetails.accountHoldername.value}
                      onChange={(e)=>handleChange('accountHoldername',e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Grid  className={classes.InputBox}>
                  <Grid>
                    <TextField
                      style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                      id="filled-basic"
                      label="Account Number*"
                      variant="filled"
                      value = {bankDetails.accountNumber.value}
                      onChange={(e)=>handleChange('accountNumber',e.target.value)}
                      disabled={disabled}
                    />
                  </Grid>
                  <Grid>
                    <TextField
                      style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                      id="filled-basic"
                      label="Branch Address*"
                      variant="filled"
                      value = {bankDetails.branchAddress.value}
                      onChange={(e)=>handleChange('branchAddress',e.target.value)}
                      disabled={disabled}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <p style = {{fontSize:12, textAlign: 'center',color:'red', margin:5}}>{error}</p>
              <Grid style={{ textAlign: "center", padding: "2% 0% 2% 0%" }}>
                {/* <SvgButton>Continue</SvgButton> */}
                <Button
                  style={{ borderRadius: "18px", justifyContent: "center" }}
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={disabled}
                  onClick= {submitHandler}
                >
                  Continue
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    )
  }

  return (
    <div>
      {container}
    </div>
  );
}
