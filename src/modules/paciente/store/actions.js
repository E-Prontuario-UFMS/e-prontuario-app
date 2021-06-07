import * as types from "./mutation-types";
import { getPacientesFromApi } from "@/modules/paciente/services";
import { addPaciente } from "../services/addPacienteApi";
import { editPaciente } from "@/modules/paciente/services/editPaciente";

export const ActionGetPacientesFromApi = async (
  { commit },
  { page = 0, limit = 10 }
) => {
  getPacientesFromApi(page, limit)
    .then(data => {
      commit(types.GET_PACIENTES, data);
    })
    .catch(err => err);
};

export const ActionAddPaciente = async ({ commit }, payload) => {
  const data = await addPaciente(payload);
  commit(types.ADD_PACIENTE, data);
};

export const ActionSetPage = async ({ commit, dispatch }, payload) => {
  commit(types.SET_PAGE, payload);
  dispatch("ActionGetPacientesFromApi", { page: payload });
};

export const ActionSetLimit = async ({ commit }, payload) => {
  commit(types.SET_LIMIT, payload);
};

export const ActionEditPaciente = async ({ commit }, payload) => {
  const data = await editPaciente(payload);
  commit(types.EDIT_PACIENTES, data);
};

export const ActionDeletePaciente = async ({ commit }, payload) => {
  console.log(commit);
  console.log(payload);
  // const data = await removePaciente(payload.paciente.id)
  // if(!data.err) commit(types.REMOVE_PACIENTE, data)
  // else throw new Error('Não foi possivel deletar o Paciente')
};
