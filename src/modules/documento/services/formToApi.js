import axios from "axios";
import { BASE_URL } from "../../../constants";
import { modeloItemDocumentoFactory } from "../../../factories/modeloItemDocumento.factory";

export const formToApi = async formData => {
  return new Promise((resolve, reject) => {
    formData.itemDocumentos.map(async item => {
      let docModel = modeloItemDocumentoFactory(item);
      docModel.tipoItem = TIPOS_CAMPOS[item.tipoCampo];

      await axios
        .post(`${BASE_URL}/modelo-documento`, {
          ...docModel,
        })
        .catch(err => reject(err));
    });
    resolve();
  });

  // TODO tipoCampo
};

const TIPOS_CAMPOS = {
  Texto: "STRING",
  Número: "DOUBLE",
  "Sim ou Não": "BOOLEAN",
  "Data e Hora": "DATAHORA",
};
