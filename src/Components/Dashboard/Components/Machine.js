import React from 'react'
import {Box, Tab, Paper, Grid, Typography, AppBar} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { borderColor } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import '../Styles/Main.css'

function Machine() {
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

        id='container'
      >

        <IconButton
            size="large"
            edge="start"
            color="primary"
            aria-label="menu"
            sx={{ mr: 2 }}
            style={{width: '25px'}}
          >

              <AddCircleOutlineSharpIcon />

          </IconButton>
          </Box>
        </Grid>
      </Grid>

    </div>
  )
}

export default Machine