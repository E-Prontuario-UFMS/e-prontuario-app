import axios from "axios";
import { BASE_URL } from "@/constants";

export const getPacienteFromId = id => {
  return axios
    .get(`${BASE_URL}/paciente/${id}`)
    .then(({ data }) => data)
    .catch(err => {
      return { message: "Não foi possivel buscar o Paciente", err };
    });
};
