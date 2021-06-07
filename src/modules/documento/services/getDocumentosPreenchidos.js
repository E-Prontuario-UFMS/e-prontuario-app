import axios from "axios";
import { BASE_URL } from "../../../constants";

export function getDocumentosPreenchidos({ page = 1, limit = 10 }) {
  return axios.get(`${BASE_URL}/documento?page=${page}&limit=${limit}`);
}
