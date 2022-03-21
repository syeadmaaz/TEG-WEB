import React,{ useState } from "react";
import OverView from "./OverView";
import SubType from "./SubType";
import PreRegistrationPage from "./PreRegistration";
import LegalInfoFree from "./LegalInfoFree";

const PreRegistrationContainer = ()=>{
    const [pageNumber,setPageNumber] = useState(1);
    const [subscriberCategoryID,setSubscriberCategoryID] = useState(null);

    const getDataFromPage = (data)=>{
        console.log(data);
        setPageNumber(data.pageNo);
        setSubscriberCategoryID(data.subscriberCategoryID);
    }
    let container = null;
    if(pageNumber === 1){
        container = (<OverView getData = {(pageNo)=>setPageNumber(pageNo)}/>)
    }
    else if(pageNumber === 2){
        container = (<SubType getData = {(data)=>getDataFromPage(data)}/>)
    }
    else if(pageNumber === 3){
        container = (<LegalInfoFree getData = {(pageNo)=>setPageNumber(pageNo)}/>)
    }
    else if(pageNumber === 4){
        container = (<PreRegistrationPage subscriberCategoryID = {subscriberCategoryID} getData = {(pageNo)=>setPageNumber(pageNo)}/>)
    }
    return(
        <div>
            {container}
        </div>
    )
}

export default PreRegistrationContainer