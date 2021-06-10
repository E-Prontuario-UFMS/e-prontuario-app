import axios from "axios";
import { ATIVO, BASE_URL } from "../../constants";

export async function addNewDisciplina({ descricao, titulo, professor }) {
  return await axios.post(`${BASE_URL}/disciplina`, {
    descricao,
    professorPojo: professor,
    situacao: ATIVO,
    titulo,
    modelosDocumentosPojo: [],
  });
}

export async function getDisciplinas({ page = 0 }) {
  return await axios.get(`${BASE_URL}/disciplina?page=${page}`);
}

export async function fetchDisciplinaById(id) {
  return await axios.get(`${BASE_URL}/disciplina/${id}`);
}

export async function putDisciplina(disciplina) {
  return await axios.put(`${BASE_URL}/disciplina/${disciplina.id}`, {
    disciplina,
  });
}

export async function fetchAllDisciplinas() {
  return await axios.get(`${BASE_URL}/disciplina/todas-disciplinas`);
}
