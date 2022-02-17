import { Button, IconButton } from '@mui/material';
import { ProdutoDTO } from 'dtos/ProdutoDTO';

import React from 'react'
import './produto.css';

type ProdutoProps = {
produtoDTO:ProdutoDTO;

}


export default function Produto (props:ProdutoProps) {
      const {produtoDTO} = props 
      
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

            
           <IconButton aria-label="editar produto"></IconButton>
           <Button variant="outlined"onClick={()=>{window.location.replace('/editproduto/'+produtoDTO.id_produto)}}><img src='Edit.png' alt="" />
            </Button>
            <IconButton aria-label="delete"></IconButton>
           <Button variant="outlined"onClick={()=>{window.location.replace('/editar_produto')}}><img src='carrinho1' alt="" />
            </Button>
            <IconButton aria-label="delete"></IconButton>
           <Button variant="outlined"onClick={()=>{window.location.replace('/deletarproduto')}}><img src='Delete.png' alt="" />
            </Button>


            </div>
           

        
           
           
           
        </section>



         
         
         </>
         )
      }
      
      
