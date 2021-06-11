import axios from "axios";
import { ATIVO, BASE_URL } from "../../../constants";

export async function createModeloDocumento({ descricao, titulo }) {
  return await axios.post(`${BASE_URL}/modelo-documento`, {
    descricao,
    titulo,
    situacao: ATIVO,
  });
}
