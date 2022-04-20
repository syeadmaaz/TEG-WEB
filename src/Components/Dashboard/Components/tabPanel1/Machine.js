import React,{useState,useEffect} from 'react'
import {Box, Tab, Paper, Grid, Typography, AppBar} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { borderColor } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import MachineOnBoard from '../MachineOnboard/MachineOnboard';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import axios from "../../../../axios_tteg";
import Cookies from 'universal-cookie';
import machineIcon from "../../../../assets/images/machineIcon.png"


const cookies = new Cookies()
function Machine(props) {
  const [goToOnboarding, setGoToOnboarding] = useState(false);

  const [loading,setLoading] = useState(false)

  const [machineDetails,setMachineDetails] = useState(null)

  useEffect(() => {
    setLoading(true);
    axios
      .get("/getMachineDetails", {
        params: { resourceID: cookies.get('userData').resourceID }
      })
      .then((response) => {
        console.log(response.data);
        setLoading(false);
        setMachineDetails(response.data.array);
      })
      .catch((e) => console.log(e.response.data.error));
  }, []);

  const getDataFromOnboard = (data)=>{
    setGoToOnboarding(false);
  }

  useEffect(() => {
    setLoading(true);
    axios
      .get("/getMachineDetails", {
        params: { resourceID: cookies.get('userData').resourceID }
      })
      .then((response) => {
        console.log(response.data);
        setLoading(false);
        setMachineDetails(response.data.array);
      })
      .catch((e) => console.log(e.response.data.error));
  }, [goToOnboarding]);


  let container5 = null;
  if (goToOnboarding) {
    container5 = (
      <div>
        <div style={{ textAlign: "left" }}>
          <DoDisturbOnOutlinedIcon
            style={{ fontSize: 34, color: "teal" }}
            onClick={() => setGoToOnboarding(false)}
          />
        </div>
        <MachineOnBoard resourceID={props.resourceID} getData = {(data)=>getDataFromOnboard(data)}/>
      </div>
    );
  } 
  else{
    if(machineDetails && machineDetails.length > 0){
      container5 = (
        <div style={{ textAlign: "left",display:'grid',grid: '150px / auto auto auto auto auto' }}>
          {/* <img src="jcb1.png" width="250px" height="250px"></img> */}
          
          {/* <img src="jcb1.png" width="250px" height="250px"></img>
          <img src="jcb1.png" width="250px" height="250px"></img>
          <img src="jcb1.png" width="250px" height="250px"></img> */}
          {
            machineDetails.map((machine)=> {
              return(
                <div>
                  <img src={machineIcon} width="80px" height='80'></img>
                  <p>OEM - {machine.machineDetails.OEM}</p>
                </div>
              )
              
            })
          }
          <AddCircleOutlineSharpIcon
            style={{ fontSize: 34, color: "teal" }}
            onClick={() => setGoToOnboarding(true)}
          />
        </div>
      );
    }
    else{
      container5 = (
        <AddCircleOutlineSharpIcon
            style={{ fontSize: 34, color: "teal" }}
            onClick={() => setGoToOnboarding(true)}
          />
      )
    }
  }
  
  return <div>{container5}</div>;
}

export default Machine