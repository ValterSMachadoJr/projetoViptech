import React from "react";
//import {Link} from "react-router-dom"
import  './add.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

//import CustomRoutes from "../../routes";

function Adicionar_produto (){
    
    
    
    return(
        <>
        <div className="produto"> Adicionar Produto </div>
        
        <Box
        component="form"sx={{'& > :not(style)': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
    >
    <TextField id="outlined-basic" label="Nome do Produto" variant="outlined" /> <br/>
    <TextField id="outlined-basic" label="Marca" variant="outlined" /> <br/>
    <TextField id="outlined-basic" label="Valor" variant="outlined" />
    </Box>
    </>
    );
    
    
    
    
    
    
    
    
    
    
}
export default Adicionar_produto;





