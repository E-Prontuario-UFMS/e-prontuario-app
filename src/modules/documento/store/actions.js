import * as types from "./mutation-types";
import { documentos } from "../../../constants/documentos";
import axios from "axios";
import { BASE_URL } from "@/constants";
import { MODELO_DOCUMENTO } from "@/constants";

export const ActionGetGlobalDocumentos = ({ commit }) => {
  commit(types.GET_GLOBAL_DOCUMENTOS, documentos);
};

export const ActionSetDocumento = ({ commit }, payload) => {
  commit(types.SET_DOCUMENTO, payload);
};

export const ActionGetDocumentosApi = async ({ commit }) => {
  const { data } = await axios.get(`${BASE_URL}/eprontuario-api/documento`);

  commit(types.GET_DOCUMENTOS_API, data.content);
};

export const ActionGetTitulosDocumento = async ({ commit }) => {
  const { data } = await axios.get(
    `${BASE_URL}${MODELO_DOCUMENTO}/titulos-registrados`
  );

  let titulosComId = [];
  for (let i = 0; i < data.length; i++) {
    titulosComId.push({ id: i, titulo: data[i] });
  }
  commit(types.GET_TITULO_DOCUMENTOS, titulosComId);
};

export const ActionGetModelosDeDocumentoDaApi = async ({ commit }) => {
  const { data } = await axios.get(
    `${BASE_URL}${MODELO_DOCUMENTO}/titulos-registrados`
  );
  commit(types.GET_MODELOS_DOCUMENTO, data);
};
