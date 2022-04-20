import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  Polyline,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { SketchPicker } from "react-color";
import CloseIcon from "@mui/icons-material/Close";

//import './contextMenu.css'
import classes from "./MapCheck.module.css"

import satellite from "../../../assets/images/satellite.png";
import roadMap from "../../../assets/images/roadMap.png";
import compass from "../../../assets/images/compass.png";
import pen from "../../../assets/images/pen.png";
import hand from "../../../assets/images/hand.jpg"
import dot from "../../../assets/images/dot.png"
import sewer from "../../../assets/images/sewer.png";
import pipeline from "../../../assets/images/pipeline.png";
import wiring from "../../../assets/images/wiring.png";
import line from "../../../assets/images/line.png"

import { formatRelative } from "date-fns";

import "@reach/combobox/styles.css";
import mapStyles from "./mapStyles";
import Accordian from "./UI/Accordian";
import { AirplaneTicketRounded, SwitchAccessShortcutAddTwoTone } from "@mui/icons-material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "../../../axios_tteg";
import CircularProgress from '@mui/material/CircularProgress';
import Cookies from "universal-cookie";

const cookies = new Cookies();

const libraries = ["places"];

const mapContainerStyle = {
  height: "92vh",
  width: "100%",
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};



const contextMenuStyle = {
  left : "0",
  backgroundColor : "white",
  padding: "10px 0",
  zIndex: "99",
  width: "200px",
  top: "calc(100% + 10px)",
  borderRadius: "4px",
  boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)"
}



const contextMenuItemStyle = {
  fontSize: "14px",
  padding: "10px 15px",
  cursor: "pointer",
  transition: "0.2s",
  marginBottom: "2px",
  fontWeight: "500",
  display: "flex",
  columnGap : "10px",
  backgroundColor:"#fff",
  alignItems: "center",
  "&:hover": {
    backgroundColor: "#cccccc"
  }
}

const mapViewStyle = {
  width:50,
  margin:10,
  boxShadow: '0 2px 3px #ccc',
  border: '1px solid #eee',
  cursor:"pointer"
}

const center = {
  lat: 28.70406,
  lng: 77.102493,
};

export default function MapCheck2(props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyC_kRxUGZMpYA361uWGeGohZW5PYqCoj4k",
    libraries,
  });
  // const [markerGrp,setMarkerGrp] = React.useState([{
  //   markers : [],
  //   dataCount : {}
  // }]);
  const [layers,setLayers] = React.useState([[
    {
      markers : [],
      dataCount : {}
    }
  ]]);
  const [inputLat,setInputLat] = React.useState(null);
  const [inputLng,setInputLng] = React.useState(null);
  const [latLng,setLatLng] = React.useState({}); // to store the latitude and longitude when user clicks 
  const [manholePopBox, setManholePopBox] = React.useState(false);
  const [lineActive,setLineActive] = React.useState(false);
  // const [markers,setMarkers] = React.useState([]);
  const [edit,setEdit] = React.useState(false);
  const [lineColor,setLineColor] = React.useState("0000ff")
  const [polyLineActive,setPolyLineActive] = React.useState(false); 
  const [mapView,setMapView] = React.useState("roadmap")
  // const [dataCount,setDataCount] = React.useState({
  //   WayPoint:0,
  //   Manhole :0
  // })
  const [selected, setSelected] = React.useState({
    marker: null,
    index: null,
  });
  const [selRouteIndex,setSelectedRoute] = React.useState(0);
  const [selLayerIndex,setSelectedLayer] = React.useState(0);
  // added
  const [inputLayers,setInputLayers] = React.useState([
    ])
  const [inputResourceID,setInputResourceID] = useState(cookies.get("userData").resourceID);
  const [loading,setLoading] = React.useState(false);
  const [error,setError] = React.useState(false);
  

  const [editableLayer,setEditableLayer] = useState(null)
  const [saveMap,setSaveMap] = useState(false);

  useEffect(()=>{
    getSavedMap();
    
  },[])

  console.log(inputResourceID)

  const getSavedMap = ()=>{
    console.log(props);
    let tempInputLayer = []
    axios.get('/getMapAuditFinal',{
      params:{
        caseID:props.caseDetails.caseID
      }
      
    })
    .then(response=>{
      console.log(response);
      if(response.data.store.length > 0){
        // let tempInputLayer = []
        response.data.store.map(item=>{
          tempInputLayer.push(item);
        })
        if(tempInputLayer.length > 0){
          let tempLayers = [];
          let tempEditableIndex = null;
          tempInputLayer.map((item,index)=>{
            console.log(item.resourceID, inputResourceID);
            if(item.resourceID === inputResourceID){
              tempEditableIndex = index;
              setEditableLayer(index);
            } 
            tempLayers.push(item.data);
          })
          console.log(tempEditableIndex);
          if(props.caseDetails.description.access === 'editor' && tempEditableIndex === null){
            tempLayers.push([{
              markers : [],
              dataCount : {}
            }]);
            setEditableLayer(tempInputLayer.length)
          }
          console.log(tempLayers);
          setLayers(tempLayers);
        }
        else{
          if(props.caseDetails.description.access === 'editor')
            setEditableLayer(0)
        }
      }
      else
        setInputLayers(tempInputLayer)
    })
    .catch(e=>console.log(e))
    console.log(tempInputLayer);
  }
  // -- added
console.log(editableLayer);

  useEffect(()=>{
    
    //if(editableLayer === selLayerIndex)
    setEdit(props.edit);
    setInputLat(props.panTo.lat);
    setInputLat(props.panTo.lng);
    setSelectedRoute(props.selectedRouteIndex);
    setSelectedLayer(props.selectedLayerIndex);
     console.log(JSON.stringify(layers));
    // let tempMarker = selectRouteDetails();
    // console.log(tempMarker);
    //props.getMarkers(tempMarker)
    if(props.panTo.lat && props.panTo.lng)
      panTo({lat : parseFloat(props.panTo.lat),lng : parseFloat(props.panTo.lng)})
    if(props.add){
      addTo(props.add)
    }
    console.log(props);
    setSaveMap(props.saveMap);
    if(props.saveMap){
      saveMapHandler();
      props.returnSave(false);
    }
    
  },[props]);


 

  useEffect(()=>{
    let tempMarker = selectRouteDetails();
    console.log(tempMarker);
    props.getMarkers(tempMarker)
  },[selRouteIndex , selLayerIndex])

  const selectRouteDetails = ()=>{
    console.log(selRouteIndex);
    const tempLayers = [...layers];
    let tempMarkerGrp = tempLayers[selLayerIndex]
    const tempMarkers=  [
      // ...markers,
      ...tempMarkerGrp[selRouteIndex].markers
    ]
    const dataCount = {
        ... tempMarkerGrp[selRouteIndex].dataCount
    }
    
    return(tempMarkers);
  }

  const addTo = (data)=>{
    console.log(data);
    if(data.type === 'addlayers'){
      const tempLayers = [...layers];
      tempLayers.push([
        {
          markers : [],
          dataCount : {}
        }
      ]);
      setLayers(tempLayers);
      console.log(tempLayers.length)
      setSelectedLayer(tempLayers.length-1);
      setSelectedRoute(0)
    }
    if(data.type === 'addroutes'){
      const tempLayers = [...layers];
      const tempMarkerGrp = tempLayers[selLayerIndex];
      tempMarkerGrp.push({
        markers : [],
        dataCount : {}
      });
      tempLayers[selLayerIndex] = [...tempMarkerGrp]
      // setMarkerGrp(tempMarkerGrp);
      setLayers(tempLayers);
      setLineActive(false);
      setManholePopBox(false);
      setSelectedRoute(tempMarkerGrp.length-1)
    }
  }

  // sending the structure of layers

  useEffect(()=>{
    let layersStructure = [];
    if(layers.length > 0){
      layers.map((outerItem,outerIndex)=>{
        if(outerIndex === selLayerIndex)
          layersStructure[outerIndex] = {name:'Layer',index:outerIndex,routes:[],selected:true}
        else
          layersStructure[outerIndex] = {name:'Layer',index:outerIndex,routes:[],selected:false}
        outerItem.map((innerItem,innerIndex)=>{
          if(innerIndex === selRouteIndex && outerIndex === selLayerIndex)
            layersStructure[outerIndex]['routes'].push({name:'Route',index:innerIndex,selected:true,color:innerItem.color});
          else
            layersStructure[outerIndex]['routes'].push({name:'Route',index:innerIndex,selected:false,color:innerItem.color});
        })
      })
    }
    
    console.log(editableLayer);
    props.getLayers(layersStructure,editableLayer);
  },[layers,selRouteIndex,selLayerIndex,editableLayer])
  // useEffect(()=>{
  //   console.log(inputLat)
  //   if(inputLat && inputLng)
  //     panTo({lat : inputLat,lng : inputLng})
  // },[inputLat])

  const onMapRightClick = React.useCallback((e) => {
    setLatLng({
        lat:e.latLng.lat(),
        lng:e.latLng.lng(),
        time:new Date()
    })
  }, []);

  // const onMapClick = (e) => {
  //   const tempwayPoints =  [
  //     ...wayPoints,
  //     {
  //       type : "Way Point",
  //       lat: e.latLng.lat(),
  //       lng: e.latLng.lng(),
  //       time: new Date(),
  //     },
  //   ]
  //   setWayPoints(tempwayPoints);
  //   props.getWp(tempwayPoints);
  //   setDistances((current)=> {
  //     if(wayPoints[wayPoints.length-1]){
  //         const distance = distBtwPoints(wayPoints[wayPoints.length-1],{
  //           lat: e.latLng.lat(),
  //           lng: e.latLng.lng(),
  //         }) 
  //         // console.log("distances",[...current,distance])
  //         return [...current,distance]    
  //     }
  //     return [...current]
  //   });
  // }

  console.log(layers);

  const addWayPoint = (e) => {
      const tempLayers = [...layers];
      let tempMarkerGrp = tempLayers[selLayerIndex]
      let wayPointCount = tempMarkerGrp[selRouteIndex].dataCount.WayPoint
      if(wayPointCount == undefined) wayPointCount = 0
      const tempMarkers=  [
      // ...markers,
      ...tempMarkerGrp[selRouteIndex].markers,
      {
        type : "WayPoint",

        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
        count : wayPointCount+1
      },
    ]
    const dataCount = {
        ... tempMarkerGrp[selRouteIndex].dataCount, 
        WayPoint : wayPointCount+1
    }
    // setMarkers(tempMarkers);
    tempMarkerGrp[selRouteIndex].markers =tempMarkers;
    tempMarkerGrp[selRouteIndex].dataCount =dataCount;
    
    // setDataCount({... dataCount, WayPoint : dataCount["WayPoint"]+1}); //not needed
    // setMarkerGrp(tempMarkerGrp);
    tempLayers[selLayerIndex] = tempMarkerGrp;
    setLayers(tempLayers);
    props.getMarkers(tempMarkers);
  }
  const addMarker = (e) => {
    let  markerType = e.target.attributes.getNamedItem("data-marker-type")
    // if he clicks on context Menu but not the menu item
    if(markerType) markerType = markerType.value; 
    else return;
    if(markerType==="WayPoint"){
          setManholePopBox(true);
          return;
    }
    let prevManhole = null,i;
    // assigning the previous.C  to currentManhole.A
    const tempLayers = [...layers];
    const tempMarkerGrp = tempLayers[selLayerIndex]
    const tempMarkers = tempMarkerGrp[selRouteIndex].markers
      if(markerType==="Manhole"){
        for(let i=tempMarkers.length-1;i>=0;i--){
          if(tempMarkers[i].type === "Manhole"){
              prevManhole = tempMarkers[i];
              break;
          }
        }       
      }
    // we need to insert correctly into main markers array
    let x = latLng.lat,y = latLng.lng;
    // console.log("hello");
    for(i=0;i<tempMarkers.length-1;i++){
        let x1 = tempMarkers[i].lat,y1 = tempMarkers[i].lng,x2 = tempMarkers[i+1].lat,y2 = tempMarkers[i+1].lng
        // line equation
        // y-y1 = (y2-y1)/(x2-x1) * (x-x1)
        // (y-y1)*(x2-x1) = (y2-y1)*(x-x1);
        // console.log(0.333+0.666 === 1)
        console.log(Math.abs(((y-y1)*(x2-x1)).toFixed(15)-((y2-y1)*(x-x1)).toFixed(15)))
        if(Math.abs(((y-y1)*(x2-x1)).toFixed(12)-((y2-y1)*(x-x1)).toFixed(12))<6e-9){
            console.log("it satisfies the eq")
        }
        else  continue;
        let maxLat = Math.max(x1,x2),minLat = Math.min(x1,x2),maxLng = Math.max(y1,y2),minLng = Math.min(y1,y2);
        // console.log(maxLat-x,x-minLat,maxLng-y,y-minLng);
        if((maxLat-x)>0 && (x-minLat)>0 && (maxLng-y)>0 &&  (y-minLng)>0 ){
          console.log("in range")
          break;
        }
    }
    let manholeCount= tempMarkerGrp[selRouteIndex].dataCount.Manhole
    if(manholeCount == undefined) manholeCount = 0
    const dataCount = {
      ... tempMarkerGrp[selRouteIndex].dataCount, 
      Manhole : manholeCount+1
    } 
    tempMarkers.splice(i+1, 0,{
          type : markerType,
          lat: latLng.lat,
          lng: latLng.lng,
          time: new Date(),
          count : manholeCount+1,
          ...(markerType ==="Manhole") && 
          {pipeContainers : {
            "A" : prevManhole ? [...prevManhole.pipeContainers.C] : [],
            "B" : [],
            "C" : [],
            "D" : []
          }}
    });

    tempMarkerGrp[selRouteIndex].markers = [...tempMarkers];
    tempMarkerGrp[selRouteIndex].dataCount = dataCount;
    tempLayers[selLayerIndex] = [...tempMarkerGrp]
    // setMarkerGrp(tempMarkerGrp);
    setLayers(tempLayers);
    // setDataCount({... dataCount, Manhole : dataCount["Manhole"]+1});
    // setMarkers(tempMarkers);
  // setMarkers(tempMarkers);
    console.log(tempMarkers);
    props.getMarkers(tempMarkers);
    // const tempMarkers = [
    //   ...markers,
    //   {
    //     type : markerType,
    //     lat: latLng.lat,
    //     lng: latLng.lng,
    //     time: new Date(),
    //     ...(markerType ==="Manhole") && 
    //     {pipeContainers : {
    //       "A" : prevManhole ? [...prevManhole.pipeContainers.C] : [],
    //       "B" : [],
    //       "C" : [],
    //       "D" : []
    //     }}
    //   }
    // ]
    // setMarkers(tempMarkers);
    // props.getMarkers(tempMarkers);
  }
  // const addManHole = () => {
  //   const tempManholes =  [
  //     ...manholes,
  //     {
  //       type : "Manhole",
  //       lat: latLng.lat,
  //       lng: latLng.lng,
  //       time: new Date(),
  //       pipeContainers : {
  //         "A" : [],
  //         "B" : [],
  //         "C" : [],
  //         "D" : []
  //       }
  //     },
      
  //   ]
  //   setManholes(tempManholes);
  //   props.getMh(tempManholes);
  // }

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const adjustMarkers = (markerIndex,tempMarkers) => {
      let markerPos = tempMarkers[markerIndex].count,markerType =tempMarkers[markerIndex].type;
      // console.log(markerPos,markerIndex);
      for(let i=0;i<tempMarkers.length;i++){
          if((markerType === tempMarkers[i].type) && (tempMarkers[i].count>markerPos))
                tempMarkers[i].count-=1;
      }
      // setMarkerGrp(markerGrp);
      // setDataCount({... dataCount,[markerType] : dataCount[[markerType]]-1})
      return tempMarkers
  }
  // deleting the marker
  const deleteMarker = (delRouteIndex,markerIndex) => {
      if(delRouteIndex!==selRouteIndex){
        return;
      }
      const tempLayers = [...layers];
      const tempMarkerGrp = tempLayers[selLayerIndex]
      let tempMarkers = tempMarkerGrp[selRouteIndex].markers,markerType =tempMarkers[markerIndex].type;;
      // if the type is manhole we should make sure the previous and next manhole must be in sync
      tempMarkers= adjustMarkers(markerIndex,tempMarkers);
      if(tempMarkers[markerIndex].type==="Manhole")
        tempMarkers = deleteManhole(markerIndex,tempMarkers);
      tempMarkers.splice(markerIndex,1);
      const dataCount = {
        ... tempMarkerGrp[selRouteIndex].dataCount, 
        [markerType] : tempMarkerGrp[selRouteIndex].dataCount[[markerType]]-1
      } 
      // setMarkers(tempMarkers);
      tempMarkerGrp[selRouteIndex].markers = [...tempMarkers];
      tempMarkerGrp[selRouteIndex].dataCount = dataCount;
      tempLayers[selLayerIndex] = [...tempMarkerGrp]
      console.log(tempLayers)
      // setMarkerGrp(tempMarkerGrp);
      setLayers(tempLayers)
      props.getMarkers(tempMarkers);
      setSelected({
        routeIndex : null,
        marker: null,
        index: null,
      });
  }
  // const addWayPointProperty = React.useCallback(
  //   (e) => {
  //     setManholePopBox(true);
  //   },
  //   []
  // );

  // const deleteWayPoint = (markerIndex) => {
  //     const tempWayPoints = [...wayPoints];
  //     tempWayPoints.splice(markerIndex,1);
  //     // const tempdistances = wayPoints.splice(0,Math.max(marker));
  //     setWayPoints(tempWayPoints);
  //     props.getWp(tempWayPoints);
  //     setSelected({
  //       marker: null,
  //       index: null,
  //     })
  //     const tempDistances = tempWayPoints.map((currPoint,index)=>{
  //       if(index){
  //         return distBtwPoints(currPoint,tempWayPoints[index-1])
  //       }
  //     });
  //     tempDistances.shift();
  //     setDistances(tempDistances);
  // }

  const deleteManhole = (markerIndex,tempMarkers) => {
    const currManhole = tempMarkers[markerIndex];
    if(currManhole.pipeContainers.A ==currManhole.pipeContainers.C)
      return tempMarkers;
    let prevManhole=null;
    for(let i=markerIndex-1;i>=0;i--){
      if(tempMarkers[i].type === "Manhole"){
        prevManhole = tempMarkers[i];
        break;
      }
    } 
    if(!prevManhole) return tempMarkers;
    prevManhole.pipeContainers.C = [...currManhole.pipeContainers.C];
    return tempMarkers;
  };
  
  const panTo = React.useCallback(({ lat, lng }) => {
    try{
      mapRef.current.panTo({ lat, lng });
    }
    catch(err){
      alert(err);
    }
    mapRef.current.setZoom(16);
  }, []);

  // handling the update of manhole
  const handleAccordianData = (pipeContainer,routeIndex) => {
    if(routeIndex!==selRouteIndex)
      return;
    const tempLayers = [...layers];
    const tempMarkerGrp = tempLayers[selLayerIndex]
    const tempMarkers = tempMarkerGrp[selRouteIndex].markers
    const markerIndex = selected.index-1,currManhole = tempMarkers[markerIndex];
    currManhole.pipeContainers = pipeContainer;
    let prevManhole=null,nextManhole=null;
    for(let i=markerIndex-1;i>=0;i--){
      if(tempMarkers[i].type === "Manhole"){
        prevManhole = tempMarkers[i];
        break;
      }
    } 
    if(prevManhole) prevManhole.pipeContainers.C = currManhole.pipeContainers.A;
    for(let i=markerIndex+1;i<tempMarkers.length;i++){
      if(tempMarkers[i].type === "Manhole"){
        nextManhole = tempMarkers[i];
        break;
      }
    }     
    if(nextManhole) nextManhole.pipeContainers.A = currManhole.pipeContainers.C;   
    tempMarkerGrp[selRouteIndex].markers = tempMarkers;
    // setMarkers(tempMarkers);
    // setMarkerGrp(tempMarkerGrp);
    props.getMarkers(tempMarkers)
    tempLayers[selLayerIndex] = [...tempMarkerGrp]
    setLayers(tempLayers)
    setSelected({
      marker: null,
      index: null,
    })
  }

  
  const onMarkerDragEnd = (coord,{index}) => {
    // console.log("On markerdragEnd",coord,index);
    const tempLayers = [...layers];
    const tempMarkerGrp = tempLayers[selLayerIndex]
    const tempMarkers = tempMarkerGrp[selRouteIndex].markers
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    tempMarkers[index] = { ...tempMarkers[index],lat, lng };
    tempMarkerGrp[selRouteIndex].markers = [...tempMarkers];
    tempLayers[selLayerIndex] = [...tempMarkerGrp]
    // setMarkers(tempMarkers);
    // setMarkerGrp(tempMarkerGrp);
    setLayers(tempLayers)
    // setMarkers(tempMarkers);
    props.getMarkers(tempMarkers);
  };
  const addRoute = () => {

    // if the route is empty i need to ignore
    const tempLayers = [...layers];
    const tempMarkerGrp = tempLayers[selLayerIndex];
    if(tempMarkerGrp[selRouteIndex].markers.length)
      return;
    tempMarkerGrp.push({
      markers : [],
      dataCount : {}
    });
    tempLayers[selLayerIndex] = [...tempMarkerGrp]
    // setMarkerGrp(tempMarkerGrp);
    setLayers(tempLayers);
    setLineActive(false);
    setManholePopBox(false);
    setSelectedRoute(tempMarkerGrp.length-1)
    // setMarkers([]);
  }

  const saveMapHandler = ()=>{
    console.log(layers[editableLayer])
    setLoading(true);
    axios.post('/mapAuditLog',{
      caseID:props.caseDetails.caseID,
      resourceID:cookies.get('userData').resourceID,
      data:layers[editableLayer]
    }).
    then(response=>{
      console.log(response)
    })
    .catch(e=>{
      console.log(e)
    })
    axios.post('/mapAuditFinal',{
      caseID:props.caseDetails.caseID,
      resourceID:props.caseDetails.resourceID,
      data:layers[editableLayer]
    })
    .then(response=>{
      setLoading(false)
      console.log(response);
      if(response.status === 200){
        alert('saved Successfully');
        getSavedMap();
      }
    })
    .catch(e=>{
      setLoading(false)
      alert('error Found')
      console.log(e)
    })
  }


  let container = null;

  if(saveMap){
    container = (
      <div>
        <Dialog
          open={saveMap}
          onClose={setSaveMap(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you want to save the map?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>setSaveMap(false)}>Disagree</Button>
            <Button onClick={saveMapHandler} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      
      <Locate panTo={panTo} />
      {/* <Search panTo={panTo} /> */}
      <ContextMenuTrigger id="contextmenu">
      {loading? (<div style={{position :'absolute', top:'50%', left:'50%'}}><CircularProgress/></div>):(
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          mapTypeId = {mapView}
          zoom={18}
          center={center} 
          onClick={edit && lineActive ? addWayPoint : null}
          options={options}
          onLoad={onMapLoad} // when map loads it should be in the browserLocation
          clickableIcons = {false}
          onRightClick={edit? (e)=>{
            setPolyLineActive(false);
            onMapRightClick(e);
          }: null}
        >
          
          {
            layers.map(item=>{
              console.log(item);
              return(
                item.map(({markers},routeIndex) => {
                  console.log("in every route")
                  return(
                    <>
                    {
                      markers.map((marker,index) => { 
                        return (
                          <Marker
                            data-count = {marker.count}
                            draggable = {routeIndex === selRouteIndex && edit}
                            label = {{text:`${marker.type}-${marker.count}`,color:'#fff'}}
                            key={`${marker.time.toString()}_${index}`}
                            position={{ lat: marker.lat, lng: marker.lng }}
                            onClick={(e) => {
                              setSelected({
                                marker,
                                routeIndex,
                                index: index+1,
                              });
                            }}
                            onDragEnd = {(e)=>{
                              onMarkerDragEnd(e,{marker,index:index,routeIndex});
                            }}
                            icon={{
                              url: (marker.type === "Manhole" ? dot : line),
                              scaledSize: new window.google.maps.Size(30, 30),
                              origin: new window.google.maps.Point(0, 0),
                              anchor: new window.google.maps.Point(15, 15),
                              labelOrigin: new window.google.maps.Point(15, -10)
                            }}
                          />
                        )
                      })
                    }
                    </>
                  )
                }
              )
              )
              
            })
            //   layers[selLayerIndex].map(({markers},routeIndex) => {
            //     console.log("in every route")
            //     return(
            //       <>
            //       {
            //         markers.map((marker,index) => { 
            //           return (
            //             <Marker
            //               data-count = {marker.count}
            //               draggable = {routeIndex === selRouteIndex && true}
            //               label = {{text:`${marker.type}-${marker.count}`,color:'#fff'}}
            //               key={`${marker.time.toISOString()}_${index}`}
            //               position={{ lat: marker.lat, lng: marker.lng }}
            //               onClick={(e) => {
            //                 setSelected({
            //                   marker,
            //                   routeIndex,
            //                   index: index+1,
            //                 });
            //               }}
            //               onDragEnd = {(e)=>{
            //                 onMarkerDragEnd(e,{marker,index:index,routeIndex});
            //               }}
            //               icon={{
            //                 url: (marker.type === "Manhole" ? dot : line),
            //                 scaledSize: new window.google.maps.Size(30, 30),
            //                 origin: new window.google.maps.Point(0, 0),
            //                 anchor: new window.google.maps.Point(15, 15),
            //                 labelOrigin: new window.google.maps.Point(15, -10)
            //               }}
            //             />
            //           )
            //         })
            //       }
            //       </>
            //     )
            //   }
            // )
          }
          {
            layers.map((item,index)=>{
              console.log(item)
              return(
                item.map(({markers,color},innerIndex)=>{
                  console.log("in layer",markers,color);
                  return(
                  <Polyline
                    path={markers}
                    strokeWidth = {10000}
                    options={{strokeColor : color,strokeOpacity :(innerIndex === selRouteIndex && index === selLayerIndex)?0.9:0.2}}
                    strokeOpacity={(innerIndex === selRouteIndex && index === selLayerIndex)?0.9:0.2}
                    strokeWeight={2}
                    onRightClick = {(e)=>{
                      setPolyLineActive(true);
                      onMapRightClick(e)
                    }}/>
                  )
                })
              )
              
            })
          // layers[selLayerIndex].map(({markers,color})=>{
          //   console.log("in layer",markers,color);
          //   console.log(color)
          //   return(
          //   <Polyline
          //     path={markers}
          //     strokeWidth = {10000}
          //     options={{strokeColor : color}}
          //     strokeOpacity={0.8}
          //     strokeWeight={2000}
          //     onRightClick = {(e)=>{
          //       setPolyLineActive(true);
          //       onMapRightClick(e)
          //     }}/>
          //   )
          //   })
          
        }
        { 
          selected.marker ? (
            <InfoWindow

              position={{ lat: selected.marker.lat, lng: selected.marker.lng }}
              onCloseClick={() => {
                setSelected({
                  marker: null,
                  routerIndex : null,
                  index: null
                });
                // setSelectedIndex(null);
              }}
            >
             <div style={{zoom:0.8}}>
                <h2>{selected.marker.type}- {selected.marker.count}</h2>
                {/* <p>Created: {formatRelative(selected.marker.time, new Date())}</p> */}
                {selected.marker.type === "WayPoint" ? <Button onClick={()=>deleteMarker(selected.routeIndex,selected.index-1)}>Delete</Button>  : null}
                {selected.marker.type === "Manhole" ? 
                  <div>
                  { 
                    <Accordian 
                      markerIndex = {selected.index-1} 
                      routeIndex = {selected.routeIndex}
                      accordianData =  {selected.marker.pipeContainers} 
                      handleAccordianData={handleAccordianData}
                      deleteMarker = {deleteMarker} />
                  }
                  </div>                          
              : null
              }        
              </div>
            </InfoWindow>
          ) : null
        }

        
        
        </GoogleMap>
      )}
      </ContextMenuTrigger>

      {/* there will be the error in event  */}
      {
        edit  ? <ContextMenu hideOnLeave={true} id="contextmenu">
        <div style={contextMenuStyle}>
        {
         polyLineActive && <MenuItem onClick={(e)=>addMarker(e)}>
          <div style={contextMenuItemStyle} >
            <img src={dot} alt="Manhole" style={{ width: "26px" }} />
            <span data-marker-type="Manhole">Manhole</span>
          </div>
        </MenuItem> 
        }
        { 
          !polyLineActive && <MenuItem onClick={(e)=>addMarker(e)}>
            <div style={contextMenuItemStyle} >
              <img src={line} alt="Manhole" style={{ width: "26px" }} />
              <span data-marker-type="WayPoint">Way Point</span>
            </div>
          </MenuItem>
        }
        </div>
      </ContextMenu> : null
      }

      {edit && manholePopBox ? (
        <div
          style={{
            position: "absolute",
            top: 80,
            right: 10,
            background: "white",
            borderRadius: 5,
            zoom: 0.75,
          }}
        >
          <div>
            <CloseIcon
              onClick={() =>{
                setManholePopBox(false)
                setLineActive(false)
              }}
              style={{
                cursor: "pointer",
                fontSize: "small",
                float: "right",
                padding: 5,
              }}
            />
          </div>
          <div>
            <Button
              variant="contained"
              style={lineActive ? { backgroundColor : "grey",margin: 10 } : {margin:10}}
              onClick={!lineActive ? ()=>setLineActive(true) : null }
              // disabled={lineActive}
            >
              Start
            </Button>
            <Button
              variant="contained"
              style={!lineActive ? { backgroundColor : "grey",margin: 10 } :{ margin: 10 }}
              onClick={lineActive ? ()=>{
                setLineActive(false) 
              }: null}
              // disabled={!lineActive}
            >
              Stop
            </Button>
            <SketchPicker
            color={lineColor}
            onChangeComplete={(color)=> {
              setLineColor(color.hex)
              const tempLayers = [...layers];
              const tempMarkerGrp = tempLayers[selLayerIndex]
              tempMarkerGrp[selRouteIndex].color =color.hex;
              tempLayers[selLayerIndex] = [...tempMarkerGrp];
              setLayers(tempLayers)
            }}
            />
          </div>
          <div style={{ display: "grid" }}>
            {/* <TextField
              id="outlined-basic"
              label="Type"
              variant="outlined"
              size="small"
              style={{ margin: 10 }}
              // value={tempLineType}
              // onChange={(e) => tempLineTypeHandler(e)}
            />
            <TextField
              id="outlined-basic"
              label="Comment"
              variant="outlined"
              size="small"
              style={{ margin: 10 }}
              // value={tempLineComment}
              // onChange={(e) => tempLineCommentHandler(e)}
            /> */}

            <Button
              variant="contained"
              style={{ margin: 10 }}
              onClick={addRoute}
            >
              Submit
            </Button>
          </div>
        </div>
      ) : null}

      <div 
      style={
        {position:"absolute",
        bottom:35,right:56,
        background:'white',
         borderRadius:5
        }}>
        <div style={{display:'flex'}}>
          <img 
            src = {roadMap} 
            alt = "RoadMap"
            style = {
              mapView === 'roadmap' ? 
              mapViewStyle: {width:50,margin:10,cursor:"pointer"}
            } 
            onClick = {()=>setMapView('roadmap')}/>
          <img 
            src = {satellite} 
            alt = "Satellite"
            style = {
              mapView === 'satellite' ?
              mapViewStyle: {width:50,margin:10,cursor:"pointer"}
            } 
            onClick = {()=>setMapView('satellite')}/>
          </div>
      </div>
    </div>
  );
}

function Locate({ panTo }) {
  return (
    <button
      className={classes.locate}
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <img src={compass} alt="compass" />
    </button>
  );
}


function Search({ panTo }) {
  const {
    ready, //similarly like loadScript for googlemapAPI, if its ready
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 28.70406, lng: () => 77.102493 }, //prefer location close to user location
      radius: 100 * 1000,
    },
  });
  console.log(ready,value,status);
  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  // const handleSelect = async (address) => {
  //   console.log(address)
  //   setValue(address, false);
  //   clearSuggestions();

  //   try {
  //     const results = await getGeocode({ address });
  //     const { lat, lng } = await getLatLng(results[0]);
  //     panTo({ lat, lng });
  //   } catch (error) {
  //     console.log("😱 Error: ", error);
  //   }
  // };

  return (
    <div 
    className={classes.search}
    >
      <Combobox onSelect={(address)=>console.log(address)}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search your location"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}

//POlyLine in Google Maps API

// layers [] where every element is markerGrp
// markerGrp [] where every element is {
   // markers : []
   //dataCount : {}
   // lineColor : 
//}