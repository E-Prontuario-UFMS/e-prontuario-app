import * as types from "./mutation-types";

export default {
  [types.TOGGLE_DRAWER](state, payload) {
    state.drawerState = payload;
  },
};
