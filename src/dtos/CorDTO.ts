export class CorDTO {
  id_cor?: Number;
  cor: string;

  constructor(cor?: string, id_cor?: Number) {
    this.cor = cor;
    this.id_cor = id_cor;
  }
}
