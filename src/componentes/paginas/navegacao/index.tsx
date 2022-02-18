import React from "react";
//import Produto from "../../Produtos/index"
//import "./home.css"
import { Link } from "react-router-dom";
//import Navegacao from "../containernaveg/navegacao"

//import Img_produto from "../../Img_produto"

function Navegacao() {
  return (
    <>
      <div>
        <nav className="navegacao">
          <Link to="/home">Home &gt; </Link>
          <Link to="/addprodutos">Adicionar produto &gt; {""}</Link>
          <Link to="/editproduto">Editar produto &gt; {""}</Link>
          <Link to="/carrinho">Carrinho &gt;{""} </Link>
        </nav>
      </div>
    </>
  );
}
export default Navegacao;
