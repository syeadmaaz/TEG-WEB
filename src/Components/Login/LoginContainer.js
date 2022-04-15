import React,{useState} from 'react'
import LoginPage from './LoginPage';
import OTPPage from "../PreRegistration/OTPPage"
import OverView from '../PreRegistration/OverView';
import Main from "../Dashboard/Components/Main.js";
import DashboardContainer from '../Dashboard/Components/DashboardContainer';

export default function LoginContainer() {
    const [page, setPage] = useState(0);
    const [user,setUser] = useState({
        resourceID: null,
        resourceTypeID: null
    })

    const handleUser = (data) => {
        setUser({
            resourceID: data.resourceID,
            resourceTypeID: data.resourceTypeID
        })
    }
    let container = null

    if(page===0) {
        container = <LoginPage getData={(page) => setPage(page)} getUserData={(data) => handleUser(data)}/>;
    }
    else if(page===1) {
        console.log(user)
        container = (
          <OTPPage
            getData={(page) => setPage(page)}
            resourceID={user.resourceID}
            resourceTypeID={user.resourceTypeID}
          />
        );
    }
    else if(page===2) {
        container = (
           <DashboardContainer/>
        );
    }

  return <div>{container}</div>;
}
