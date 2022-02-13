import { AxiosResponse } from "axios"
import React, { useEffect, useState } from "react"
import { NodeAPI } from "services/Service"
import Produto from "../../Produtos/index"
import "./home.css"
//import Navegacao from "../navegacao"

//import Img_produto from "../../Img_produto"



function Home (){

  const [produtos, setProdutos] = useState<Array<any>>([])

  useEffect (()=> {
   const getProduto = async () => {
    try {
      const postResponse: AxiosResponse = await NodeAPI.get (
        `${process.env.REACT_APP_API_URL}/produto` );
        setProdutos(postResponse.data)
  }catch(error){
       console.log(error);

  }

  
   }
   getProduto();
  },[])
  
  console.log(produtos)

  return (
    <>
    <div>
    <div className='subheader'>
          <h1 className='P'>Produto</h1>
          <button className='Add' onClick={()=>{window.location.replace('/addprodutos')}}> Adicionar Produto </button>
         </div>
       {produtos.map(it => <Produto nome={it.nome} marca={it.id_marca} />)}
    
    {/*      <Img_produto/> */}
    </div>
    </>
    )
    
  }
  export default Home;