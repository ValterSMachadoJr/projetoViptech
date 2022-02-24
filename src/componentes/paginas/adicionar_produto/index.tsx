import React, { useEffect, useRef, useState } from "react";
import "./add.css";
import TextField from "@mui/material/TextField";
import { Alert, Button, MenuItem, Snackbar } from "@mui/material";
import { AxiosResponse } from "axios";
import { NodeAPI } from "services/Service";
import { ProdutoDTO } from "dtos/ProdutoDTO";
import moment from "moment";
import "moment/locale/pt-br";
import { Link } from "react-router-dom";

export function AdicionarProduto() {
  const uploadfile: any = useRef();
  const [nome, setNome] = useState<string>("");
  const [cor, setCor] = useState<string>("");
  const [marca, setMarca] = useState<string>("");
  const [valor, setValor] = useState<Number>(0);
  const [imagem, setImagem] = useState<string>("");
  const [data_cadastro, SetDataCadastro] = useState<string>(
    moment().format("L")
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [severity, setSeverity] = useState<
    "success" | "info" | "warning" | "error"
  >("success");
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
  const [messageNameHasError, setMessageNameHasError] = useState<string>("");
  const [messageMarcaHasError, setMessageMarcaHasError] = useState<string>("");
  const [messageValorHasError, setMessageValorHasError] = useState<string>("");
  const [messageCorHasError, setMessageCorHasError] = useState<string>("");
  const [messageImagemHasError, setMessageImagemHasError] =
    useState<string>("");

  async function createProdutoHandler() {
    const isValidInputs = validateUserInputs();

    const produtoDTO = new ProdutoDTO(nome, cor, marca, valor, imagem);

    if (isValidInputs) {
      try {
        const postResponse: AxiosResponse = await NodeAPI.post(
          `${process.env.REACT_APP_API_URL}/produto`,
          produtoDTO
        );

        setFeedbackMessage("Produto cadastrado com sucesso!");
        setSeverity("success");
        setIsOpen(true);
        setNome("");
        setCor("");
        setMarca("");
        setValor(Number(""));
      } catch (error) {
        setFeedbackMessage("Produto não cadastrado!");
        setSeverity("error");
        setIsOpen(true);
      }
    }
  }
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

  useEffect(() => {
    setMessageImagemHasError("");
  }, [cor]);

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

    if (marca.length < 4) {
      setMessageMarcaHasError("Marca digitado está no formato inválido");

      isValid = false;
    }
    if (cor.length < 4) {
      setMessageCorHasError("Cor digitado está no formato inválido");

      isValid = false;
    }
    if (imagem.length < 4) {
      setMessageImagemHasError("Produto está sem imagem!");

      isValid = false;
    }

    return isValid;
  }

  return (
    <>
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
                <Link to="/addprodutos">Adicionar produto &gt; {""}</Link>
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
                    width: "35%",
                    display: "flex",
                    color: "red",
                    justifyContent: "center",
                  }}
                >
                  <p>
                    {messageNameHasError.length > 0 ? messageNameHasError : ""}
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
                  select
                  sx={{
                    "& .MuiOutlinedInput-root fieldset": {
                      borderColor:
                        messageMarcaHasError.length > 0 ? "red" : "grey",
                    },
                  }}
                  style={{ width: "55%", backgroundColor: "white" }}
                >
                  <MenuItem value={"Intelbrás"}>Intelbrás</MenuItem>
                  <MenuItem value={"Ikvision"}>Ikvision</MenuItem>
                </TextField>
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
                  label={"Valor"}
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root fieldset": {
                      borderColor:
                        messageValorHasError.length > 0 ? "red" : "grey",
                    },
                  }}
                  type="number"
                  value={valor === 0 ? "" : valor}
                  onChange={(event) => setValor(Number(event.target.value))}
                  style={{ width: "30%", backgroundColor: "white" }}
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
                  select
                  onChange={(event) => setCor(event.target.value)}
                  label="cor"
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root fieldset": {
                      borderColor:
                        messageCorHasError.length > 0 ? "red" : "grey",
                    },
                  }}
                  style={{ width: "30%", backgroundColor: "white" }}
                >
                  <MenuItem value={"Branco"}>Branco</MenuItem>
                  <MenuItem value={"Preto"}>Preto</MenuItem>
                  <MenuItem value={"Cinza"}>Cinza</MenuItem>
                </TextField>
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
                    {messageCorHasError.length > 0 ? messageCorHasError : ""}
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
                  value={data_cadastro}
                  disabled
                  onChange={(event) => SetDataCadastro(event.target.value)}
                  label={"Data Cadastro"}
                  variant="outlined"
                  style={{ width: "30%", backgroundColor: "white" }}
                />
              </div>

              <div>
                <div style={{ width: "100%", height: "150px" }}>
                  <input
                    ref={uploadfile}
                    style={{
                      display: "none",
                      objectFit: "cover",
                    }}
                    type="file"
                    accept="image/*"
                    max-file-size="1024"
                    onChange={handlefile}
                  />
                  {imagem && (
                    <img
                      style={{
                        width: "110px",
                        height: "130px",
                      }}
                      src={`data:image/png;base64,${imagem}`}
                      alt=""
                    />
                  )}

                  <Button onClick={openFileExplorer} variant="outlined">
                    Escoher Imagem
                  </Button>
                </div>
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
                    {messageImagemHasError.length > 0
                      ? messageImagemHasError
                      : ""}
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "start" }}>
                <Button
                  variant={"contained"}
                  style={{
                    height: "50px",
                    width: "300px",
                  }}
                  onClick={createProdutoHandler}
                >
                  {"Adicionar Produto"}
                </Button>
              </div>
            </div>
          </div>
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
        </div>
      </div>
    </>
  );
}
