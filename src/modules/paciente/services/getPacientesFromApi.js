import axios from "axios";
import { BASE_URL } from "../../../constants";

export const getPacientesFromApi = (page = 0, limit = 10) => {
  return axios
    .get(`${BASE_URL}/paciente?page=${page}&size=${limit}`)
    .then(({ data }) => data)
    .catch(err => err);
};
