import React, { useState, useEffect } from "react";
import classes from "./SidePanel.module.css";
import { Box, Tab, Paper, Grid } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Personal from "../Register/Personal/Personal";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Logo from "../../assets/images/logo.png"

function SidePanel(props) {
  const [activeState, setActive] = useState(null);

  useEffect(() => {
    setActive(props.active);
  }, [props]);

  const handleChange = (event, newValue) => {
    setActive(newValue);
  };

  const updateActive = (active) => {
    setActive(active);
    props.getData(active);
  };

  return (
    <div className={classes.page}>
      <Paper
        elevation={24}
        className={classes.sidebarContainer}
      >
        <img src = {Logo} style={{maxWidth:'100%'}}/>
        <TabContext value={activeState}>
          <TabList
            orientation="vertical"
            onChange={handleChange}
            aria-label="side-panel-choice"
            id="tablist"
          >
            <div className={classes.tabs}>
              <Grid onClick={() => updateActive(1)}>
                <Box
                  className={
                    activeState === 1 ? classes.active : classes.deActive
                  }
                >
                  
                  <Tab className="tb" label="Personal Information" value="1" />
                  {(props.completed.length > 0 && props.completed.find(element => element === 1) === 1)?(<CheckCircleOutlineIcon style={{color:'green',padding:5}}/>):null}
                </Box>
              </Grid>

              <Grid onClick={() => updateActive(2)}>
                <Box
                  className={
                    activeState === 2 ? classes.active : classes.deActive
                  }
                >
                  <Tab className="tb" label="Bank Details" value="2" />
                  {(props.completed.length > 0 && props.completed.find(element => element === 2) === 2)?(<CheckCircleOutlineIcon style={{color:'green',padding:5}}/>):null}
                </Box>
              </Grid>

              {props.resourceTypeID === 'I' ? (
                <Grid onClick={() => updateActive(5)}>
                  <Box
                    className={
                      activeState === 5 ? classes.active : classes.deActive
                    }
                  >
                    <Tab className="tb" label="Association" value="5" />
                    {(props.completed.length > 0 && props.completed.find(element => element === 5) === 5)?(<CheckCircleOutlineIcon style={{color:'green',padding:5}}/>):null}
                  </Box>
                </Grid>
              ):null}

              <Grid onClick={() => updateActive(3)}>
                <Box
                  className={
                    activeState === 3 ? classes.active : classes.deActive
                  }
                >
                  <Tab className="tb" label="Upload Documents" value="3" />
                  {(props.completed.length > 0 && props.completed.find(element => element === 3) === 3)?(<CheckCircleOutlineIcon style={{color:'green',padding:5}}/>):null}
                </Box>
              </Grid>

              {/* <Grid onClick={() => updateActive(4)}>
                <Box
                  className={
                    activeState === 4 ? classes.active : classes.deActive
                  }
                >
                  <Tab className="tb" label="Subscription Type" value="4" />
                  {(props.completed.length > 0 && props.completed.find(element => element === 4) === 4)?(<CheckCircleOutlineIcon style={{color:'green',padding:5}}/>):null}
                </Box>
              </Grid> */}
            </div>
          </TabList>
          {/* <TabPanel value="1"><Personal/></TabPanel>
          <TabPanel value="2">
            <Bank />
          </TabPanel>
          <TabPanel value="3">
            <Upload />
          </TabPanel>
          <TabPanel value="4">
            <Subscription />
          </TabPanel> */}
        </TabContext>
      </Paper>
    </div>
  );
}

export default SidePanel;
