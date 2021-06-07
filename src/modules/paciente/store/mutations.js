import * as types from "./mutation-types";

export default {
  [types.GET_PACIENTES](state, payload) {
    state.pacientesPagination = payload;
  },
  [types.ADD_PACIENTE](state, payload) {
    state.pacientesPagination.content.push(payload);
  },
  [types.SET_LIMIT](state, payload) {
    state.limit = payload;
  },
  [types.SET_PAGE](state, payload) {
    state.page = payload;
  },
  [types.EDIT_PACIENTES](state, payload) {
    const index = state.pacientesPagination.content.forEach(
      (paciente, index) => {
        if (paciente.id === payload.id) return index;
      }
    );
    state.pacientesPagination.content[index] = payload;
  },
};
