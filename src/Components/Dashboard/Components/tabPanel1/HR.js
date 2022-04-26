import React,{useState, useEffect} from 'react'
import {Box, Tab, Paper, Grid, Typography, AppBar} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { borderColor } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import HumanResourceOnboard from '../HumanResourceOnboard/HumanResourceOnboard';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import axios from "../../../../axios_tteg";
import Cookies from "universal-cookie";
import PersonIcon from '@mui/icons-material/Person';
import classes from "./tabPanel1.module.css";
import ParticularHumanResource from '../HumanResourceOnboard/ParticularHumanResource';

const cookies = new Cookies();

function HumanResouce(props) {

  const [goToOnboarding, setGoToOnboarding] = useState(false);
  const [loading,setLoading] = useState(false);
  const [HRDetails,setHRDetails] = useState(null);
  const [particularHRDetails,setParticularHRDetails] = useState(null);
  const [goToParticular,setGoToParticular] = useState(false);

  useEffect(() => {
    getHR()
  }, []);

  useEffect(()=>{
    getHR();
  },[goToOnboarding])

  const getHR = ()=>{
    setLoading(true);
    axios
      .get("/getResourceHumanResource", {
        params: { resourceID: cookies.get('userData').resourceID }
      })
      .then((response) => {
        console.log(response.data);
        setLoading(false);
        setHRDetails(response.data.humanResource);
      })
      .catch((e) => console.log(e.response.data.error));
  }

  const goToDetails = (index)=>{
    setParticularHRDetails(HRDetails[index])
    setGoToParticular(true);
  }

  console.log(particularHRDetails);

  let container5 = null;
  if(goToOnboarding){
    container5 = (
      <div>
        <div style={{textAlign:'left'}}>
          <DoDisturbOnOutlinedIcon style = {{fontSize:34, color:'teal'}} onClick = {()=>setGoToOnboarding(false)}/>
        </div>
        <HumanResourceOnboard resourceID={props.resourceID} getData = {()=>setGoToOnboarding(false)}/>
      </div>
    )
  }
  else if(goToParticular){
    container5 = (
      <div>
        <div style={{textAlign:'left'}}>
          <DoDisturbOnOutlinedIcon style = {{fontSize:34, color:'teal'}} onClick = {()=>setGoToParticular(false)}/>
        </div>
        <ParticularHumanResource  getData = {()=>setGoToParticular(false)} particularHRDetails = {particularHRDetails}/>
      </div>
    )
  }

  else{
    if(HRDetails && HRDetails.length > 0){
      container5 = (
        <div className={classes.AssetsDisplay}>
          {/* <img src="jcb1.png" width="250px" height="250px"></img> */}
          
          {/* <img src="jcb1.png" width="250px" height="250px"></img>
          <img src="jcb1.png" width="250px" height="250px"></img>
          <img src="jcb1.png" width="250px" height="250px"></img> */}
          {
            HRDetails.map((hr, index)=> {
              return(
                <div onClick={()=>goToDetails(index)} style={{boxShadow:'0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)', padding:10,height:'max-content'}}>
                  <PersonIcon style = {{fontSize:90,color:'#3d0000'}}/>
                  {/* <img src={hrIcon} width="80px" height='80'></img> */}
                  <p style={{margin:0,fontSize:'small'}}>{hr.humanResourceInfo.name}</p>
                  <p style={{margin:0,fontSize:'small'}}>Skill - {hr.humanResourceInfo.skills}</p>
                </div>
              )
              
            })
          }
          <AddCircleOutlineSharpIcon
            style={{ fontSize: 34, color: "teal", margin:33 }}
            onClick={() => setGoToOnboarding(true)}
          />
        </div>
      );
    }
    else{
      container5 = (
        <div style={{textAlign:'left'}}>
          <AddCircleOutlineSharpIcon style = {{fontSize:34, color:'teal'}} onClick = {()=>setGoToOnboarding(true)}/>
        </div>
      )
    }
    
    
  }
  return (
    <div>
      {container5}
    </div>
  )
}

export default HumanResouce