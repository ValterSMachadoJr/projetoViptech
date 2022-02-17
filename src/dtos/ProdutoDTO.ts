import Produto from "componentes/Produtos";

export class ProdutoDTO {
    id_produto?: Number; 
    nome: string;
    id_cor: Number;
    id_marca: Number;
    marca: String;
    valor: Number;
    imagem: string;


    
    


constructor (nome?: string, id_cor?: Number, id_marca?: Number, valor?: Number, imagem?: string, id_produto?: number, ) {
    this.nome = nome;
    this.id_cor = id_cor;
    this.id_marca = id_marca;
    this.valor = valor;
    this.imagem = imagem;
    this.id_produto = id_produto;
    



}
}