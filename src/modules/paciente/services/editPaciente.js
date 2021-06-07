import axios from "axios";
import { BASE_URL } from "@/constants";

export const editPaciente = paciente => {
  return axios
    .put(`${BASE_URL}/paciente/${paciente.id}`, { ...paciente })
    .then(({ data }) => {
      return data;
    })
    .catch(err => {
      return { message: "Não foi possivel editar o Paciente", err };
    });
};
