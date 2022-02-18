import { TextField } from '@mui/material';
import { height } from '@mui/system';
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { NodeAPI } from 'services/Service';
import Navegacao from './navegacao';



export default function Carrinho() {


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
     

  
    return (
      <>
     <div>
      <div style={{display: 'flex'}}>
          <Navegacao/>
     </div>
       
       <div style={{display: 'flex',  flexDirection: 'row', padding: '5%'}} className='tela'>
           
          <div className='carrinho'>
              <h1>Carrinho</h1>
            
              <div><img alt='' style={{position: "absolute", zIndex: "100", backgroundColor: "blue"}}className='camera' src={`data:image/png;base,${imagem}`}></img></div>
              
               
                  <TextField
                          value = {`data:image/png;base,${imagem}`}
                          onChange={(event) => setNome(event.target.value)}
                          label={'Nome do Produto'}
                          variant='outlined'
                              style={{ width: "60%", backgroundColor: 'white', marginTop: "15px" }}             
               /> 

              <TextField
                    value={id_marca}
                    label={'Marca'}
                    type='number'
                    variant='outlined'
                    onChange={(event) => setIdmarca(Number(event.target.value))}
                      style={{ width: '60%', backgroundColor: 'white', marginTop: "15px"}}             
                   /> 

            

               <TextField
                    value={id_cor}
                      label={'Cor'}
                      variant='outlined'
                      type="number"
                      onChange={(event) => setIdcor(Number(event.target.value))}
                      style={{ width: "50%", backgroundColor: 'white', marginTop: "15px"}}             
                    /> 
              
                
              
              <div className='quantidade'>
               
                Quantidade

              </div>
              
          </div>
          <div className='resumo' style={{width: "50%"}}> 
              <h1> Resumo </h1>
              <p>Subtotal</p>
              <p>Frete</p>
              <p>Valor total</p>
              <button style={{width: "40px"}}>PAGAR</button>
          </div>
       </div>
    </div>  
  </>
    )
  

}
  
  