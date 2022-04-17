/**
 * rows: json array
 * columns: array string
 */
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
const unitOptions=[
    {
        value:1,
        display:'mm'
    },
    {
        value:2,
        display:'cm'
    },
    {
        value:3,
        display:'m'
    },
    {
        value:4,
        display:'inch'
    },
    {
        value:5,
        display:'feet'
    },
    {
        value:6,
        display:'gm'
    },
    {
        value:7,
        display:'Kg'
    }
]



export default function SimpleDenseTable(props) {
    console.log(props);
    return (
        <TableContainer component={Paper} >
            <Table sx={{ minWidth: 250 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        {props.col.map(item=>{
                            return(
                                <TableCell>{item}</TableCell>
                            )
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                    props.rows ? (
                        props.rows.map((row,index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >       
                            {
                            props.col.map(colItem=>{
                                console.log(colItem)
                                return(
                                    <TableCell component="th" scope="row">
                                        {
                                            colItem == 'Unit' ? 
                                            (
                                                unitOptions[row[colItem]-1].display
                                            ):
                                            (
                                                row[colItem]
                                            )
                                            
                                        }
                                    </TableCell>
                                    )
                                    }
                                )
                            }
                            <Button 
                                data-key = {props.holeType}
                                data-index = {index}
                                value = {index}
                                variant="contained"     
                                style = {{margin: 10 }} 
                                onClick={(e)=>props.deleteSpecification(e)}    
                            >-</Button>
                            </TableRow>
                        ))):null
                    }
                    
                </TableBody>
            </Table>
        </TableContainer>
    );
}