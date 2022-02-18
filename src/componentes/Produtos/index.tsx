
import { Button, IconButton } from '@mui/material';
import Home from 'componentes/paginas/home';
import { ProdutoDTO } from 'dtos/ProdutoDTO';

import React, { useEffect, useState } from 'react'
import { NodeAPI } from 'services/Service';
import './produto.css';

type ProdutoProps = {
produtoDTO:ProdutoDTO;

}


export default function Produto (props:ProdutoProps) {
      const {produtoDTO} = props 
      
     






async function deletarProdutoById(){
     try {

 await NodeAPI.delete(`${process.env.REACT_APP_API_URL}/produto/${produtoDTO.id_produto}`);
       alert("produto excluido");
     
         } catch (erro){
              console.log(erro);
              
         }
     
     }


return (
         
         <>
         
         
         <section className='content-product' style={{padding: "50px"}}>
            <div className='img' >
                 <img className='img' src={"data:image/jpeg;base64," + produtoDTO.imagem} alt=''/>
            </div>


            <div className='details' style={{padding: "50px"}}> 
               <h2 className='camera'>{produtoDTO.nome}</h2>
               <p className='descricao'>{produtoDTO.id_marca} </p>
               <p className='valor'>{produtoDTO.valor}</p>
              <p className='cor'>{produtoDTO.id_cor}</p>
            </div>

        
          
            <div className="actions">

            
           <IconButton aria-label="carrinho"></IconButton>
           <Button variant="outlined"onClick={()=>{window.location.replace('/carrinho')}}><img src='carrinho8.png' alt="" />
            </Button>
            <IconButton aria-label="editar"></IconButton>
           <Button variant="outlined"onClick={()=>{window.location.replace('/editproduto/'+produtoDTO.id_produto)}}><img src='Edit.png' alt="" />
            </Button>
            <IconButton aria-label="delete"></IconButton>
           <Button variant="outlined"onClick={deletarProdutoById}>    
                        
              <img src='Delete.png' alt="" />
            </Button>


            </div>
           

        
           
           
           
        </section>



         
         
         </>
         )
      }
      
      
