import React from "react";
import { Link } from "react-router-dom";

function Navegacao() {
  return (
    <>
      <div>
        <nav className="navegacao">
          <Link to="/home">Home &gt; </Link>
          <Link to="/addprodutos">Adicionar produto &gt; {""}</Link>
          <Link to="/editproduto">Editar produto &gt; {""}</Link>
          <Link to="/carrinho?">Carrinho &gt; {""} </Link>
        </nav>
      </div>
    </>
  );
}
export default Navegacao;
