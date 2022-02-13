export class ProdutoDTO {
    nome: string;
    id_cor: Number;
    id_marca: Number;
    valor: Number;
    imagem: string;
    
    


constructor (nome?: string, id_cor?: Number, id_marca?: Number, valor?: Number, imagem?: string ) {
    this.nome = nome;
    this.id_cor = id_cor;
    this.id_marca = id_marca;
    this.valor = valor;
    this.imagem = imagem;
    



}
}