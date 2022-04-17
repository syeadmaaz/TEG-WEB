import React from 'react'
// import TextField from "@mui/material/TextField";
import classes from "./Explorer.module.css"
import { Checkbox, containerClasses } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import SimpleDenseTable from '../UI/SimpleDenseTable';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
// import Button from '@mui/material/Button';

const sortFunction = (a,b)=>{
  if (a.PipeType < b.PipeType)
    return -1;
  if (a.PipeType > b.PipeType)
 return 1;
  if(a.Quantity<b.Quantity) return -1
  return 1;
}
const equals = (a, b)=>{
  return JSON.stringify(a) === JSON.stringify(b) 
}

const distBtwPoints = (coords1, coords2) => {
  const R = 6371e3; // metres
  const φ1 = coords1.lat * Math.PI / 180; // φ, λ in radians
  const φ2 = coords2.lat * Math.PI / 180;
  const Δφ = (coords2.lat - coords1.lat) * Math.PI / 180;
  const Δλ = (coords2.lng - coords1.lng) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
     Math.cos(φ1) * Math.cos(φ2) *
     Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // in metres
}
const  Explorer=({markers,layers,getData,editableLayer})=> {
   console.log(markers);
   console.log(layers);
  // const [masterSeg,setMasterSeg]= React.useState([]);
  const [segArr,setSegArr] = React.useState([]); 
  const [segProp,setSegProp] = React.useState({});
  const [selectIndex,setSelectIndex] = React.useState(-1);
  const [selectPointObj,setSelectPoint] = React.useState({});
  const [pointsDistance,setPointDist] = React.useState(null);
  // console.log(markers,manholes)
  React.useEffect(() => {
    // console.log("target",markers,manholes);
    //  let tempMasterSeg = [],flag=1; 
    //  let WayPoint1 = markers ? markers[0] : null
    //  if(!WayPoint1) {
    //    flag=0;
    //    console.log("the plot should be started with way point");
    //  }
    //  else tempMasterSeg.push(WayPoint1);
    //  let markerIndex = 1,manholeIndex = 0;
    //  while(flag && markerIndex<markers.length && manholeIndex<manholes.length){
    //       let currWayPoint = markers[markerIndex],prevWayPoint = markers[markerIndex-1];
    //       let maxLat = Math.max(currWayPoint.lat,prevWayPoint.lat);
    //       let minLat = Math.min(currWayPoint.lat,prevWayPoint.lat);
    //       let maxLng = Math.max(currWayPoint.lng,prevWayPoint.lng);
    //       let minLng = Math.min(currWayPoint.lng,prevWayPoint.lng);
    //       if(minLat<=manholes[manholeIndex].lat<=maxLat && 
    //           minLng<=manholes[manholeIndex].lng<=maxLng 
    //         ){
    //           tempMasterSeg.push(manholes[manholeIndex]);
    //           manholeIndex+=1;
    //       }
    //       tempMasterSeg.push(currWayPoint);
    //       markerIndex+=1;
    //  }
    //  if(markerIndex<markers.length) {
    //    tempMasterSeg = tempMasterSeg.concat(markers.slice(markerIndex))
    //    console.log(markerIndex);
    //  }
    //  if(manholeIndex<manholes.length){
    //       tempMasterSeg = tempMasterSeg.concat(manholes.slice(manholeIndex))
    //       console.log(markerIndex);
    //  }
    //  console.log(tempMasterSeg);
    //  setMasterSeg(masterSeg);
    const tempSegArr = addSegments(markers);
    console.log(tempSegArr);
    setSegArr(tempSegArr);
    setSelectIndex(-2)
    allSegInfo();
    return;
  },[markers])
  
  const addSegments =  (markers) => {
      let tempSeg = [];
      let tempSegArr = [];
      for(let i=0;i<markers.length;i++){
        tempSeg.push(markers[i]);
        if(markers[i].type==="Manhole"){
            let A =[...markers[i].pipeContainers.A],C = [...markers[i].pipeContainers.C]   
            A.sort(sortFunction);
            C.sort(sortFunction);
            console.log(A,C,equals(A,C))
            if(!equals(A,C)){
                tempSegArr.push(tempSeg);
                tempSeg = []
                tempSeg.push(markers[i])
            }
        }
      }
      if(tempSeg.length) 
        tempSegArr.push(tempSeg);
      // console.log(tempSegArr);
      return tempSegArr;
  }

  const segInfo = (e) => {
      if(selectIndex!==-1){
        setSelectIndex(-1)
        setSegProp({})
        setSelectPoint({})
        setPointDist(null)
        return;
      }
      setSelectPoint({})
      const segIndex = parseInt(e.target.value)
      const segment = segArr[segIndex]
      console.log(segment)
      let distance=0,countWp=0,countMh=0;
      for(let i=0;i<segment.length;i++){
          if(segment[i].type==="Manhole") countMh+=1;
          if(segment[i].type==="WayPoint") countWp+=1;
          distance+=distBtwPoints(segment[i],segment[i-1] ? segment[i-1] : segment[i]);
      }
      //  MH1 WP1 WP2 MH2
      setSegProp({
         Name : `Segment ${segIndex+1}`,
         TotalSegLen : segment.length,
         distance : `${distance.toFixed(2)} m`,
         WayPoint : countWp,
         Manhole : countMh
      })
      setPointDist(null)
      setSelectIndex(segIndex)
  }
  const allSegInfo = () => {
    let distance=0,countWp=0,countMh=0;
    console.log(markers);
    for(let i=0;i<markers.length;i++){
        if(markers[i].type==="Manhole") countMh+=1;
        if(markers[i].type==="WayPoint") countWp+=1;
        distance+=distBtwPoints(markers[i],markers[i-1] ? markers[i-1] : markers[i]);
    }
    setSegProp({
      Name : `All Segments`,
      TotalSegsLen : markers.length,
      distance : `${distance.toFixed(2)} m`,
      WayPoint : countWp,
      Manhole : countMh
   })
  }
  const pointsInfo = (e) => {
      const [segIndex,pointIndex] = e.target.value.split("-");
      console.log(segIndex,pointIndex)
      const tempPointObj = {... selectPointObj}
      if(tempPointObj[[segIndex,pointIndex]])
          tempPointObj[[segIndex,pointIndex]] = 0;
      else 
        tempPointObj[[segIndex,pointIndex]] = 1;
      let distance = 0,prev=null;
      Object.entries(tempPointObj).map(([key,value]) => {
            let [index,pointIndex] = key.split(',')

            if(value){
              if(prev!=null){
                distance+=distBtwPoints(segArr[parseInt(index)][parseInt(pointIndex)],prev);
              }
              prev =segArr[parseInt(index)][parseInt(pointIndex)];
            }
      })
      console.log(distance)
      setSelectPoint(tempPointObj);
      setPointDist({...pointsDistance,[segIndex] : distance});
  }

  const changeLayersHandler = (data)=>{
    getData(data);
  }

  let explorerContainer = null;
  let layersContainer = null;
  if(layers){
    layersContainer = (
      <div style={{backgroundColor:'#F2F2F2', height: '100vh', padding:'10px 5%', textAlign:'left'}}>
        {/* <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',background:'aliceblue'}}>
          <p>Add Layers</p>
          <AddCircleOutlineIcon style={{color:'teal', cursor:'pointer'}} onClick={()=>changeLayersHandler({type:'addlayers'})}/>
        </div> */}
        {/*  */}
        {layers.map((item,index)=>{
          return(
            <div>
              <div style={{display:'flex', alignItems:'center',justifyContent:'space-between'}}>
                <FormGroup>
                  <FormControlLabel control={<Checkbox checked = {item.selected} onClick = {()=>changeLayersHandler({type:'layers',index:item.index})}/>} label={item.name+ (item.index+1)} />
                </FormGroup>
                  {editableLayer === index ? (
                    <div>
                      <EditIcon style={{padding:5}}/>
                      <AddCircleOutlineIcon style={{color:'teal', cursor:'pointer',padding:5}} onClick={()=>changeLayersHandler({type:'addroutes'})}/>
                    </div>
                  ):null}
                  
                
                  {/* <AddCircleOutlineIcon style={{color:'teal', cursor:'pointer'}} onClick={()=>changeLayersHandler({type:'addlayers'})}/>                 */}
              </div>
              {item.routes.map((innerItem,innerIndex)=>{
                return(
                  <div style={{paddingLeft:'10%', display:'flex',alignItems:'center'}}>
                    <FormGroup>
                      <FormControlLabel checked = {innerItem.selected} control={<Checkbox onClick = {()=>changeLayersHandler({type:'routes',index:innerItem.index})} />} label={innerItem.name+ (innerItem.index+1)} />
                    </FormGroup>
                    <div style={{width:25,height:15,backgroundColor:innerItem.color,display:'inline-flex'}}></div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    )
  }
  
  explorerContainer = (
      <div className={classes.gray}>
      <Checkbox 
        onClick={()=>{
          if(selectIndex === -2){
            setSelectIndex(-1)
            setSegProp({})
            setSelectPoint({})
            setPointDist(null)
            return;
          }
          setSelectIndex(-2);
          allSegInfo()
        }
      }
      disabled = {selectIndex!==-2 && selectIndex!==-1}
      checked = {selectIndex === -2} 
      />
      Explorer
      <div   className={classes.search}>
          {/* <TextField
          id="outlined-basic"
          varient="outlined"
          fulLWidth
          style={{width:'98%' ,marginTop:'2%',backgroundColor:'white'}}
          label="Filter"
          /> */}
          <div className={classes.filter}>
            {segArr.length > 0 ?(
              segArr.map((item,index)=>{
                console.log(item)
                return(
                  <Accordion style = {{zoom:0.8}}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography sx={{ width: '100%', flexShrink: 0 }}>
                      
                        <div style={{display:'flex', alignItems:'center',justifyContent:'flex-start'}}>
                          <Checkbox 
                          checked = {selectIndex===-2 || (selectIndex!==-1 && index===selectIndex)} 
                          disabled={selectIndex===-2 || (selectIndex!==-1 && index!==selectIndex)} 
                          value={index} 
                          onClick ={(e)=>segInfo(e)}/>
                          <li style={{listStyle:'none'}}>Segment {index+1}</li>
                        </div>
                    </Typography>
                    
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      {item.map((innerItem,tempIndex)=>{
                        console.log(innerItem);
                        return(
                          <div style={{display:'flex', alignItems:'center',justifyContent:'flex-start'}}>
                            <Checkbox 
                              value={`${index}-${tempIndex}`}
                              checked = {selectIndex===index || selectIndex === -2 || selectPointObj[[index,tempIndex]]===1} 
                              disabled={(selectIndex===index && selectPointObj) || selectIndex!==-1} 
                              onClick = {pointsInfo}
                            />
                            <li style={{listStyle:'none'}}>{innerItem.type} - {innerItem.count}  ({innerItem.lat.toFixed(2)},{innerItem.lng.toFixed(2)})</li>
                          </div>
                          
                        )
                      })}
                      <hr></hr>
                      { pointsDistance && pointsDistance[index] && <div style={{display:'flex',fontWeight:'bold', padding:'0 10px'}}>Distance :{pointsDistance[index].toFixed(2)}m</div>}
                      
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                )
              })
            ):null}
          </div>
          
          <label>Properties</label>
          <div className={classes.properties}>
          <TableContainer component={Paper}>
          <Table aria-label="simple table">
              <TableBody>
                {Object.entries(segProp).map(([key,value]) => (
                  <TableRow
                    key={key}
                    // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {key}
                    </TableCell>
                    <TableCell align="right">{value}</TableCell>
                  </TableRow>
                ))}
              
              </TableBody>

          </Table>
        </TableContainer>
       </div>
   </div>
</div>
  )

  const [tabValue, setTabValue] = React.useState(0);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  return (
    <div style = {{zoom:0.8}}>
          <Tabs value={tabValue} onChange={handleChangeTab} aria-label="basic tabs example" >
    <Tab label="layers" {...a11yProps(0)} />
    <Tab label="Route" {...a11yProps(1)} />
  </Tabs>
  <TabPanel value={tabValue} index={0}>
  {layersContainer}
</TabPanel>
<TabPanel value={tabValue} index={1}>
  {explorerContainer}
</TabPanel>

    </div>
  )
}

export default Explorer