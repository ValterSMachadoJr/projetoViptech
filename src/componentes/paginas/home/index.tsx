import { Alert, Button, CircularProgress, Snackbar } from "@mui/material";
import { AxiosResponse } from "axios";
import { ProdutoDTO } from "dtos/ProdutoDTO";
import React, { useEffect, useState } from "react";
import { NodeAPI } from "services/Service";
import Produto from "../../Produtos/index";
import "./home.css";

function Home() {
  const [produtos, setProdutos] = useState<Array<ProdutoDTO>>([]);
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [severity, setSeverity] = useState<
    "success" | "info" | "warning" | "error"
  >("success");
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");

  useEffect(() => {
    const getProduto = async () => {
      setIsloading(true);
      try {
        const getResponse: AxiosResponse = await NodeAPI.get(
          `${process.env.REACT_APP_API_URL}/produto`
        );
        setProdutos(getResponse.data);
        setSeverity("success");
        setFeedbackMessage("Lista de produtos carregados com sucesso!");
        console.log(getResponse.data);
      } catch (error) {
        console.log(error);
        setSeverity("error");
        setFeedbackMessage("Não foi possível buscar os produtos");
        setIsOpen(true);
      } finally {
        setIsloading(false);
      }
    };

    getProduto();
  }, []);

  console.log(produtos);

  function closeSnackbar() {
    setIsOpen(false);
  }

  return (
    <>
      {isLoading === true ? (
        <div
          style={{
            height: "800px",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <div>
          <div
            style={{ display: "flex", justifyContent: "space-around" }}
            className="subheader"
          >
            <h1 className="P">Produto</h1>

            <Button
              style={{
                marginTop: "10px",
                backgroundColor: "#0F4C81",
                color: "white",
              }}
              variant="contained"
              onClick={() => {
                window.location.replace("/addprodutos");
              }}
            >
              Adicionar Produto
            </Button>
          </div>
          {produtos.map((it, index) => (
            <Produto key={index} produtoDTO={it} />
          ))}
        </div>
      )}

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={isOpen}
        autoHideDuration={6000}
        onClose={closeSnackbar}
      >
        <Alert
          onClose={closeSnackbar}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {feedbackMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Home;
