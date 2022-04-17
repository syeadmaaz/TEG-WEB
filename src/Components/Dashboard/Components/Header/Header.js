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
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Header = (props)=>{
    const [screen, setScreen] = useState(0);
    const [role, setRole] = useState("Planner");
    const name = "Rahul";
    console.log(screen);

    // const classes = useStyles();

    const handleChange = (event, newValue) => {
      console.log(newValue);
      props.getData(event.target.value);
        setScreen(event.target.value);
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
                                    <MenuItem value={0} onClick={() => setScreen(0)} >Task Manager</MenuItem>
                                    <MenuItem value={1} onClick={() => setScreen(1)}>Planning</MenuItem>
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
                            <SettingsIcon className='menit'id='specific' onClick = {()=>{
                                    cookies.remove('userData', {path:"/"})
                                    window.reload();
                                }}/> 
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