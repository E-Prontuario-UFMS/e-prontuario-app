import axios from "axios";
import { BASE_URL } from "../../constants";

export async function getAcademicos({ page = 0 }) {
  return await axios.get(`${BASE_URL}/academico?page=${page}`);
}
