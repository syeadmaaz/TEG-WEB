import React, { useState, useEffect } from "react";
import classes from "./Tabs.module.css";
import Grid from "@mui/material/Grid";
import { Button, Paper, Link, Box } from "@mui/material";

function Tabs(props) {
  const [activeState, setActive] = useState(1);

  useEffect(() => {
    setActive(props.active);
  }, [props]);

  let container = null;

  const updateActive = (active) => {
    setActive(active);
    props.getData(active);
  };

  container = (
    <div>
      <Paper elevation={16} className={classes.sidebarContainer}>
        <Grid onClick={() => updateActive(1)}>
          <Box
            style={{maxWidth:'100%',wordWrap:'break-word'}}
            className={activeState === 1 ? classes.active : classes.deActive}
          >
            Personal Information
          </Box>
        </Grid>
        <Grid onClick={() => updateActive(2)} style={{maxWidth:'100%'}}>
          <Box
            style={{maxWidth:'100%'}}
            className={activeState === 2 ? classes.active : classes.deActive}
          >
            Bank Details
          </Box>
        </Grid>
        <Grid onClick={() => updateActive(3)}>
          <Box
            style={{maxWidth:'100%'}}
            className={activeState === 3 ? classes.active : classes.deActive}
          >
            Upload Documents
          </Box>
        </Grid>
        <Grid onClick={() => updateActive(4)}>
          <Box
            style={{maxWidth:'100%'}}
            className={activeState === 4 ? classes.active : classes.deActive}
          >
            Subscription Type
          </Box>
        </Grid>
      </Paper>
    </div>
  );

  return <div>{container}</div>;
}

export default Tabs;
