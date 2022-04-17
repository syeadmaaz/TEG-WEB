/*
    props 
    1. value - integer
    2. options - Json Array 
    3. getData - function to get data
    4. label - string
*/
import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const AutoSelectBox = (props)=>{
    const [value, setValue] = React.useState(props.value);

    const handleChange = (event) => {
        setValue(event.target.value);
        props.getData(event.target.value)
    };

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
                <InputLabel id="demo-simple-select-autowidth-label">{props.label}</InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={value}
                    onChange={handleChange}
                    autoWidth
                    label="Age"
                    size="small" 
                >
                    {
                        props.options.map(item=>{
                            return(
                                <MenuItem value= {item.value}>{item.display}</MenuItem>
                            )
                        })
                    }
                </Select>
            </FormControl>
        </div>
    );
}

export default AutoSelectBox