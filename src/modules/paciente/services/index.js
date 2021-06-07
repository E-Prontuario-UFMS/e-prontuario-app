import axios from "axios";
import { BASE_URL } from "../../../constants";

export { addPaciente } from "./addPacienteApi";
export { editPaciente } from "./editPaciente";
export { getPacienteFromId } from "./getPacienteFromId";
export { removePaciente } from "./removePaciente";
export { getPacientesFromApi } from "./getPacientesFromApi";

export async function fetchPacienteFromId(id) {
  return await axios.get(`${BASE_URL}/paciente/${id}`);
}
