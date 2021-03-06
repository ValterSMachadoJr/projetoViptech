import { Button, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { NodeAPI } from "services/Service";

export default function Carrinho() {
  const [mostrarnotas, setMostrarNotas] = useState<boolean>(false);
  const [nome, setNome] = useState<string>("");
  const [cor, setCor] = useState<string>("");
  const [marca, setMarca] = useState<string>("");
  const [valor, setValor] = useState<number>(0);
  const [pagamento, setPagamento] = useState<string>("");
  const [imagem, setImagem] = useState<string>("");
  const [contador, setContador] = useState<number>(1);
  const { id_produto } = useParams();

  const CalculaSubTotal = valor * contador;
  const frete = Number(CalculaSubTotal / 10);
  const Frete = Number(frete.toFixed(2));
  const valorTotal = Number(Frete + CalculaSubTotal);
  const ValorTotal = Number(valorTotal.toFixed(2));
  const calculaSubTotalDuascasas = CalculaSubTotal.toFixed(2);

  async function getProdutoById() {
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
      console.log(erro);
    }
  }

  useEffect(() => {
    getProdutoById();
  }, []);

  function calculaNotas(valor: number) {
    setMostrarNotas(true);
    var notas = [100, 50, 10, 5, 1];
    var mensagem = "";
    for (var x = 0; x < notas.length; x++) {
      if (valor >= notas[x]) {
        var div = Math.floor(valor / notas[x]);
        mensagem += div + "  Nota(s) de: " + notas[x] + "  \n  " + "  \n  ";
        valor -= div * notas[x];
      }
    }
    setPagamento(mensagem);

    return mensagem;
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

                  <span>{cor}</span>

                  <span>{marca}</span>
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
                  <TextField
                    style={{
                      width: "40px",

                      fontWeight: "bold",
                      justifyContent: "center",
                    }}
                    value={contador}
                  ></TextField>
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
                    width: "124px",
                    height: "28px",
                  }}
                >
                  <h4>{valor}</h4>
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
                    <h5> {`R$ ${calculaSubTotalDuascasas}`}</h5>
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

                border: "1px solid #B2B2B2",
                borderRadius: "5px",
                width: "50%",
                color: "Green",
                justifyContent: "center",
              }}
            >
              <h3>{pagamento}</h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
