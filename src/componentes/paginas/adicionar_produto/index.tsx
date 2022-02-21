import React, { useRef, useState } from "react";
import "./add.css";
import TextField from "@mui/material/TextField";
import {
  Alert,
  Button,
  IconButton,
  Input,
  Snackbar,
  SvgIcon,
} from "@mui/material";
import { AxiosResponse } from "axios";
import { NodeAPI } from "services/Service";
import { ProdutoDTO } from "dtos/ProdutoDTO";
import Navegacao from "../navegacao";
import moment from "moment";
import "moment/locale/pt-br";
import { Link } from "react-router-dom";

export function AdicionarProduto() {
  const uploadfile: any = useRef();

  const [nome, setNome] = useState<string>("");
  const [id_cor, setIdcor] = useState<Number>(0);
  const [id_marca, setIdmarca] = useState<Number>(0);
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

  async function createProdutoHandler() {
    const produtoDTO = new ProdutoDTO(nome, id_cor, id_marca, valor, imagem);
    console.log(produtoDTO);
    try {
      const postResponse: AxiosResponse = await NodeAPI.post(
        `${process.env.REACT_APP_API_URL}/produto`,
        produtoDTO
      );

      setFeedbackMessage("Produto cadastrado com sucesso!");
      setSeverity("success");
      setIsOpen(true);
      setNome("");
      setIdcor(Number(""));
      setIdmarca(Number(""));
      setValor(Number(""));

      console.log(postResponse);
      // window.location.replace("/home");
    } catch (error) {
      setFeedbackMessage("Produto não cadastrado!");
      setSeverity("error");
      setIsOpen(true);
      console.log(error);
    }
  }

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
                  //  value={currency}
                  // value: moment().format('l');
                  label={"Valor"}
                  variant="outlined"
                  type="number"
                  onChange={(event) => setValor(Number(event.target.value))}
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
                  value={id_cor}
                  label={"Cor"}
                  variant="outlined"
                  type="number"
                  onChange={(event) => setIdcor(Number(event.target.value))}
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
                  value={data_cadastro}
                  disabled
                  onChange={(event) => SetDataCadastro(event.target.value)}
                  label={"Data Cadastro"}
                  variant="outlined"
                  style={{ width: "70%", backgroundColor: "white" }}
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
                  <img
                    src={`data:image/png;base64,${imagem}`}
                    alt=""
                    style={{
                      width: "110px",
                      height: "130px",
                    }}
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
