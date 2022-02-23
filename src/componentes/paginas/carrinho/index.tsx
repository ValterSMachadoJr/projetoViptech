import { Button, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { NodeAPI } from "services/Service";

// função para calcular as notas

export default function Carrinho() {
  const uploadfile: any = useRef();
  // const navigate = useNavigate(); nao estou retornando para o página home
  const [mostrarnotas, setMostrarNotas] = useState<boolean>(false);

  const [nome, setNome] = useState<string>("");
  const [id_cor, setIdcor] = useState<Number>(0);
  const [id_marca, setIdmarca] = useState<Number>(0);
  const [valor, setValor] = useState<number>(0);
  const [texto, setTexto] = useState<string>("");

  const [imagem, setImagem] = useState<string>("");
  const [contador, setContador] = useState<number>(1);

  const { id_produto } = useParams();

  async function getProdutoById() {
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
    }
  }

  const frete = Number(valor / 10);
  const Frete = Number(frete.toFixed(2));
  const valorTotal = Number(Frete + valor);
  const ValorTotal = Number(valorTotal.toFixed(2));
  //const subTotal: Number = Number(setContador * valor);

  useEffect(() => {
    getProdutoById();
  }, []);

  function calculaNotas(valor: number) {
    setMostrarNotas(true);
    var notas = [100, 50, 10, 5, 1];
    var texto = "";
    for (var x = 0; x < notas.length; x++) {
      if (valor >= notas[x]) {
        var div = Math.floor(valor / notas[x]);
        texto += div + "  Nota(s) de: " + notas[x] + "  \n  " + " = ";
        valor -= div * notas[x];
      }
    }
    setTexto(texto);
    console.log(texto);
    return texto;
  }

  return (
    <>
      <div>
        <div>
          <nav className="navegacao">
            <Link to="/home">Home &gt; </Link>
            <Link to="/carrinho">Carrinho &gt; {""}</Link>
          </nav>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "5%",
            fontFamily: "Raleway",
            width: "100%",
          }}
          className="tela"
        >
          <div className="carrinho" style={{ width: "60%" }}>
            <h1>Carrinho</h1>
            <div
              style={{
                padding: "3%",
                border: "1px solid #B2B2B2",
                borderRadius: "5px",
              }}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div>
                  <img
                    alt=""
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                    className="camera"
                    src={`data:image/png;base64,${imagem}`}
                  ></img>
                </div>
                <div
                  style={{
                    paddingLeft: "3%",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <span style={{ fontWeight: "bold" }}>{nome}</span>

                  <span>{id_cor}</span>

                  <span>{id_marca}</span>
                </div>
              </div>
              <div>
                <hr></hr>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div className="quantidade">
                  Quantidade
                  <Button
                    onClick={() => {
                      if (contador > 1) setContador(contador - 1);
                    }}
                  >
                    <svg
                      width="32"
                      height="33"
                      viewBox="0 0 32 33"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9 18.5V15.5H23V18.5H9Z" fill="#353535" />
                      <circle cx="16" cy="16.5" r="15.5" stroke="#353535" />
                    </svg>
                  </Button>
                  <TextField value={contador}></TextField>
                  <Button
                    onClick={() => {
                      setContador(contador + 1);
                    }}
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17 17.5V23.5H15V17.5H9V15.5H15V9.5H17V15.5H23V17.5H17Z"
                        fill="#353535"
                      />
                      <circle cx="16" cy="16" r="15.5" stroke="#353535" />
                    </svg>
                  </Button>
                </div>

                <div
                  style={{
                    backgroundColor: "yellow",
                    width: "124px",
                    height: "28px",
                  }}
                >
                  <span>{valor}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="resumo" style={{ width: "40%", paddingLeft: "3%" }}>
            <h1> Resumo do Pedido</h1>
            <div
              style={{
                width: "50%",
                borderRadius: "3px",
                background: "#F5F5F5",
              }}
            >
              <div style={{ padding: "3% 3% 0% 3%" }}>
                <div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p>Subtotal </p>
                    <h5> {`R$ ${valor}`}</h5>
                  </div>
                  <hr></hr>
                </div>
                <div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p>Frete </p>
                    <h5>{`R$ ${Frete}`}</h5>
                  </div>
                  <hr></hr>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>Valor total </p>
                  <h4>{`R$ ${ValorTotal}`}</h4>
                </div>
                <button
                  className="valorTotal"
                  onClick={(event) => {
                    calculaNotas(ValorTotal);
                  }}
                  style={{
                    width: "100%",
                    height: "55px",
                    backgroundColor: "#0F4C81",
                    color: "white",
                    fontWeight: "bold",
                    borderRadius: "7px",
                  }}
                >
                  <p></p>
                  PAGAR
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {mostrarnotas && (
            <div
              className="teste2"
              style={{
                display: "flex",
                backgroundColor: "yellow",
                border: "1px solid #B2B2B2",
                borderRadius: "5px",
                width: "50%",
                color: "red",
                justifyContent: "center",
              }}
            >
              <h3>{texto}</h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
