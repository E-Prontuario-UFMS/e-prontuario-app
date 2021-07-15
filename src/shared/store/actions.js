import * as types from "./mutation-types";

export function ActionToggleDrawer({ commit }, payload) {
  commit(types.TOGGLE_DRAWER, payload);
}
