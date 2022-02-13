import React from 'react'
import './produto.css';



function Produto (props) {
      const {img,nome, marca, valor, cor, img2} = props  
      return (
         
         <>
         <div> <li className='lista'> <img className='img' src={img} alt=''/> <div className='descricao'><h2 className='nome'>{nome}</h2>  {marca} <h1>{valor}</h1>  {cor}</div><div> <img className='img2' src={img2} alt=''/></div>  </li></div>       
         </>
         )
      }
      
      export default Produto
