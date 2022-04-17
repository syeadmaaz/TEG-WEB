/*
    accordianData - jsonArray - name,data(in html)
*/
import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SimpleDenseTable from './SimpleDenseTable';
import TextField from '@mui/material/TextField';
import AutoSelectBox from "./AutoSelectBox";
import Button from '@mui/material/Button';
const unitOptions=[
    {
        value:'HDPE - 32mm',
        display:'HDPE - 32mm'
    },
    {
        value:'HDPE - 40mm',
        display:'HDPE - 40mm'
    },
    {
        value:'GI - 100mm',
        display:'GI - 100mm'
    }
]
const Accordian = (props)=>{
    const [specifications,setSpecifications] = React.useState({
        Quantity:null,
        PipeType :null
    })
    const [tempPipeContainer,setTempPipeContainer] = React.useState(props.accordianData)
    const specificationHandler =  ((data,type)=>{
        console.log(data);
        let tempSpecification = {...specifications}
        tempSpecification[type] = data
        setSpecifications(tempSpecification)
    })
    const saveSpecification = ((e)=>{
        // console.log(specifications)
        const key = e.target.value
        console.log(key);
        if(specifications.Quantity>0 && specifications.PipeType){
            const container = {...tempPipeContainer}
            container[key].push(specifications)
            setTempPipeContainer(container)
        }       
    })
    const deleteSpecification = (e) => {
        const key = e.target.attributes.getNamedItem("data-key").value
        const index = e.target.attributes.getNamedItem("data-index").value
        const tempContainer = {...tempPipeContainer}
        tempContainer[key].splice(index,1)
        setTempPipeContainer(tempContainer)
    }
    return(
        <div>
        {
        Object.entries(props.accordianData).map(([key,value])=>{
            return(
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
            <Typography>{key}</Typography>
           </AccordionSummary>
                <AccordionDetails>
                    <div style = {{display:'flex'}}>
                        <AutoSelectBox
                            options = {unitOptions}
                            value = {specifications.PipeType}
                            label = 'Pipe Type'
                            getData = {(data)=>specificationHandler(data,'PipeType')}
                        />
                        <TextField 
                            id="outlined-basic" 
                            label="Quantity" 
                            variant="outlined" 
                            size="small" 
                            type="number"
                            style = {{margin:10,width:100}} 
                            value = {specifications.Quantity}
                            onChange = {(e)=>specificationHandler(parseInt(e.target.value),'Quantity')}
                        />
                        <Button 
                            value = {key}
                            variant="contained"     
                            style = {{margin: 10 }} 
                            onClick={(e)=>saveSpecification(e)}    
                        >+</Button>
                    </div>
                    <Typography>
                        {/*item.description*/}
                        <SimpleDenseTable
                            col = {['PipeType','Quantity']}
                            rows = {tempPipeContainer[key]}
                            deleteSpecification = {deleteSpecification}
                            holeType = {key}
                        />
                    </Typography>
                </AccordionDetails>
        </Accordion>
            )
        })
    }
    <Button onClick ={()=>props.handleAccordianData(tempPipeContainer,props.routeIndex)}>Submit</Button>
    <Button onClick ={()=>props.deleteMarker(props.routeIndex,props.markerIndex)}>Delete</Button>
    </div>
    )
}

export default Accordian