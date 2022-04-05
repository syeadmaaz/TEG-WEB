import React, { useState } from 'react'
import {TabContext, TabList, TabPanel} from '@mui/lab';
import {Box, Tab, Paper, Grid, Typography, AppBar} from '@mui/material';
import classes from "../Styles/TaskManager.module.css"
import Machine from './Machine';
import HR from './HR';
import KYC from './KYC';
import Upcoming from './Upcoming';
import Completed from './Completed';
import { styled } from '@mui/material/styles';




const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function TaskManager() {

  const [value, setValue] = useState('1')

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };


  return (
    <div>
      


    <Box sx={{ flexGrow: 1 }} style={{marginTop: "25px"}}>
      <Grid container spacing={2} >
        <div id="test1">
        <Grid item xs={9} >
        {/* <Box style={{backgroundColor: 'lightgray', marginLeft: '10px'}}>
              <Tab className="tb" label="Asset Management"  />
          </Box> */}
          <Item style={{backgroundColor: 'lightgray', marginLeft: '10px'}}>Asset Management</Item>
        </Grid>
        
        <Grid item xs={3}>
          <Item style={{backgroundColor: 'lightgray',  marginRight: '10px'}}>Upcoming</Item>
        </Grid>
        </div>
        <Grid item xs={3} onClick = {()=>setValue('1')} style={{marginLeft: "10px"}} >
          <Box className = {(value === '1')? (classes.active):(classes.deActive)}>
              <Tab className="tb" label="Machine" value="1"  />
          </Box>
        </Grid>
        <Grid item xs={3} onClick = {()=>setValue('2')}>
          <Box className = {(value === '2')? (classes.active):(classes.deActive)}>
              <Tab className="tb" label="Human Resources" value="1"  />
          </Box>
        </Grid>
        <Grid item xs={2.9} onClick = {()=>setValue('3')} >
          <Box className = {(value === '3')? (classes.active):(classes.deActive)}>
              <Tab className="tb" label="KYC" value="3"  />
          </Box>
        </Grid>


        <Grid item xs={3}>
          <Item style={{backgroundColor: 'lightgray',  marginRight: '7px', marginTop: '48%'}}>Completed</Item>
        </Grid>
        {/* <Grid item xs={2}>
        <Box
    sx={{
    width: 300,
    height: 150,
    paddingTop: '1px',
    backgroundColor: 'lightgray',
    borderWidth: '5px',
    borderColor: 'black',
    display: 'table'
  }}
/>
</Grid> */}


          {/* <Box
            sx={{
            width: 100,
            height: 100,
            paddingTop: '1px',
            backgroundColor: 'yellow',
            borderWidth: '5px',
            borderColor: 'black',
            display:'table-row',
          }}
          />

        </Grid> */}
        


        {/* <Grid container spacing={5} >
        <Grid item xs={12} >
      <Box
    sx={{
    width: 300,
    height: 300,
    backgroundColor: 'primary.dark',
    '&:hover': {
      backgroundColor: 'primary.main',
      opacity: [0.9, 0.8, 0.7],
    },
  }} 
/>
</Grid>
</Grid> */}

        <TabContext value={value}>
      
            <TabPanel value="1"><Machine /></TabPanel>
            <TabPanel value="2"><HR /></TabPanel>
            <TabPanel value="3"><KYC /></TabPanel>
        

        </TabContext>
        
      </Grid>
    </Box>


    

    </div>
  )
}

export default TaskManager