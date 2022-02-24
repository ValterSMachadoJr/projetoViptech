import { Button, CircularProgress, IconButton } from "@mui/material";
import { AxiosResponse } from "axios";
import { ProdutoDTO } from "dtos/ProdutoDTO";
import React, { useEffect, useState } from "react";
import { NodeAPI } from "services/Service";
import "./produto.css";

type ProdutoProps = {
  produtoDTO: ProdutoDTO;
};

export default function Produto(props: ProdutoProps) {
  const { produtoDTO } = props;

  async function deletarProdutoById() {
    try {
      await NodeAPI.delete(
        `${process.env.REACT_APP_API_URL}/produto/${produtoDTO.id_produto}`
      );
      alert("Produto Excluído");
      window.location.replace("/home");
    } catch (erro) {
      console.log(erro);
    }
  }

  return (
    <>
      <section
        className="content-product"
        style={{ padding: "10px", height: "10%" }}
      >
        <div
          className="img"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            className="img"
            src={"data:image/jpeg;base64," + produtoDTO.imagem}
            alt=""
          />
        </div>

        <div className="details" style={{ padding: "40px", height: "40%" }}>
          <div className="camera"> {produtoDTO.nome}</div>
          <div className="marca">{produtoDTO.marca} </div>

          <div className="valor">{produtoDTO.valor}</div>
          <div className="cor">{produtoDTO.cor} </div>
        </div>

        <div className="actions">
          <IconButton aria-label="carrinho"></IconButton>
          <Button
            variant="outlined"
            onClick={() => {
              window.location.replace("/carrinho/" + produtoDTO.id_produto);
            }}
          >
            <img src="carrinho8.png" alt="" />
          </Button>
          <IconButton aria-label="editar"></IconButton>
          <Button
            variant="outlined"
            onClick={() => {
              window.location.replace("/editproduto/" + produtoDTO.id_produto);
            }}
          >
            <img src="Edit.png" alt="" />
          </Button>
          <IconButton aria-label="delete"></IconButton>
          <Button variant="outlined" onClick={deletarProdutoById}>
            <img src="Delete.png" alt="" />
          </Button>
        </div>
      </section>
    </>
  );
}
