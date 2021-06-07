import axios from "axios";
import { BASE_URL } from "@/constants";

export const removePaciente = async id => {
  return await axios.delete(`${BASE_URL}/paciente/${id}`);
};
