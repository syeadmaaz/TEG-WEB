import React, { useState } from 'react'
import {TabContext, TabList, TabPanel} from '@mui/lab';
import {Box, Tab, Paper, Grid, Typography, AppBar} from '@mui/material';
import classes from "./OnboardManager.module.css"
import Machine from '../tabPanel1/Machine';
import HR from '../tabPanel1/HR';
import KYC from '../tabPanel1/KYC';
import Upcoming from '../Upcoming';
import Completed from '../Completed';
import { styled } from '@mui/material/styles';
import { width } from '@mui/system';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const OnboardManager = (props) =>{

  const [value, setValue] = useState('1')

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };


  return (
    <div>
      <div className={classes.TopHeader}>
        <p style={{margin:0}}>Assets Management</p>
      </div>
      <div>
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <div onClick = {()=>setValue('1')} style= {{width:"30%"}}>
            <Box className = {(value === '1')? (classes.active):(classes.deActive)}>
              <Tab className="tb" label="Machine" value="1"  style={{fontSize:'small'}}/>
            </Box>
          </div>
          <div onClick = {()=>setValue('2')} style= {{width:"30%"}}>
            <Box className = {(value === '2')? (classes.active):(classes.deActive)}>
                <Tab className="tb" label="Human Resources" value="1" style={{fontSize:'small'}} />
            </Box>
          </div>
          <div onClick = {()=>setValue('3')} style= {{width:"30%"}}>
            <Box className = {(value === '3')? (classes.active):(classes.deActive)}>
                <Tab className="tb" label="KYC" value="3" style={{fontSize:'small'}} />
            </Box>
          </div>
        </div>
        <div style={{background:'white',height:'65vh',overflow:'auto',boxShadow:'0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)'}}>
          <TabContext value={value}>
            
            <TabPanel value="1"><Machine resourceID={props.resourceID}/></TabPanel>
            <TabPanel value="2"><HR resourceID={props.resourceID}/></TabPanel>
            <TabPanel value="3"><KYC /></TabPanel>
        
          </TabContext>
        </div>
{/*           
          <TabContext value={value}>
          
                <TabPanel value="1"><Machine /></TabPanel>
                <TabPanel value="2"><HR /></TabPanel>
                <TabPanel value="3"><KYC /></TabPanel>
            

            </TabContext> */}
        {/* <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} >
            <Grid item xs={3.9} onClick = {()=>setValue('1')} style={{marginLeft: "10px"}} >
              <Box className = {(value === '1')? (classes.active):(classes.deActive)}>
                  <Tab className="tb" label="Machine" value="1"  />
              </Box>
            </Grid>
            <Grid item xs={3.9} onClick = {()=>setValue('2')}>
              <Box className = {(value === '2')? (classes.active):(classes.deActive)}>
                  <Tab className="tb" label="Human Resources" value="1"  />
              </Box>
            </Grid>
            <Grid item xs={3.9} onClick = {()=>setValue('3')} >
              <Box className = {(value === '3')? (classes.active):(classes.deActive)}>
                  <Tab className="tb" label="KYC" value="3"  />
              </Box>
            </Grid>
            {/* <Grid item xs={3}>
              <Item style={{backgroundColor: 'lightgray', marginRight: '7px', marginTop: '48%'}}>Completed</Item>
            </Grid> */}

            {/* <TabContext value={value}>
          
                <TabPanel value="1"><Machine /></TabPanel>
                <TabPanel value="2"><HR /></TabPanel>
                <TabPanel value="3"><KYC /></TabPanel>
            

            </TabContext>
            
          </Grid>
        </Box> */} 
      </div>

    


    

    </div>
  )
}

export default OnboardManager;