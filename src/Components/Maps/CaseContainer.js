import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from "../../axios_tteg";
import MapContainer from "./MapContainer";
import Cookies from "universal-cookie";

const cookies = new Cookies()

const CaseContainer = (props)=>{
    const [cases,setCases] = useState([]);
    const [goToMap,setGoToMap] = useState(false);
    const [goToCaseID,setGoToCaseID] = useState(null)
    useEffect(()=>{
        axios.get('/getResourceCase',{
            params:{
                resourceID:cookies.get('userData').resourceID,
            }
        })
        .then(response=>{
            console.log(response);
            setCases(response.data.cases)
        })
        .catch((e)=>console.log(e.response.data.error))
    },[])
    console.log(cases);

    const goToCase = (caseDetails)=>{
        console.log(caseDetails);
        setGoToCaseID(caseDetails);
        setGoToMap(true);
    }

    let container = null;
    
    if(goToMap && goToCaseID){
        container = (
            <MapContainer caseDetails = {goToCaseID}/>
        )
    }
    
    else if(cases.length > 0){
        container = (
            <div style={{display: 'grid',gridTemplateColumns: 'auto auto auto auto',padding: 10,justifyItems:'center', margin:20}}>
                {cases.map(item=>{
                    return(
                        <div style = {{margin:10, width:'240px'}}>
                            <Card sx={{ minWidth: 275 }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Case ID - {item.caseID}
                                    </Typography>
                                
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    Role - {item.description.role}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    Access - {item.description.access}
                                    </Typography>
                                    
                                </CardContent>
                                <CardActions style={{justifyContent:'space-around'}}>
                                    <Button size="small" onClick={()=>goToCase(item)}>Explore</Button>
                                </CardActions>
                            </Card>
                        </div>
                    )
                })}
            </div>
            
        )   
        
    }
    return(
        <div >
            {container}
        </div>
    )
}

export default CaseContainer