import * as types from "./mutation-types";
// import { doLogin } from "../services/doLogin";
import { doSiscadLogin } from "../../../utils/siscad";
import axios from "axios";
import { BASE_URL } from "../../../constants";

export const ActionSetGlobalUser = async ({ commit }, payload) => {
  const { token, usuario } = await doSiscadLogin({
    passaporte: payload.passaporte,
    senha: payload.senha,
  });

  usuario.rga === "201608030164" ? (usuario.role = "PROFESSOR") : null;
  const id = await criaOuBuscaEnfermeiro(usuario);
  usuario.id = id;
  commit(types.SET_GLOBAL_USER, { token, usuario });
};

export const ActionDeleteGlobalUser = ({ commit }) => {
  commit(types.DELETE_GLOBAL_USER);
};

const criaOuBuscaEnfermeiro = async usuario => {
  console.log(usuario);

  const content =
    (await (await axios.get(`${BASE_URL}/academico`)).data?.content) ?? [];
  console.log(content);
  // const { data } = await axios.post(`${BASE_URL}/academico`, {
  //   nome: usuario.nome,
  //   rga: usuario.rga,
  // });
  // return data.id;
};
