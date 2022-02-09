import React from 'react'
import './produto.css';



function Produto (props) {
   
   
   const produtos=[ 
      
      /*{Imagem:  {img},*/ {img: 'imagens/img2.png', nome: "Câmera interna inteligente Wi-Fi Full HD iM3", marca: "Intelbras", valor: "R$ 300,00", cor: "Cor: Branco", img2: "edit.png"  },
      /* {Imagem: {IM3},*/  {img:  'IM3.png', nome: "Câmera DS-2CD 2583G2-I", marca: "Hikvision", valor: "R$ 645,00", cor: "Cor: Branco", img2: "edit.png" },
      {img: 'IM4.png', nome: "Câmera interna inteligente Wi-Fi Full HD iM4", marca: "Intelbras", valor: "R$ 349,00", cor: "Cor: Branco", img2: "delete.png"}
   ]
   const listaProdutos = produtos.map(
      (p, i) =>
      <li className='lista' key={i}> <img className='img' src={p.img} alt=''/> <div className='descricao'><h2 className='nome'>{p.nome}</h2>  {p.marca} <h1>{p.valor}</h1>  {p.cor}</div><div> <img className='img2' src={p.img2} alt=''/></div>  </li>
      
      
      )
      return (
         
         <>
         
         <div className='subheader'>
          <h1 className='P'>Produto</h1>
          <button className='Add'> Adicionar Produto </button>
         </div>
         
         <div>{listaProdutos}</div>       
         </>
         )
      }
      
      export default Produto