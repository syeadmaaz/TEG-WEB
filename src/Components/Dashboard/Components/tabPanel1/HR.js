import React,{useState} from 'react'
import {Box, Tab, Paper, Grid, Typography, AppBar} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { borderColor } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import HumanResourceOnboard from '../HumanResourceOnboard/HumanResourceOnboard';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';

function HumanResouce(props) {

  const [goToOnboarding, setGoToOnboarding] = useState(false);
  let container5 = null;
  if(goToOnboarding){
    container5 = (
      <div>
        <div style={{textAlign:'left'}}>
          <DoDisturbOnOutlinedIcon style = {{fontSize:34, color:'teal'}} onClick = {()=>setGoToOnboarding(false)}/>
        </div>
        <HumanResourceOnboard resourceID={props.resourceID}/>
      </div>
    )
  }

  else{
    container5 = (
      <div style={{textAlign:'left'}}>
        <AddCircleOutlineSharpIcon style = {{fontSize:34, color:'teal'}} onClick = {()=>setGoToOnboarding(true)}/>
      </div>
    )
  }
  return (
    <div>
      {container5}
    </div>
  )
}

export default HumanResouce