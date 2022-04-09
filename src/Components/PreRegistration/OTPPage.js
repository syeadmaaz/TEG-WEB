import React, { useState } from 'react';
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
  import axios from "../../axios_tteg"
  import Cookies from 'universal-cookie'

  const cookies = new Cookies();
  
const OTPPage = (props)=>{
    console.log(props)

    const [otp,setOTP] = useState(null);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false);

    const handleChange = (value)=>{
        setOTP(value)
    }

    const submitHandler = ()=>{
        setLoading(true);
        axios.post('/validateOtp',{
            resourceID:props.resourceID,
            otp:otp
        })
        .then(response=>{
            setLoading(false)
            console.log(response);
            if(response.status === 200){
                if(response.data.registrationComplete == true && response.data.isVerified == true) {
                    cookies.set('userData',{
                      resourceID: response.data.resourceID,
                      resourceTypeID: response.data.resourceTypeID,
                      subscriberTypeID: response.data.subscriberTypeID,
                      domainID: response.data.domainID,
                    }, { path: "/" });
                    // console.log(cookies.get("userData"));
                  }
                props.getData(2);
            }
        })
        .catch(e=>{
            setLoading(false);
            setError(e.response.data.error)
        })
        
    }

    let container = null;
    if(loading){
        container = (
            <div>
                <Box style={{ padding: '10% 0', width:'85%', margin:'auto' }}>
                    <Paper elevation={24} style={{width:420,margin:'auto' }}>
                        <Grid style = {{width:'320px', margin:'auto', padding:'10% 0'}}>
                            <Grid style={{textAlign :'center', alignItems:'center'}}>
                                <h2>One Time Password</h2>
                            </Grid>
                            <Grid style = {{textAlign:'center'}}>
                                <CircularProgress/>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            </div>
        )
    }
    else{
        container = (
            <div>
                <Box style={{ padding: '2%', width:'85%', margin:'auto' }}>
                    <Paper elevation={24} style={{width:420, margin:'auto' }}>
                        <Grid style = {{width:'320px', margin:'auto', padding:'10% 0'}}>
                            <Grid style={{textAlign :'center', alignItems:'center'}}>
                                <h2>One Time Password</h2>
                            </Grid>
                            <Grid>
                                <TextField
                                style={{ padding: "1% 1% 1% 1%", width: "100%" }}
                                id="filled-basic"
                                label="Enter OTP*"
                                variant="filled"
                                value = {otp}
                                onChange={(e)=>handleChange(e.target.value)}
                                />
                            </Grid>
                            <p style = {{fontSize:12, textAlign: 'center',color:'red', margin:5}}>{error}</p>
                            <Grid style = {{padding: '0 5%',display: 'flex',justifyContent: 'space-between'}}>
                                <div>
                                    <Button variant="text">Resend OTP</Button>
                                </div>
                                <div>
                                    <Button variant="contained" onClick = {submitHandler}>subMit</Button>
                                </div>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            </div>
        )
    }
    
    return(
        <div>
            {container}
        </div>
    )
}

export default OTPPage