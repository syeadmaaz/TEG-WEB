import React, { useState, useEffect } from "react";
import classes from "./LoginPage.module.css";
import LoginPic from "../../assets/images/LoginPic.jpg";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";
import axios from "../../axios_tteg";
import CircularProgress from '@mui/material/CircularProgress';

const LoginPage = (props) => {
  let navigate = useNavigate();
  const [resourceID, setResourceID] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  let container = null;

  const moveToRegisterHandler = () => {
    navigate("/register");
  };

  const submitHandler = () => {
    console.log(axios)
    console.log("Sign-In Clicked");
    setLoading(true);
    console.log(resourceID);

    axios
      .post("/login", {
        resourceID: resourceID,
      })
      .then((response) => {
        setLoading(false);
        console.log(response);
        if (response.status === 201) {
          console.log("OTP Sent");
          props.getData(1);
          props.getUserData({
              resourceID: response.data.user.resourceID,
              resourceTypeID: response.data.user.resourceTypeID
          })
        } else {
          setError(response.data.error);
        }
      })
      .catch((e) => {
          console.log(e.response)
        setLoading(false);
        setError(e.response.data.error);
      });
  };

  return (container = (
    <div className={classes.stylePage}>
      {/* <div className={classes.left}>
                <img
                    className={classes.image}
                    src={LoginPic}
                ></img>
            </div> */}

      {/* <div className={classes.left}> */}
      <Paper
        elevation={24}
        style={{ borderRadius: "20px" }}
        className={classes.paperStyle}
      >
        <div className={classes.pic} style={{ width: "50%", height: "100%" }}>
          <img className={classes.image} src={LoginPic}></img>
        </div>

        <div className={classes.right} style={{ width: "35%", height: "100%" }}>
          <h1>Sign In</h1>

          <TextField
            className={classes.textSyle}
            style={{ marginTop: "2%" }}
            label="ResourceID"
            placeholder="Enter Your ResourceID"
            variant="outlined"
            // fullWidth
            onChange={(e) => setResourceID(e.target.value)}
          />

          {/* <TextField
                    className={classes.textSyle}
                    style={{marginTop:"5%"}}
                    label="Password"
                    placeholder="Enter Your Password"
                    variant="outlined"
                    // fullWidth
                    // onChange={(event) => textFieldHandler(event.target.value, 1)}
                /> */}
          <p style={{ marginLeft: "7%" }} align="left">
            <Checkbox />
            Remember Me
          </p>
          <p style={{color: "red"}}>{error}</p>
          <Button
            className={classes.Button}
            style={{ borderRadius: "18px" }}
            type="submit"
            color="primary"
            variant="contained"
            onClick={() => submitHandler()}
          >
            Sign In
            <LoginIcon style={{ marginLeft: "2%", borderRadius: "20px" }} />
          </Button>

          <Typography marginTop="2%">
            <Link
              style={{ fontSize: "13px", fontWeight: "bold", color: "#648ACD" }}
              // onClick={() => goToForgotPassword()}
            >
              Forgot Password ?
            </Link>
          </Typography>

          <hr style={{ marginTop: "6%", width: "70%" }} />

          <Button
            className={classes.Button}
            style={{
              marginTop: "5%",
              borderRadius: "18px",
              background: "green",
            }}
            type="submit"
            color="primary"
            variant="contained"
            onClick={() => moveToRegisterHandler()}
          >
            Create Account
          </Button>
        </div>
      </Paper>
      {/* </div> */}
    </div>
  ));
};

export default LoginPage;
