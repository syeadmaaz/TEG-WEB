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

function Machine(props) {
  const [goToOnboarding, setGoToOnboarding] = useState(false);

  const [loading,setLoading] = useState(false)

  const [machineDetails,setMachineDetails] = useState(null)

  useEffect(() => {
    setLoading(true);
    axios
      .get("/getMachineDetails", {
        params: { resourceID: props.resourceID }
      })
      .then((response) => {
        console.log(response.data);
        setLoading(false);
        setMachineDetails(response.data.machineDetails);
      })
      .catch((e) => console.log(e.response.data.error));
  }, []);

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
        <MachineOnBoard resourceID={props.resourceID} />
      </div>
    );
  } else {
    container5 = (
      <div style={{ textAlign: "left" }}>
        <img src="jcb1.png" width="250px" height="250px"></img>
        {/* <img src="jcb1.png" width="250px" height="250px"></img>
        <img src="jcb1.png" width="250px" height="250px"></img>
        <img src="jcb1.png" width="250px" height="250px"></img> */}
        {/* {
          machineDetails.map((machine)=> {
            // <p>{machine.OEM}</p>
          })
        } */}
        <AddCircleOutlineSharpIcon
          style={{ fontSize: 34, color: "teal" }}
          onClick={() => setGoToOnboarding(true)}
        />
      </div>
    );
  }
  return <div>{container5}</div>;
}

export default Machine