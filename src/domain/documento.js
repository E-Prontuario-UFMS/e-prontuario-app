export class Documento {
  constructor({
    paciente,
    enfermeiro,
    itensDocumento,
    id,
    titulo,
    descricao,
    entrada,
  }) {
    this.paciente = paciente;
    this.enfermeiro = enfermeiro;
    this.itensDocumento = itensDocumento;
    this.id = id;
    this.titulo = titulo;
    this.descricao = descricao;
    this.entrada = entrada;
  }
}
