import * as types from "./mutation-types";

export default {
  [types.GET_GLOBAL_DOCUMENTOS](state, payload) {
    state.documentos = payload;
  },
  [types.SET_DOCUMENTO](state, payload) {
    state.documentoSelecionado = payload;
  },
  [types.GET_DOCUMENTOS_API](state, payload) {
    state.documentos = payload;
  },
  [types.GET_TITULO_DOCUMENTOS](state, payload) {
    state.titulos = payload;
  },
  [types.GET_MODELOS_DOCUMENTO](state, payload) {
    state.modelosDeDocumento = payload;
  },
};
