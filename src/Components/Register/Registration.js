import { ClassNames } from "@emotion/react";
import React, { useState } from "react";
import SidePanel from "../Tabs/SidePanel";
import Screen from "./Screen";


export default function Registration(props) {
  console.log(props);
  const [menu, setMenu] = useState(1);
  const [completed,setCompleted] = useState([])

  const changeTab = (menu) => {
    setMenu(menu);
  };

  const getDataFromScreen = (data)=>{
    let tempCompleted = [... completed]
    tempCompleted.push(menu)
    setCompleted(tempCompleted);
    setMenu(data.moveToScreen)
  }

  return (
    <>
      <div style={{ display: "flex" , margin:'3% 2%'}}>
        <div style={{ width: "20%" }}>
          <SidePanel active={menu} getData={(menu) => changeTab(menu)} completed = {completed} resourceTypeID = {props.resourceTypeID}/>
        </div>
        <div style={{ width: "80%" }}>
          <Screen menu={menu} resourceTypeID = {props.resourceTypeID} resourceID= {props.resourceID} getData = {(data)=>getDataFromScreen(data)} completed={completed} />
        </div>
      </div>
    </>
  );
}
