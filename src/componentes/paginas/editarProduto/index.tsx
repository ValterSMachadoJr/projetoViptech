import React, { useEffect, useRef, useState } from "react";

import TextField from '@mui/material/TextField';
import { Alert, Button, IconButton, Input, Snackbar, SvgIcon } from "@mui/material";

import { AxiosResponse } from "axios";
import { NodeAPI } from "services/Service";
import { ProdutoDTO } from "dtos/ProdutoDTO";
import Navegacao from "../navegacao";
import { useNavigate, useParams } from "react-router-dom";



export function EditarProduto (){

   
   const uploadfile:any = useRef();  
  // const navigate = useNavigate(); nao estou retornando para o página home

    const [nome, setNome] = useState<string>('');
    const [id_cor, setIdcor] = useState<Number>(0);
    const [id_marca, setIdmarca] = useState<Number>(0);
    const [valor, setValor] = useState<Number>(0);
    const [imagem, setImagem] = useState<string>('');

    const {id_produto} = useParams();
    

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [severity, setSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
    const [feedbackMessage, setFeedbackMessage] = useState<string>('');



async function EditarprodutoById(){

     const editarProduto = new ProdutoDTO(nome, id_cor, id_marca, valor, imagem, Number(id_produto));
       
     try {
         await NodeAPI.put(
           `${process.env.REACT_APP_API_URL}/produto/${id_produto}`,
           editarProduto);

           setFeedbackMessage("Produto alterado com sucesso!")
           setSeverity('success')
           setIsOpen(true)
           setNome('')
           setIdcor(Number(''))
           setIdmarca(Number(''))
           setValor(Number(''))
    //       navigate('/home') voltaria a página home


           
         //  window.location.replace('/home')
     }catch(error){
      setFeedbackMessage("Produto nao alterado !")
      setSeverity('error');
      setIsOpen(true);
      console.log(error);
     }
 } 




async function getProdutoById(){
    try {
      const resposta = await NodeAPI.get(`${process.env.REACT_APP_API_URL}/produto/${id_produto}`);
      setNome(resposta.data.nome)
      setIdcor(resposta.data.id_cor)
      setIdmarca(resposta.data.id_marca)
      setValor(resposta.data.valor)
      console.log(resposta)
    //  setImagem(resposta.data.(`${"data:image/jpeg;base64,"} + ${imagem}`)
      setImagem(resposta.data.imagem)
    } catch (erro){
         console.log(erro);

    }

}


useEffect(() => {
   getProdutoById();
 }, []);




   function closeSnackbar(){
      setIsOpen(false)
    }
   
//botao uploud
function openFileExplorer (){
    uploadfile.current.click();
      }


  function handlefile(event: any){
        parseFileBase64(event.target.files[0])
        
    }

  function parseFileBase64(file: File){
        file.text().then(()=> {
            let reader: FileReader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                const document: string | ArrayBuffer | null = reader.result;
                  if (typeof document === 'string'){
                  setImagem(
                    document.slice(document.lastIndexOf(',') +1, document.length)
                    );
                console.log(
                document.slice(document.lastIndexOf(',') +1, document.length)
                );
              }
            };
        });
   }

 






return(
          
      <>
      
          <div> 
          
          <div 
          style={{
            
            height: '500px',
            display: 'flex',
            justifyContent: 'left',
            alignItems: 'left',
            flexDirection: 'column',
            
            }}
          >
              <div style={{
                          justifyContent: 'start',
                          marginBottom: "15px", 
                          }}> {<Navegacao />}</div>
            
            <div style={{ 
                        height: '90%', 
                        width: '45%', 
                        display: 'flex', 
                        justifyContent: 'start',
                        
                        }}
                        >

                <div style={{width: '100%'}}>
                    <div 
                      style={{
                        marginBottom: "15px",
                        width: '100%', 
                        display: 'flex',
                        justifyContent: "start",
                      }}
                        >

                        <TextField
                          value = {nome}
                          onChange={(event) => setNome(event.target.value)}
                          label={'Nome do Produto'}
                          variant='outlined'
                              style={{ width: "70%", backgroundColor: 'white', }}             
                        /> 
                  </div>
                  
                  <div style={{marginBottom: "15px", 
                                display: 'flex',
                                justifyContent: "start"
                  
                  
                        }}
                        > 
                    <TextField
                    value={id_marca}
                    label={'Marca'}
                    type='number'
                    variant='outlined'
                    onChange={(event) => setIdmarca(Number(event.target.value))}
                      style={{ width: '70%', backgroundColor: 'white',}}             
                    /> 
                
            </div>
            <div style={{marginBottom: "15px",
                        display: 'flex',
                        justifyContent: "start"
                        }}
            >
                    <TextField
                      value={valor}
                      label={'Valor'}
                      variant='outlined'
                      type="number"
                      onChange={(event) => setValor(Number(event.target.value))}
                      style={{ width: "70%", backgroundColor: 'white',}}             
                    /> 
            </div>
            <div style={{marginBottom: "15px",
                        display: 'flex',
                        justifyContent: "start"
                        }}
            >
                    <TextField
                    value={id_cor}
                      label={'Cor'}
                      variant='outlined'
                      type="number"
                      onChange={(event) => setIdcor(Number(event.target.value))}
                      style={{ width: "70%", backgroundColor: 'white',}}             
                    /> 
            </div>

            <div>
               <TextField   
                value={imagem}
                label={'imagem'}
                variant="outlined"
              

                />
            </div>






            <div>

              <div style={
                {width:"100%", height: '150px'}}>
                <input  
                ref={uploadfile} 
                style={{display: "none"}}
                type="file" 
                onChange={handlefile}
                
               />
                 <img src={`data:image/png;base64,${imagem}`} alt="" /> 
              <Button onClick={openFileExplorer} variant='outlined'>
                      Abrir explorer
              </Button>
              </div>
                                        
            </div>

            <div style={{display: 'flex', justifyContent: 'start'}}>
                <Button 
                    variant={'contained'}
                    style= {{
                      height: '50px', 
                      width: '300px', }}
                    onClick={EditarprodutoById}
                   
                >
                    {"SALVAR PRODUTO"}    
                </Button>
            </div>
            
                   
          </div>


          </div>
          <Snackbar 
            anchorOrigin={{vertical:'top', horizontal: 'right'}}
            open={isOpen}
            autoHideDuration={6000}
            onClose={closeSnackbar}
          >
            <Alert onClose={closeSnackbar}
              severity={severity}
              sx={{ width: '100%' }}>
                  {feedbackMessage}
            </Alert>
          </Snackbar>
        </div>
  
          
          </div>
      
        
    </>
    
  );
}






