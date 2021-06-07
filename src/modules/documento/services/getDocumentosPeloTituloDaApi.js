import axios from "axios";
import { BASE_URL } from "@/constants";
import { MODELO_DOCUMENTO } from "../../../constants";

export const getDocumentosPeloTituloDaApi = async (titulo = "") => {
  const { data } = await axios.get(
    `${BASE_URL}${MODELO_DOCUMENTO}/documento?titulo=${titulo}`
  );
  return data;
};
