import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import classes from "./Personal.module.css";
import axios from "../../../axios_tteg"
import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { Box } from "@mui/system";

export default function Personal(props) {
  console.log(props);
  const [entity, setEntity] = React.useState("");
  const [loading,setLoading] = useState(false);
  const [piData,setPIData] = useState({
    entityName:{
      value:null,
      valid:false
    },
    entityTypeID:{
      value:0,
      valid:false
    },
    address:{
      value:null,
      valid:false
    },
    pinCode:{
      value:null,
      valid:false
    },
    country:{
      value:null,
      valid:false
    },
    state:{
      value:null,
      valid:false
    },
    city:{
      value:null,
      valid:false
    },
    aadharCardNo:{
      value:null,
      valid:false
    },
  })

  const [disabled,setDisabled] = useState(props.disabled);
  const [error,setError] = useState(null);

  useEffect(()=>{
    setLoading(true);
    
    axios.get('/registerPIUtility',{
      params:{
        resourceTypeID:props.resourceTypeID
      }
    })
    .then(response=>{
      setLoading(false);
      setEntity(response.data.entityType);
    })
    .catch(e=>console.log(e))
  },[])


  const handleChange = (key,value)=>{
    const tempPIData = { ... piData};
    if(value){
      tempPIData[key].value = value;
      tempPIData[key].valid = true;
    }
    else{
      tempPIData[key].value = value;
      tempPIData[key].valid = false;
    }
    setPIData(tempPIData);
  }

  
  const submitHandler = ()=>{
    let isValid = true;
    Object.keys(piData).map(item=>{
      isValid = isValid && piData[item].valid
    });
    if(isValid){
      setLoading(true)
      axios.post('/registerPISubmit',{
        entityName:piData.entityName.value,
        entityTypeID:piData.entityTypeID.value,
        address:{
          address:piData.address.value,
          pinCode:piData.pinCode.value,
          city:piData.city.value,
          country:piData.country.value,
          state:piData.state.value
        },
        aadharCardNo:piData.aadharCardNo.value,
        resourceID:props.resourceID
      })
      .then(response=>{
        setLoading(false);
        console.log(response)
        if(response.status === 201){
          setDisabled(true);
          props.getData({
            status:1,
            moveToScreen:2
          })
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

  console.log(piData);
  
  let container = null;
  if(loading || !entity){
    container = (
      <Box>
        <Paper elevation={24} style={{ height:620,margin:10, overflow:'auto'}}>
          <Grid className={classes.style}>
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
                Personal Information
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
            {/* <Grid>
              <h1 style={{ textAlign: "center", padding: "2% 0% 2% 0%" }}>
                Register
              </h1>
            </Grid> */}

            <Grid >
              <Grid>
                <p
                  style={{
                    textAlign: "center",
                    padding: "20px 10px",
                    justifyContent: "center",
                    margin:'0px auto'
                  }}
                >
                  Personal Information
                  <hr style={{ width: "50%" }} />
                </p>
              </Grid>
              <p style={{padding: '0 7.5%',color: 'red',fontSize: 'small'}}>Fields marked with * are compulsary</p>
              <Grid
                className={classes.InputStyle}
              >
                <Grid className={classes.InputBox}>
                  <Grid>
                    <TextField
                      style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                      id="filled-basic"
                      label="Entity Name*"
                      variant="filled"
                      disabled={disabled}
                      value={piData.entityName.value}
                      onChange={(e)=>handleChange('entityName',e.target.value)}
                    />
                  </Grid>
                  <Grid>
                    <TextField
                      style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                      id="filled-basic"
                      label="Address*"
                      variant="filled"
                      disabled={disabled}
                      value={piData.address.value}
                      onChange={(e)=>handleChange('address',e.target.value)}
                    />
                  </Grid>
                  <Grid>
                    <TextField
                      style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                      id="filled-basic"
                      label="Country*"
                      variant="filled"
                      disabled={disabled}
                      value={piData.country.value}
                      onChange={(e)=>handleChange('country',e.target.value)}
                    />
                  </Grid>
                  <Grid>
                    <TextField
                      style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                      id="filled-basic"
                      label="Village/Town/City*"
                      variant="filled"
                      disabled={disabled}
                      value={piData.city.value}
                      onChange={(e)=>handleChange('city',e.target.value)}
                    />
                  </Grid>
                </Grid>

                <Grid className={classes.InputBox}>
                  <Grid>
                    <FormControl
                      variant="filled"
                      style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                    >
                      <InputLabel id="demo-simple-select-filled-label">
                        Entity Type*
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        disabled={disabled}
                        value={piData.entityTypeID.value}
                        onChange={(e)=>handleChange('entityTypeID',e.target.value)}
                      >
                        {entity.map(item=>(
                            <MenuItem value={item.entityTypeID}>{item.entityTypeName}</MenuItem>
                          )
                        )}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid>
                    <TextField
                      style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                      id="filled-basic"
                      label="Pincode*"
                      variant="filled"
                      disabled={disabled}
                      value={piData.pinCode.value}
                      onChange={(e)=>handleChange('pinCode',e.target.value)}
                    />
                  </Grid>
                  <Grid>
                    <TextField
                      style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                      id="filled-basic"
                      label="State*"
                      variant="filled"
                      disabled={disabled}
                      value={piData.state.value}
                      onChange={(e)=>handleChange('state',e.target.value)}
                    />
                  </Grid>
                  <Grid>
                    <TextField
                      style={{ padding: "1% 1% 1% 1%", width: "70%" }}
                      id="filled-basic"
                      label="Aadhar Number*"
                      variant="filled"
                      disabled={disabled}
                      value={piData.aadharCardNo.value}
                      onChange={(e)=>handleChange('aadharCardNo',e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <p style = {{fontSize:12, textAlign: 'center',color:'red', margin:5}}>{error}</p>
              <Grid style={{ textAlign: "center", padding: "2% 0% 2% 0%" }}>
                {/* <SvgButton>Continue</SvgButton> */}
                <Button
                  style={{ borderRadius: "18px", justifyContent: "center",padding:10 }}
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={disabled}
                  onClick={submitHandler}
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