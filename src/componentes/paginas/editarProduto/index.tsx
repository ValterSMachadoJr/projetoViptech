import React, { useEffect, useRef, useState } from "react";

import TextField from "@mui/material/TextField";
import {
  Alert,
  Button,
  CircularProgress,
  IconButton,
  Input,
  Snackbar,
  SvgIcon,
} from "@mui/material";

import { AxiosResponse } from "axios";
import { NodeAPI } from "services/Service";
import { ProdutoDTO } from "dtos/ProdutoDTO";
import Navegacao from "../navegacao";
import { Link, useNavigate, useParams } from "react-router-dom";

export function EditarProduto() {
  const uploadfile: any = useRef();
  // const navigate = useNavigate(); nao estou retornando para o página home

  const [nome, setNome] = useState<string>("");

  const [id_cor, setIdcor] = useState<Number>(0);
  const [id_marca, setIdmarca] = useState<Number>(0);
  const [valor, setValor] = useState<Number>(0);
  const [imagem, setImagem] = useState<string>("");

  const { id_produto } = useParams();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [severity, setSeverity] = useState<
    "success" | "info" | "warning" | "error"
  >("success");
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");

  const [messageNameHasError, setMessageNameHasError] = useState<string>("");
  const [messageValorHasError, setMessageValorHasError] = useState<string>();

  async function EditarprodutoById() {
    const isValidInputs = validateUserInputs();

    const editarProduto = new ProdutoDTO(
      nome,
      id_cor,
      id_marca,
      valor,
      imagem,
      Number(id_produto)
    );

    if (isValidInputs) {
      try {
        await NodeAPI.put(
          `${process.env.REACT_APP_API_URL}/produto/${id_produto}`,
          editarProduto
        );

        setFeedbackMessage("Produto alterado com sucesso!");
        setSeverity("success");
        setIsOpen(true);
        setNome("");
        setIdcor(Number(""));
        setIdmarca(Number(""));
        setValor(Number(""));
        //       navigate('/home') voltaria a página home

        //  window.location.replace('/home')
      } catch (error) {
        setFeedbackMessage("Produto não alterado !");
        setSeverity("error");
        setIsOpen(true);
        console.log();
        console.log(error);
      }
    }
  }

  async function getProdutoById() {
    setIsloading(true);
    try {
      const resposta = await NodeAPI.get(
        `${process.env.REACT_APP_API_URL}/produto/${id_produto}`
      );
      setNome(resposta.data.nome);
      setIdcor(resposta.data.id_cor);
      setIdmarca(resposta.data.id_marca);
      setValor(resposta.data.valor);
      console.log(resposta);
      //  setImagem(resposta.data.(`${"data:image/jpeg;base64,"} + ${imagem}`)
      setImagem(resposta.data.imagem);
    } catch (erro) {
      console.log(erro);
    } finally {
      setIsloading(false);
    }
  }

  useEffect(() => {
    getProdutoById();
  }, []);

  useEffect(() => {
    setMessageNameHasError("");
  }, [nome]);

  useEffect(() => {
    setMessageValorHasError("");
  }, [valor]);

  function closeSnackbar() {
    setIsOpen(false);
  }

  //botao uploud
  function openFileExplorer() {
    uploadfile.current.click();
  }

  function handlefile(event: any) {
    parseFileBase64(event.target.files[0]);
  }

  function parseFileBase64(file: File) {
    file.text().then(() => {
      let reader: FileReader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const document: string | ArrayBuffer | null = reader.result;
        if (typeof document === "string") {
          setImagem(
            document.slice(document.lastIndexOf(",") + 1, document.length)
          );
          console.log(
            document.slice(document.lastIndexOf(",") + 1, document.length)
          );
        }
      };
    });
  }

  function validateUserInputs(): boolean {
    let isValid = true;
    if (nome.length < 4 || !nome.includes(" ")) {
      setMessageNameHasError("Nome digitado está no formato inválido");
      isValid = false;
    }

    if (valor === 0 || valor < 0) {
      setMessageValorHasError("Valor digitado está no formato inválido");
      isValid = false;
    }

    return isValid;
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
            style={{
              height: "500px",
              display: "flex",
              justifyContent: "left",
              alignItems: "left",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                justifyContent: "start",
                marginBottom: "15px",
              }}
            >
              <div>
                <nav className="navegacao">
                  <Link to="/home">Home &gt; </Link>
                  <Link to="/editproduto">Editar Produto &gt; {""}</Link>
                </nav>
              </div>
            </div>

            <div
              style={{
                height: "90%",
                width: "45%",
                display: "flex",
                justifyContent: "start",
              }}
            >
              <div style={{ width: "100%" }}>
                <div
                  style={{
                    marginBottom: "15px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "start",
                  }}
                >
                  <TextField
                    value={nome}
                    onChange={(event) => setNome(event.target.value)}
                    label={"Nome do Produto"}
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root fieldset": {
                        borderColor:
                          messageNameHasError.length > 0 ? "red" : "grey",
                      },
                    }}
                    style={{ width: "70%", backgroundColor: "white" }}
                  />

                  <div
                    style={{
                      marginTop: "-15px",
                      marginLeft: "120px",
                      width: "70%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <p>
                      {messageNameHasError.length > 0
                        ? messageNameHasError
                        : ""}
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    marginBottom: "15px",
                    display: "flex",
                    justifyContent: "start",
                  }}
                >
                  <TextField
                    value={id_marca}
                    label={"Marca"}
                    type="number"
                    variant="outlined"
                    onChange={(event) => setIdmarca(Number(event.target.value))}
                    style={{ width: "70%", backgroundColor: "white" }}
                  />
                </div>
                <div
                  style={{
                    marginBottom: "15px",
                    display: "flex",
                    justifyContent: "start",
                  }}
                >
                  <TextField
                    value={valor}
                    label={"Valor"}
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root fieldset": {
                        borderColor:
                          messageValorHasError.length > 0 ? "red" : "grey",
                      },
                    }}
                    type="number"
                    onChange={(event) => setValor(Number(event.target.value))}
                    style={{ width: "70%", backgroundColor: "white" }}
                  />

                  <div
                    style={{
                      marginTop: "-15px",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <p>
                      {messageValorHasError.length > 0
                        ? messageValorHasError
                        : ""}
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    marginBottom: "15px",
                    display: "flex",
                    justifyContent: "start",
                  }}
                >
                  <TextField
                    value={id_cor}
                    label={"Cor"}
                    variant="outlined"
                    type="number"
                    onChange={(event) => setIdcor(Number(event.target.value))}
                    style={{ width: "70%", backgroundColor: "white" }}
                  />
                </div>

                <div>
                  <div style={{ width: "100%", height: "150px" }}>
                    <input
                      ref={uploadfile}
                      style={{ display: "none" }}
                      type="file"
                      onChange={handlefile}
                    />
                    <img
                      src={`data:image/png;base64,${imagem}`}
                      alt=""
                      style={{ objectFit: "cover" }}
                    />
                    <Button onClick={openFileExplorer} variant="outlined">
                      Abrir explorer
                    </Button>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "start" }}>
                  <Button
                    variant={"contained"}
                    style={{
                      height: "50px",
                      width: "300px",
                    }}
                    onClick={EditarprodutoById}
                  >
                    {"SALVAR PRODUTO"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
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
