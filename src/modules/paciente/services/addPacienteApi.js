import axios from "axios";
import { BASE_URL } from "@/constants";

export const addPaciente = async payload => {
  const { data } = await axios.post(`${BASE_URL}/paciente`, {
    ...payload,
  });
  return data;
};
