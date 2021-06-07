import axios from "axios";
import { BASE_URL } from "../../constants";

export async function getProfessoresFromApi({ page = 0 }) {
  return await axios.get(`${BASE_URL}/professor?page=${page}`);
}

export async function addNewProfessor({ siap, nome }) {
  return await axios.post(`${BASE_URL}/professor`, {
    siap,
    nome,
  });
}

export async function deleteProfessor(id) {
  return await axios.delete(`${BASE_URL}/professor/${id}`);
}

export async function getProfessorById(id) {
  return await axios.get(`${BASE_URL}/professor/${id}`);
}
