import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Adicionar_produto from "./paginas/adicionar_produto/index"
import EditarProduto from "./paginas/editar_produto";
import Home from "./paginas/home/index";
//import Sobre from "./adicionar produto";
//import Usuario from "./Usuario";

//'{ exact: true; path: string; element: Element; }

const CustomRoutes = () => {
   return(
      //<BrowserRouter>
         <Routes>
         { /* <Route path="/" element={<>{"Projeto React"}</>} /> */ }
          <Route path="/home" element={<Home />} />
          <Route index element={<Home/>} />
          <Route path="/addprodutos" element={<Adicionar_produto/>}/>
          <Route path="/editproduto" element={<EditarProduto/>}/>
         
         </Routes>
    // </BrowserRouter> 
   )
}

export default CustomRoutes;