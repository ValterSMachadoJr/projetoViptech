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

  const { id_produto } = useParams();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [severity, setSeverity] = useState<
    "success" | "info" | "warning" | "error"
  >("success");
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");

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
        texto += div + "  Notas de: " + notas[x] + "  \n  " + " = ";
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
                <div className="quantidade" style={{ backgroundColor: "blue" }}>
                  Quantidade
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
                    <p> {`R$ ${valor}`}</p>
                  </div>
                  <hr></hr>
                </div>
                <div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p>Frete </p>
                    <p>{`R$ ${Frete}`}</p>
                  </div>
                  <hr></hr>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>Valor total </p>
                  <p>{`R$ ${ValorTotal}`}</p>
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
                  <p style={{ backgroundColor: "red" }}></p>
                  PAGAR
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          {mostrarnotas && (
            <div>
              <p>{texto}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
