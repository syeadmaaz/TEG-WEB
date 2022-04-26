import React,{ useState } from "react"
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

import Register from "../Register/Registration"; 
import Registration_Accordian from "../Register/Registration_Accordian";
import OTPPage from "./OTPPage";
import Logo from "../../assets/images/logo.png";

const PreRegCompleted = (props)=>{
    const [moveToRegistration,setMoveToRegistration] = useState(false);
    const [screen,setScreen] = useState(props.screen)
    console.log(screen);
    let container = null;
    if(moveToRegistration){
        container = (<Registration_Accordian  resourceID = {props.resourceID} resourceTypeID= {props.resourceTypeID}/>)
    }
    else if(screen === 1){
        container = (<OTPPage resourceID = {props.resourceID} resourceTypeID= {props.resourceTypeID} getData = {(screen)=>setScreen(screen)} />)
    }
    else if(screen === 2){
        container = (
            <div>
                <Box style={{ padding: '2%', width:'85%', margin:'auto' }}>
                    
                    <Paper elevation={24} style={{minHeight:600, padding:10 }}>
                    <img src = {Logo} style = {{maxWidth:'100%'}}/>
                        <Grid className={classes.style}>
                            <Grid style={{textAlign :'center', alignItems:'center', padding:'10%'}}>
                                <h2 style={{background:'aliceblue',padding:'8%',borderRadius:20}}>{props.message}</h2>
                            </Grid>
                            <Grid style = {{padding: '0 5%',display: 'flex',justifyContent: 'space-between'}}>
                                <div>
                                    <Button variant="text">Remind me later</Button>
                                </div>
                                <div>
                                    <Button variant="contained" 
                                    onClick = {()=>{
                                        setMoveToRegistration(true)
                                        setScreen(null)
                                    }}>Next</Button>
                                </div>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            </div>
        )
    }
    return (
        <div>
            {container}
        </div>
    )
}

export default PreRegCompleted