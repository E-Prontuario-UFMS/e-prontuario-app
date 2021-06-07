import axios from "axios";
import { BASE_URL } from "@/constants";

export function getDocumentById(id) {
  return axios.get(`${BASE_URL}/documento/${id}`);
}
