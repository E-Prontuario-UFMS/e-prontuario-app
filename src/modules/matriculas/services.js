import axios from "axios";
import { BASE_URL } from "../../constants";

export async function fetchMatriculas({ page = 0 }) {
  return await axios.get(`${BASE_URL}/matricula?page=${page}`);
}
