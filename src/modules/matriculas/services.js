import axios from "axios";
import { BASE_URL } from "../../constants";

export async function fetchMatriculas({ page = 0 }) {
  return await axios.get(`${BASE_URL}/matricula?page=${page}`);
}

export async function matriculaAcademico(academico, disciplina) {
  return await axios.post(`${BASE_URL}/matricula`, {
    academico: {
      id: academico.id,
    },
    disciplina: {
      id: disciplina.id,
    },
  });
}
