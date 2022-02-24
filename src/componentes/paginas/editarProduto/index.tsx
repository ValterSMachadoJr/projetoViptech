import React, { useEffect, useRef, useState } from "react";

import TextField from "@mui/material/TextField";
import {
  Alert,
  Button,
  CircularProgress,
  IconButton,
  Input,
  MenuItem,
  Snackbar,
  SvgIcon,
} from "@mui/material";

import { AxiosResponse } from "axios";
import { NodeAPI } from "services/Service";
import { ProdutoDTO } from "dtos/ProdutoDTO";

import { Link, useNavigate, useParams } from "react-router-dom";

export function EditarProduto() {
  const uploadfile: any = useRef();

  const [nome, setNome] = useState<string>("");

  const [cor, setCor] = useState<string>("");
  const [marca, setMarca] = useState<string>("");
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
  const [messageValorHasError, setMessageValorHasError] = useState<string>("");
  const [messageMarcaHasError, setMessageMarcaHasError] = useState<string>("");
  const [messageCorHasError, setMessageCorHasError] = useState<string>("");

  async function EditarprodutoById() {
    const isValidInputs = validateUserInputs();

    const editarProduto = new ProdutoDTO(
      nome,
      cor,
      marca,
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
        setCor("");
        setMarca("");
        setValor(Number(""));
      } catch (error) {
        setFeedbackMessage("Produto não alterado !");
        setSeverity("error");
        setIsOpen(true);
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
      setCor(resposta.data.cor);
      setMarca(resposta.data.marca);
      setValor(resposta.data.valor);

      setImagem(resposta.data.imagem);
    } catch (erro) {
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

  useEffect(() => {
    setMessageMarcaHasError("");
  }, [marca]);

  useEffect(() => {
    setMessageCorHasError("");
  }, [cor]);

  function closeSnackbar() {
    setIsOpen(false);
  }

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
    if (marca.length < 4 || marca.length === 0) {
      setMessageMarcaHasError("Marca digitado está no formato inválido");

      isValid = false;
    }
    if (cor.length < 4) {
      setMessageCorHasError("Cor digitado está no formato inválido");

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
                    style={{ width: "65%", backgroundColor: "white" }}
                  />

                  <div
                    style={{
                      marginTop: "-15px",
                      marginLeft: "120px",
                      width: "35%",
                      display: "flex",
                      color: "red",
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
                    value={marca}
                    onChange={(event) => setMarca(event.target.value)}
                    label="Marca"
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root fieldset": {
                        borderColor:
                          messageMarcaHasError.length > 0 ? "red" : "grey",
                      },
                    }}
                    style={{ width: "55%", backgroundColor: "white" }}
                  ></TextField>
                  <div
                    style={{
                      marginTop: "-15px",
                      marginLeft: "120px",
                      width: "35%",
                      display: "flex",
                      color: "red",
                      justifyContent: "center",
                    }}
                  >
                    <p>
                      {messageMarcaHasError.length > 0
                        ? messageMarcaHasError
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
                    style={{ width: "30%", backgroundColor: "white" }}
                  />

                  <div
                    style={{
                      marginTop: "-15px",
                      width: "35%",
                      display: "flex",
                      color: "red",
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
                    value={cor}
                    label={"Cor"}
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root fieldset": {
                        borderColor:
                          messageCorHasError.length > 0 ? "red" : "grey",
                      },
                    }}
                    onChange={(event) => setCor(event.target.value)}
                    style={{ width: "30%", backgroundColor: "white" }}
                  />
                  <div
                    style={{
                      marginTop: "-15px",
                      width: "35%",
                      display: "flex",
                      color: "red",
                      justifyContent: "center",
                    }}
                  >
                    <p>
                      {messageCorHasError.length > 0 ? messageCorHasError : ""}
                    </p>
                  </div>
                </div>

                <div>
                  <Button onClick={openFileExplorer} variant="outlined">
                    Escolher Imagem
                  </Button>
                  <div style={{ width: "100%", height: "150px" }}>
                    <input
                      ref={uploadfile}
                      style={{ display: "none" }}
                      type="file"
                      onChange={handlefile}
                      accept="image/*"
                      max-file-size="1024"
                    />
                    <img
                      src={`data:image/png;base64,${imagem}`}
                      alt=""
                      style={{ objectFit: "cover" }}
                    />
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
