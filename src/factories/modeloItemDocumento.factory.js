import { ATIVO, NOVO } from "../constants";

export function modeloItemDocumentoFactory(modelo) {
  return {
    id: null,
    idItemPai: null,
    isItemDocumentoObrigatorio: modelo.isItemDocumentoObrigatorio,
    modeloDocumento: {
      descricao: modelo.descricao,
      id: null,
      situacao: ATIVO,
      status: NOVO,
      titulo: modelo.tituloDocumento,
    },
    qtdMaximaRegistros: 0,
    tipoItem: modelo.tipoItem,
    titulo: modelo.tituloDocumento,
    valorFixoChave: modelo.valorFixoChave,
  };
}
