import axios from "axios";
import { BASE_URL, ACADEMICO } from "../../constants";

export async function getAcademicos({ page = 0 }) {
  return await axios.get(`${BASE_URL}/academico?page=${page}`);
}

export async function addAcademico({ nome, rga }) {
  return await axios.post(`${BASE_URL}/academico`, {
    nome,
    rga,
    tipoPessoa: ACADEMICO,
  });
}
export async function fetchAcademicoById(id) {
  return await axios.get(`${BASE_URL}/academico/${id}`);
}

export async function fetchAllAcademicos() {
  return await axios.get(`${BASE_URL}/academico/todos-academicos`);
}
