import * as types from "./mutation-types";
import { doSiscadLogin } from "../../../utils/siscad";

import { db } from "../../../firebase";
import { USUARIOS } from "../../../constants";

export const ActionSetGlobalUser = async ({ commit }, payload) => {
  const { token, usuario } = await doSiscadLogin({
    passaporte: payload.passaporte,
    senha: payload.senha,
  });

  saveAcademicoOnFirebase(token, usuario);

  usuario.rga === "201608030164" ? (usuario.role = "PROFESSOR") : null;
  commit(types.SET_GLOBAL_USER, { token, usuario });
};

export const ActionDeleteGlobalUser = ({ commit }) => {
  commit(types.DELETE_GLOBAL_USER);
};

export async function saveAcademicoOnFirebase(token, usuario) {
  await db
    .collection(USUARIOS)
    .doc(usuario.rga)
    .set(
      {
        ...usuario,
      },
      { merge: true },
    );
}

export async function saveUsuarioProvisorio({ commit }, usuario) {
  commit(types.SET_USUARIO_PROVISORIO, usuario);
}

export async function setUser({ commit }, usuario) {
  commit(types.SET_USER, usuario);
}
