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
    Checkbox
} from "@mui/material";

const LegalInfoFree = (props)=>{
    const [agreeCheckBox,setAgreeCheckBox] = useState(false);
    const [error,setError] = useState(null)
    const submitHandler = ()=>{
        if(agreeCheckBox)
            props.getData(4)
        else
            setError('* Please accept the terms and conditions')
    }
    return(
        <div>
            <Box style={{ padding: '2%', width:'85%', margin:'auto' }}>
                <Paper elevation={24} style={{padding:20 }}>
                    <Grid>
                        <Grid style={{textAlign :'center', alignItems:'center', padding:20}}>
                            <h2 >Legal Information</h2>
                            <hr style={{ width: "50%" }} />
                            <div style={{background:'aliceblue',padding:'2%',margin:20,borderRadius:5,textAlign:'justify'}}>
                                <p>The free subscription is intended for skilled &unskilled resources, the platform provides technical support and also employment opportunities to free lancers. Machine owners are also onboarded without any charges. You can chose to enroll for one or more of the 3 current domains - Telecom, Electricity & City Gas. In free subscription, we capture your basic information, usually required while joining any new assignment. Please take time out to provide the required details accurately. The system allows the user to change the data related to their skills and expereince. The platform also supports the users with required information to enrol on various government initiatives e.g. E-Shram etc. The free subsciption includes sharing of information about recruitment opportunities. </p>
                                <h3 >Terms & Conditions</h3>
                                <p>T-TEG does not intend to sell your data. The data provided is used to integrate the subscriber to the market through suitable aggregation. By clicking below, you are allowing T-TEG to capture the required data in Electronic form and use it for integration into the market. </p>
                                
                            </div>
                            <Grid >
                                <FormGroup style={{padding:'0 2%',textAlign: 'left'}}>
                                <FormControlLabel control={<Checkbox checked = {agreeCheckBox} onChange={(e)=>setAgreeCheckBox(e.target.checked)} />} label="I confirm that I have gone through the information provided regarding free subscription. I have no objection to platform capturing the data I am providing and using it as a part of platform processes." />
                                </FormGroup>
                            </Grid>
                        </Grid>
                        <p style = {{fontSize:12, textAlign: 'center',color:'red', margin:5}}>{error}</p>
                        <Grid style = {{padding: '0 5%',display: 'flex',justifyContent: 'space-between'}}>
                            <div>
                                <Button variant="text" onClick = {()=>props.getData(2)}>Back</Button>
                            </div>
                            <div>
                                <Button variant="contained" onClick = {submitHandler}>Next</Button>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </div>
    )
}

export default LegalInfoFree