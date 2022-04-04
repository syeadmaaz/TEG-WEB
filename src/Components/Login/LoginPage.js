import React, { useState, useEffect } from "react";
import classes from "./LoginPage.module.css";
import LoginPic from "../../assets/images/LoginPic.jpg";
import {Grid,Paper,TextField,Button,Typography,Link,} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

    let navigate = useNavigate();
    let container = null;

    const moveToRegisterHandler = ()=>{
        navigate('/register')
    }

    const submitHandler = () => {
        console.log("Sign-In Clicked")
    }

    return container = (
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
                    style={{ borderRadius:"20px"}}
                    className={classes.paperStyle}
                >
                <div className={classes.pic}
                    style={{width:"50%", height: "100%"}}>
                <img
                    className={classes.image}
                    src={LoginPic}
                ></img>
                </div>

                <div className={classes.right}
                    style={{width:"35%", height: "100%"}}
                >

                <h1>Sign In</h1>

                <TextField
                    className={classes.textSyle}
                    style={{marginTop:"2%"}}
                    label="ResourceID"
                    placeholder="Enter Your ResourceID"
                    variant="outlined"
                    // fullWidth
                    // onChange={(event) => textFieldHandler(event.target.value, 1)}
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
                <p style={{marginLeft:"7%"}} align="left">
                    <Checkbox />
                    Remember Me
                </p>
                <Button 
                    className={classes.Button}
                    style={{ borderRadius: "18px",}}
                    type="submit"
                    color="primary"
                    variant="contained"
                    onClick={() => submitHandler()}
                >
                    Sign In
                    <LoginIcon style={{marginLeft:"2%", borderRadius: "20px"}}/>
                </Button>

                <Typography marginTop="2%">
                  <Link
                    style={{fontSize:"13px", fontWeight:"bold", color:"#648ACD"}}
                    // onClick={() => goToForgotPassword()}
                  >
                    Forgot Password ?
                  </Link>
                </Typography>

                <hr style={{marginTop:"6%", width:"70%"}}/>

                <Button
                    className={classes.Button}
                    style={{ marginTop:"5%", borderRadius: "18px", background:"green"}}
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
    )

};

export default LoginPage;
