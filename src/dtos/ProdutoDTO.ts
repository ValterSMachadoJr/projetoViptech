export class ProdutoDTO {
  id_produto?: Number;
  nome: string;
  cor: string;
  marca: string;
  valor: Number;
  imagem: string;
  data_cadastro: string;

  constructor(
    nome?: string,
    cor?: string,
    marca?: string,
    valor?: Number,
    imagem?: string,
    id_produto?: number,
    data_cadastro?: string
  ) {
    this.nome = nome;
    this.cor = cor;
    this.marca = marca;
    this.valor = valor;
    this.imagem = imagem;
    this.id_produto = id_produto;
    this.data_cadastro = data_cadastro;
  }
}
