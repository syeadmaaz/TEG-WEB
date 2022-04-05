import React from 'react'
import { useState } from 'react'
import Planning from './Planning'
import TaskManager from './TaskManager'
import logo from '../Resources/final-lo1.png'
import {FormControl, InputLabel, Select, MenuItem, AppBar} from '@mui/material';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import '../Styles/Main.css'


function Main() {

    const [screen, setScreen] = useState("Task-Manager");
    const [role, setRole] = useState("Planner");
    const name = "Rahul";
    // console.log(screen);

    // const classes = useStyles();

    const handleChange = (event, newValue) => {
      console.log(newValue);
        // setScreen(newValue);
    };
  

  return (
    <div id='ma'>
        
    <div className='header'>
    
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{backgroundColor: 'white'}}>
        <Toolbar id='tool'>
          <IconButton
            size="large"
            edge="start"
            color="primary"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
              <img src={logo} alt="Logo" />

          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{color: 'black'}}>
            

            <FormControl style={{minWidth: '200px'}} className='menit' id='specific'>
              {/* <InputLabel>{screen}</InputLabel> */}
            
            <Select onChange={handleChange} value={screen}>

              {/* <MenuItem value="">Task Manager</MenuItem> */}
              <MenuItem value={"Task-Manager"} onClick={() => setScreen("Task-Manager")} >Task Manager</MenuItem>
              <MenuItem value={"Planning"} onClick={() => setScreen("Planning")}>Planning</MenuItem>
            </Select>

            </FormControl>
            
          </Typography>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{color: 'black'}} className='menit'>
            {role === "Planner" ? <text>Role - Planner</text> : <text>Role - Other</text>}
          </Typography>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{color: 'black'}} className='menit'>
            Hi {name} !
          </Typography>


          <IconButton
            size="large"
            edge="start"
            style={{color: 'black'}}
            aria-label="menu"
            sx={{ mr: 2 }}
          >

            <SettingsIcon className='menit'id='specific'/> 
            <MenuIcon id='menubtn'/>
          
          </IconButton>
          
        </Toolbar>
      </AppBar>
    </Box>




        </div>
        
        <div className='switch'>
            {screen === "Task-Manager" ? <TaskManager /> : <Planning />}
        </div>
        

        <div className='footer'>

          <Box sx={{ flexGrow: 1 }} >
            <AppBar position="static" style={{backgroundColor: "white", position: "fixed", bottom: 0, height: "10%", display: "table-row"}}>

              <Typography variant="body1" component="div" sx={{ flexGrow: 1 }} style={{color: 'black', float: "right", marginRight: "100px", paddingTop: "20px"}}>
                Copyright
              </Typography>
              <Typography variant="body1" component="div" sx={{ flexGrow: 1 }} style={{color: 'black', float: "right",  marginRight: "100px", paddingTop: "20px"}}>
                Disclaimer
              </Typography>
            </AppBar>
          </Box>

        </div>

    </div>
  )
}

export default Main