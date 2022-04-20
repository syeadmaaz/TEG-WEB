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
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png"

const OverView = (props)=>{
    let navigate = useNavigate();
    const [moveToSubscription,setMoveToSubscription] = useState(false);
    return(
        <div>
            <Box style={{ padding: '2%', width:'85%', margin:'auto' }}>
                <Paper elevation={24} style={{padding:25 }}>
                    <img src = {Logo} style = {{maxWidth:'100%'}}/>
                    <Grid>
                        <Grid style={{textAlign :'center', alignItems:'center'}}>
                            <h2 >Thanks for your interest in T-TEG platform</h2>
                            <hr style={{ width: "50%" }} />
                            <div style={{background:'aliceblue',padding:'3%',margin:'3%',borderRadius:5,textAlign:'justify'}}>
                                <p>"We briefly state the purpose of the platform so that you can take informed decision about enrolling.The platform creates a larger market for resources involved in deployment and operations of telecom, electricity and city gas field assets. Enrolling makes you a part of a growing market consisting of various stakeholders including the participants from utility companies, original equipment manufacturers, project managers, Field supervisors and other supporting staff. The platform supports the subscribers in terms of structured information sharing, arranging for technical support, digital enablement for skilled and unskilled resources."</p>
                                <p style = {{fontWeight:'bold'}}>Click next to explore</p>
                            </div>
                        </Grid>
                        <Grid style = {{padding: '0 5%',display: 'flex',justifyContent: 'space-between'}}>
                            <div>
                                <Button variant="text" onClick={()=>navigate('/')}>Back</Button>
                            </div>
                            <div>
                                <Button variant="contained" onClick = {()=>props.getData(2)}>Next</Button>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </div>
    )
}

export default OverView