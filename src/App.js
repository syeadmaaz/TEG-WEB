import './App.css';
import LoginPage from './Components/Login/LoginPage';
import Tabs from './Components/Tabs/Tabs';
import SidePanel from './Components/Tabs/SidePanel'
import Personal from './Components/Register/Personal/Personal'
import BankDetails from './Components/Register/BankDetails/BankDetails';
import Registration from './Components/Register/Registration';
import CompanyAssociation from './Components/Register/Association/CompanyAssociation';
import UploadDoc from "./Components/Register/Upload/UploadDoc";
import OverView from './Components/PreRegistration/OverView';
import SubType from './Components/Register/subType/SubType';
import PreRegistration from './Components/PreRegistration/PreRegistration';
import LegalInfoFree from './Components/PreRegistration/LegalInfoFree';
// import UploadTest from './Components/Register/Upload/UploadTest';
import UploadDoc1 from "./Components/Register/Upload/UploadDoc1";
import LoginContainer from "./Components/Login/LoginContainer"

function App() {
  return (
    <div className="App">
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
      <LoginContainer/>
    </div>
  );
}

export default App;
