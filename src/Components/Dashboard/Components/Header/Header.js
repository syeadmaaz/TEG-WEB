import React,{useState} from "react";
import logo from "../../Resources/final-lo1.png";
import {FormControl, InputLabel, Select, MenuItem, AppBar} from '@mui/material';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import classes from "./Header.module.css";

const Header = ()=>{
    const [screen, setScreen] = useState("Task-Manager");
    const [role, setRole] = useState("Planner");
    const name = "Rahul";
    // console.log(screen);

    // const classes = useStyles();

    const handleChange = (event, newValue) => {
      console.log(newValue);
        // setScreen(newValue);
    };
    let container = null;
    container = (
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
                            <img src={logo} alt="Logo" className={classes.Logo}/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{color: 'black'}}>
                            <FormControl id='specific'> 
                                <Select onChange={handleChange} value={screen} size="small">
                                    <MenuItem value={"Task-Manager"} onClick={() => setScreen("Task-Manager")} >Task Manager</MenuItem>
                                    <MenuItem value={"Planning"} onClick={() => setScreen("Planning")}>Planning</MenuItem>
                                </Select>
                            </FormControl>                            
                        </Typography>

                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{color: 'black',fontSize:'14px'}} className='menit'>
                            {role === "Planner" ? <text>Role - Planner</text> : <text>Role - Other</text>}
                        </Typography>

                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{color: 'black',fontSize:'14px'}} className='menit'>
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
    )
    return(
        <div>
            {container}
        </div>
    )
}

export default Header