import React, { useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import PanToolOutlinedIcon from "@mui/icons-material/PanToolOutlined";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Logo from "../../../../assets/images/logo.png";
import classes from "../MapCheck.module.css"
import usePlacesAutocomplete from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption
} from "@reach/combobox";
import "@reach/combobox/styles.css";

function Head(props) {
  const [switchLine, setSwitchLine] = React.useState(false);
  const [inputLat,setInputLat] = React.useState(null);
  const [inputLng,setInputLng] = React.useState(null);

  const addLine = React.useCallback((data) => {
    console.log(data);
    let d1 = data && (props.editableLayer === props.selectedLayerIndex)
    setSwitchLine(d1);
      props.getData({type:1,value:d1})
  }, []);

  const saveLine = React.useCallback(()=>{
    props.getData({type:2})
  })

  useEffect(()=>{
    let switch1 = {... switchLine};
    switch1 = switch1 && props.editableLayer === props.selectedLayerIndex;
    setSwitchLine(switch1);
      props.getData({type:1,value:switch1})
  },[props])

  return (
    <div>
      {/* <Search/> */}
      <div
        style={{
          backgroundColor: "#F2F2F2",
          display: "flex",
          border: " gray 1px solid",
          alignItems: 'center'
        }}
      >
        <div>
          <img src = {Logo} style= {{height:50}}/>
        </div>
        <div
          style={{
            padding:'0 20px',
            display: "flex",
          }}
        >
          <FolderOpenIcon style={{padding:'0 5px',fontSize:'21px'}}/>
          <SaveOutlinedIcon style={{ padding:'0 5px',fontSize:'21px' }} onClick = {saveLine} />
          <EditIcon style={{ padding:'0 5px',fontSize:'21px',color:(switchLine?'royalblue':'black') }} onClick={()=>addLine(true)} />
          <PanToolOutlinedIcon style={{ padding:'0 5px',fontSize:'21px',color:(!switchLine?'royalblue':'black') }} onClick={()=>addLine(false)}/>
          {/* <Search
           panTo={panTo} 
           /> */}
        </div>
        <div
          style={{
            padding:'0 20px',
            display: "flex",
            
            justifyContent: 'space-between',
            width: 520
          }}
        >
          <TextField onChange ={(e)=>setInputLat(e.target.value)} value={inputLat}id="outlined-basic" label="Latitude" variant="outlined" size="small" />
          <TextField onChange ={(e)=>setInputLng(e.target.value)} value={inputLng} id="outlined-basic" label="Longitude" variant="outlined" size="small" />
          <Button onClick = {()=>props.getData({type:'pan',value:{lat : parseFloat(inputLat),lng : parseFloat(inputLng)}})}>Pan To</Button>
        </div>
        
      </div>

    </div>
  );
}

export default Head;


//initally uneditable
//hand is active
//afte..

//ABCD
//no of pipes on each faces to be taken input


//wp1 goes on filter , its states are saved
//similarly wp2..

//total distance to be diaplyed
//checkbox to find distance 

function Search() {
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


// function Search() {
//   const {
//     ready,
//     value,
//     suggestions: { status, data },
//     setValue
//   } = usePlacesAutocomplete();

//   const handleInput = (e) => {
//     setValue(e.target.value);
//   };

//   const handleSelect = (val) => {
//     setValue(val, false);
//   };

//   const renderSuggestions = () => {
//     const suggestions = data.map(({ place_id, description }) => (
//       <ComboboxOption key={place_id} value={description} />
//     ));

//     return (
//       <>
//         {suggestions}
//         <li className="logo">
//           <img
//             src="https://developers.google.com/maps/documentation/images/powered_by_google_on_white.png"
//             alt="Powered by Google"
//           />
//         </li>
//       </>
//     );
//   };

//   return (
//     <div className="App">
//       <h1 className="title">USE-PLACES-AUTOCOMPLETE</h1>
//       {/* <p className="subtitle">
//         React hook for Google Maps Places Autocomplete.
//       </p> */}
//       <Combobox onSelect={handleSelect} aria-labelledby="demo">
//         <ComboboxInput
//           style={{ width: 300, maxWidth: "90%" }}
//           value={value}
//           onChange={handleInput}
//           disabled={!ready}
//         />
//         <ComboboxPopover>
//           <ComboboxList>{status === "OK" && renderSuggestions()}</ComboboxList>
//         </ComboboxPopover>
//       </Combobox>
//     </div>
//   );
// }
