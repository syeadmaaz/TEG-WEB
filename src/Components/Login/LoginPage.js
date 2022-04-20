import React, { useState, useEffect } from "react";
import classes from "./LoginPage.module.css";
import LoginPic from "../../assets/images/LoginPic.jpg";
import Logo from "../../assets/images/logo.png";
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

  if(loading){
    container = (
      <div style = {{marginTop:'25%'}}>
        <CircularProgress/>
      </div>
      
    )
  }
  else{
    container = (
      <div >
      {/* <div className={classes.left}>
                <img
                    className={classes.image}
                    src={LoginPic}
                ></img>
            </div> */}

      {/* <div className={classes.left}> */}
      <Paper
        elevation={24}
        style={{ margin:'4% 5%'}}
        // className={classes.paperStyle}
      >
        {/* Row 1 */}
        <div>
          <img  src = {Logo} style= {{padding:'10px 0', maxWidth:'100%', minWidth:195}}/>
        </div>
        
        {/* <h3>Login</h3> */}
        {/* Row 2 */}
        <div className={classes.stylePage}>
          {/* colimn 1 */}
          <div className = {classes.imgContainer}>
            {/* <img className = {classes.image} src = {Logo}/> */}
            <img className = {classes.image} src = {LoginPic}/>
          </div>
          <hr></hr>
          {/* Column 2 */}
          <div className = {classes.imgContainer}>
            <TextField 
              style = {{maxWidth:'100%', minWidth:255}}
              label="ResourceID"
              placeholder="Enter Your ResourceID"
              variant="outlined"
              // fullWidth
              onChange={(e) => setResourceID(e.target.value)}
            />
            <p>
              <Checkbox />
              Remember Me
            </p>
            <p style={{color: "red", margin:5}}>{error}</p>
            <Button
              style = {{width:225, backgroundColor:'green', margin:10}}
              type="submit"
              color="primary"
              variant="contained"
              onClick={() => submitHandler()}
            >
              Sign In
              <LoginIcon  />
            </Button>

            <Typography >
              <Link
                style={{cursor:"pointer"}}
                // onClick={() => goToForgotPassword()}
              >
                Forgot Password ?
              </Link>
            </Typography>

            <hr style={{borderTop:'2px dotted gray', margin:'10px 20px'}}  />

            <Button
              style = {{maxWidth:'100%', minWidth:255, margin:10}}
              type="submit"
              color="primary"
              variant="contained"
              onClick={() => moveToRegisterHandler()}
            >
              Create Account
            </Button>
          </div>
        </div>

        
      </Paper>
      {/* </div> */}
    </div>
    )
  }

  return (
    <div>
      {container}
    </div>
  );
};

export default LoginPage;
