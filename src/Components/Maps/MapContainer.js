import React from "react";
import Explorer from './Map/Explorer/Explorer';
import Head from './Map/Explorer/Head';
import MapCheck from "./Map/MapCheck";

const MapContainer = (props) => {
    console.log(props);
  // const [wayPoints,setWayPoints] = React.useState([]);
  // const [manholes,setManholes] = React.useState([]);
  const [markers,setMarkers] = React.useState([]);
  const [layers,setLayers] = React.useState(null);
  const [edit,setEdit] = React.useState(false);
  const [panTo,setPanTo] = React.useState({lat:null,lng:null});
  const [selectedRouteIndex,setSelectedRouteIndex] = React.useState(0);
  const [selectedLayerIndex,setSelectedLayerIndex] = React.useState(0);
  const [editableLayer,setEditableLayer] = React.useState(0);
  const [add,setAdd] = React.useState(null)
  const [saveMap,setSaveMap] = React.useState(false);
  const handleMarkers = (data) => {
    setAdd(null);
    setMarkers(data)
  }

  const changeMapParam = (data)=>{
    if(data.type === 1){
      setEdit(data.value);
    }
    else if(data.type=== 'pan'){
      setPanTo(data.value);
    }
    else if(data.type === 2){
        console.log("save")
        setSaveMap(true)
    }
  }

  const handleLayers = (data,editableLayer)=>{
    setLayers(data,editableLayer);
    setEditableLayer(editableLayer);
    data.map((outerItem,outerIndex)=>{
      if(outerItem.selected){
        setSelectedLayerIndex(outerIndex);
        outerItem.routes.map((item,index)=>{
          if(item.selected){
            setSelectedRouteIndex(index);
            return
          }
        })
      }
    })

  }

  const getDataFromExplorer = (data)=>{
    console.log(data.type);
    if(data.type === 'layers'){
      setSelectedLayerIndex(data.index);
      setSelectedRouteIndex(0)
    }
      
    else if(data.type === 'routes')
      setSelectedRouteIndex(data.index)
    else if(data.type === 'addlayers' || data.type === 'addroutes'){
      setAdd(data);
    }

    
  }
  return (
    <div>
      {/* <Search/> */}
      <div style={{width:'100%'}}>
         <Head getData = {(data)=>{changeMapParam(data)}} selectedLayerIndex={selectedLayerIndex} editableLayer={editableLayer}/> 
         <div style={{display:'flex'}}>
           <div style={{width:'15%'}}>
           <Explorer markers= {markers} layers = {layers} getData = {(data)=>getDataFromExplorer(data)} editableLayer={editableLayer}/>  
           </div>
          <div style={{width:'85%'}}>
          <MapCheck 
            getMarkers = {(data)=>handleMarkers(data)} 
            edit={edit} 
            panTo={panTo} 
            getLayers = {(layers,editableLayer)=>handleLayers(layers,editableLayer)} 
            selectedLayerIndex={selectedLayerIndex}
            selectedRouteIndex= {selectedRouteIndex}
            add={add}
            caseDetails = {props.caseDetails}
            saveMap = {saveMap}
            returnSave = {(data)=>setSaveMap(data)}
            />
          </div>  
         </div>
         
      </div>
    </div>
  );
}

export default MapContainer;

