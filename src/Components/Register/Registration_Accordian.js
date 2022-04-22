import React, {useState} from 'react'
import { ClassNames } from "@emotion/react";
import SidePanel from "../Tabs/SidePanel";
import Screen from "./Screen";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Registration_Accordian(props) {

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
        <Accordion >
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
            <Typography>Personal Information</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <div >
                    <Screen menu={1} resourceTypeID = "D01F00710000" resourceID= "I" getData = {(data)=>getDataFromScreen(data)} completed={completed} />
                    {/* <Screen menu={menu} resourceTypeID = {props.resourceTypeID} resourceID= {props.resourceID} getData = {(data)=>getDataFromScreen(data)} completed={completed} /> */}
                </div>
        </AccordionDetails>
        </Accordion>

        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
            <Typography>Bank Details</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <div>
                    <Screen menu={2} resourceTypeID = {props.resourceTypeID} resourceID= {props.resourceID} getData = {(data)=>getDataFromScreen(data)} completed={completed} />
                </div>
        </AccordionDetails>
        </Accordion>

        {/* {props.resourceID === "I" ? ( */}

        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
            <Typography>Association</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <div>
                    <Screen menu={5} resourceTypeID = {props.resourceTypeID} resourceID= {props.resourceID} getData = {(data)=>getDataFromScreen(data)} completed={completed} />
                </div>
        </AccordionDetails>
        </Accordion>
        {/* ): null}  */}
        


        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
            <Typography>Upload Documents</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <div>
                    <Screen menu={3} resourceTypeID = {props.resourceTypeID} resourceID= {props.resourceID} getData = {(data)=>getDataFromScreen(data)} completed={completed} />
                </div>
        </AccordionDetails>
        </Accordion>

        
    </>
  )
}
