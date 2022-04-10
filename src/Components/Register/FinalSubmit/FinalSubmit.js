import React, { useState } from "react";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Select,
  Typography,
  Link,
  Box,
  MenuItem,
  InputLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  CircularProgress,
  Checkbox,
} from "@mui/material";
import axios from "../../../axios_tteg";
import { WindowSharp } from "@mui/icons-material";
import Main from "../../../Components/Dashboard/Components/Main.js";


export default function FinalSubmit(props) {
  const [agreeCheckBox, setAgreeCheckBox] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error,setError] = useState(null)
  const [goToDashboard, setGoToDashboard] = useState(false);

  const submitHandler = () => {
    setLoading(true);
    axios
      .post("/submit", {
        resourceID: props.resourceID,
        resourceTypeID: props.resourceTypeID,
      })
      .then((response) => {
        setLoading(false);
        console.log(response);
        if (response.status === 200) {
          alert(response.data.message);
          // setGoToDashboard(true);
        } else {
          setError(response.data.error);
        }
      })
      .catch((e) => {
        setLoading(false);
        setError(e.response.data.error);
      });
  }

  let container1 = (
    <div>
      <Box style={{ padding: "2%", width: "85%", margin: "auto" }}>
        <Paper elevation={24} style={{ height: 620 }}>
          <Grid>
            <FormGroup style={{ padding: "2% 2%", textAlign: "left" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={agreeCheckBox}
                    onChange={(e) => setAgreeCheckBox(e.target.checked)}
                  />
                }
                label="I confirm that I have gone through the information provided. I have no objection to platform capturing the data I am providing and using it as a part of platform processes."
              />
            </FormGroup>
          </Grid>
          <p
            style={{
              fontSize: 12,
              textAlign: "center",
              color: "red",
              margin: 5,
            }}
          >
            {error}
          </p>
          <Grid
            style={{
              padding: "0 5%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div>
              <Button
                variant="contained"
                disabled={!agreeCheckBox}
                onClick={submitHandler}
              >
                Submit
              </Button>
            </div>
          </Grid>
        </Paper>
      </Box>
    </div>
  );

  return <div>{goToDashboard ? <Main /> : container1}</div>;
}
