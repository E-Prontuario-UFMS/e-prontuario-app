export class ItemDocumento {
  constructor({
    descricao,
    enfermeiro,
    entrada,
    id,
    idPai,
    situacao,
    tipoItem,
    titulo,
    valorData,
    valorFixo,
    valorFlutuante,
    valorInteiro,
    valorTexto,
    tituloItemDocumento,
  }) {
    this.descricao = descricao;
    this.enfermeiro = enfermeiro;
    this.entrada = entrada;
    this.id = id;
    this.idPai = idPai;
    this.situacao = situacao;
    this.tipoItem = tipoItem;
    this.titulo = titulo;
    this.valorTexto = valorTexto;
    this.valorData = valorData;
    this.valorFixo = valorFixo;
    this.valorFlutuante = valorFlutuante;
    this.valorInteiro = valorInteiro;
    this.tituloItemDocumento = tituloItemDocumento;
  }
}
