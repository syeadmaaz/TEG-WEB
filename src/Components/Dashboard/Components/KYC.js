import React from 'react'
import {Box, Tab, Paper, Grid, Typography, AppBar} from '@mui/material';

function KYC() {
  return (
    <div>  
      <Grid container spacing={5} >
    <Grid item xs={7} >
  <Box
    sx={{
    width: 1015,
    height: 350,
    paddingTop: '1px',
    backgroundColor: 'white',
    borderWidth: '5px',
    borderColor: 'black',
  }}
    style={{marginTop: '-160px'}}
  >

    <text>This is KYC</text>

      </Box>
    </Grid>
  </Grid>
  </div>
  )
}

export default KYC