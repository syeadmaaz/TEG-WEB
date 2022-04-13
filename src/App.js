import "./App.css";
import React, { useState, useEffect } from "react";
import { Grid, Paper, Box, CircularProgress } from "@mui/material";
import LoginPage from "./Components/Login/LoginPage";
import Tabs from "./Components/Tabs/Tabs";
import SidePanel from "./Components/Tabs/SidePanel";
import Personal from "./Components/Register/Personal/Personal";
import BankDetails from "./Components/Register/BankDetails/BankDetails";
import Registration from "./Components/Register/Registration";
import CompanyAssociation from "./Components/Register/Association/CompanyAssociation";
import UploadDoc from "./Components/Register/Upload/UploadDoc";
import OverView from "./Components/PreRegistration/OverView";
import SubType from "./Components/Register/subType/SubType";
import PreRegistration from "./Components/PreRegistration/PreRegistration";
import LegalInfoFree from "./Components/PreRegistration/LegalInfoFree";
import UploadDoc1 from "./Components/Register/Upload/UploadDoc1";
import LoginContainer from "./Components/Login/LoginContainer";
import Main from "./Components/Dashboard/Components/Main.js";
import Cookies from "universal-cookie";
import DashboardContainer from "./Components/Dashboard/Components/DashboardContainer";

const cookies = new Cookies();

function App() {
  const [goToDashboard, setGoToDashboard] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    console.log(cookies.get("userData"));
    if (cookies.get("userData")) {
      setLoading(false);
      setGoToDashboard(true);
    } else {
      setLoading(false);
      setGoToDashboard(false);
    }
  });

  let Landing = null;
  if (loading) {
    Landing = (
      <Paper>
        <Box>
          <Grid style={{ textAlign: "center" }}>
            <CircularProgress />
          </Grid>
        </Box>
      </Paper>
    );
  } else {
    Landing = <div>{goToDashboard ? <DashboardContainer resourceID={cookies.get("userData").resourceID}/> : <LoginContainer />}</div>;
  }

  return (
    <div className="App">
      {Landing}

      {/* <LoginContainer/> */}
      {/* <LoginPage/>   */}
      {/* <Tabs/> */}
      {/* <SidePanel/> */}
      {/* <Personal/> */}
      {/* <BankDetails/> */}
      {/* <LoginPage/> */}
      {/* <UploadDoc/> */}
      {/* <UploadDoc1/> */}
      {/* <CompanyAssociation/> */}
      {/* <OverView/> */}
      {/* <SubType/> */}
      {/* <PreRegistration/> */}
      {/* <LegalInfoFree/> */}
      {/* <Registration/> */}
      {/* <Main/> */}
    </div>
  );
}

export default App;
