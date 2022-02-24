import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Carrinho from "./paginas/carrinho/index";
import { AdicionarProduto } from "./paginas/adicionar_produto";
import { EditarProduto } from "./paginas/editarProduto";

import Home from "./paginas/home/index";

const CustomRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route index element={<Home />} />
      <Route path="/addprodutos" element={<AdicionarProduto />} />
      <Route path="/editproduto/:id_produto" element={<EditarProduto />} />
      <Route path="/editproduto" element={<EditarProduto />} />
      <Route path="/carrinho/:id_produto" element={<Carrinho />} />
      <Route path="/carrinho" element={<Carrinho />} />
    </Routes>
  );
};

export default CustomRoutes;
