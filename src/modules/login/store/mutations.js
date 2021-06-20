import * as types from "./mutation-types";

export default {
  [types.SET_GLOBAL_USER](state, payload) {
    state.token = payload.token;
    state.usuario = payload.usuario;
  },
  [types.DELETE_GLOBAL_USER](state) {
    state.token = "";
    state.usuario = {};
  },
  [types.SET_USUARIO_PROVISORIO](state, payload) {
    state.usuarioProvisorio = payload;
  },
  [types.SET_USER](state, payload) {
    state.user = payload;
  },
};
