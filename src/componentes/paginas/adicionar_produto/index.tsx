import React, { useRef, useState } from "react";
//import {Link} from "react-router-dom"
import  './add.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Alert, Button, IconButton, Input, Snackbar, SvgIcon } from "@mui/material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { AxiosResponse } from "axios";
import { NodeAPI } from "services/Service";
import { ProdutoDTO } from "dtos/ProdutoDTO";
import { blue } from "@mui/material/colors";
import CustomRoutes from "componentes/routes";
import { BrowserRouter } from "react-router-dom";
import Navegacao from "../navegacao";


//import CustomRoutes from "../../routes";

function Adicionar_produto (){

    const [nome, setNome] = useState<string>('');
    const [id_cor, setIdcor] = useState<Number>(0);
    const [id_marca, setIdmarca] = useState<Number>(0);
    const [valor, setValor] = useState<Number>(0);
    const [imagem, setImagem] = useState<string>('');





   // const [isOpen, setIsOpen] = useState<boolean>(false);





   async function createProdutoHandler(){
     const produtoDTO = new ProdutoDTO(nome, id_cor, id_marca, valor, imagem);

     try {
         const postResponse: AxiosResponse = await NodeAPI.post (
           `${process.env.REACT_APP_API_URL}/produto`, produtoDTO );
           console.log(postResponse);
           window.location.replace('/home')
     }catch(error){
          console.log(error);

     }

    

   } 

//useEffect(() => {
 
//} , []);*/






    
    return(
        <>
        
        
        <div 
           style={{
             backgroundColor: 'blue',
             height: '500px',
             display: 'flex',
             justifyContent: 'center',
             alignItems: 'center'
             }}
          > <div style={{backgroundColor: "green", justifyContent: 'start'}}> {<Navegacao />}</div>
            
             <div style={{ 
                        height: '90%', 
                        width: '45%', 
                        display: 'flex', 
                        justifyContent: 'center',
                        backgroundColor: 'red'
                        }}
                        >

                 <div style={{width: '100%'}}>
                    <div 
                      style={{
                        marginBottom: "15px",
                        width: '100%', 
                        display: 'flex',
                        justifyContent: "center",
                       }}
                        >

                        <TextField
                           onChange={(event) => setNome(event.target.value)}
                           label={'Nome do Produto'}
                           variant='outlined'
                               style={{ width: "50%", backgroundColor: 'white', }}             
                        /> 
                  </div>
                  
                   <div style={{marginBottom: "15px", 
                                display: 'flex',
                                justifyContent: "center"
                  
                  
                        }}
                         > 
                    <TextField
                     label={'Marca'}
                     type='number'
                     variant='outlined'
                    onChange={(event) => setIdmarca(Number(event.target.value))}
                       style={{ width: '50%', backgroundColor: 'white',}}             
                    /> 
                
             </div>
            <div style={{marginBottom: "15px",
                         display: 'flex',
                         justifyContent: "center"
                         }}
            >
                    <TextField
                      label={'Valor'}
                      variant='outlined'
                      type="Valor"
                      onChange={(event) => setValor(Number(event.target.value))}
                       style={{ width: "50%", backgroundColor: 'white',}}             
                    /> 
            </div>
            <div style={{marginBottom: "15px",
                         display: 'flex',
                         justifyContent: "center"
                         }}
            >
                    <TextField
                      label={'Cor'}
                      variant='outlined'
                      type="number"
                      onChange={(event) => setIdcor(Number(event.target.value))}
                       style={{ width: "50%", backgroundColor: 'white',}}             
                    /> 
            </div>
            <div>

            <label htmlFor="icon-button-file">
            <input accept="image/*" id="icon-button-file" type="file" />
                <IconButton color="primary" 
                            aria-label="upload picture" 
                            
                           component="span"
                           onChange={(event) => setImagem(event.target.value)}
                           
                           > 
                <AddPhotoAlternateIcon />
              </IconButton>
            </label>
                                        
            </div>

             <div style={{display: 'flex', justifyContent: 'center'}}>
                <Button 
                    variant={'contained'}
                    style= {{
                      height: '50px', 
                      width: '100px', }}
                     onClick={createProdutoHandler}
                >
                     {"Criar"}    
                </Button>
            </div>
            
            
            
           </div>


          </div>
          <Snackbar 
            anchorOrigin={{vertical:'top', horizontal: 'right'}}
            open={true}
            autoHideDuration={6000}
            onClose={()=>{}}
          >
             <Alert onClose={()=>{}} severity="success" sx={{ width: '100%' }}>
                This is a success message!
             </Alert>
          </Snackbar>
        </div>
   
    </>
     
   );
    
   
    
    
    
    
    
    
    
}
export default Adicionar_produto;





