import axios from "axios";
import { BASE_URL } from "@/constants";
import { ItemDocumento } from "../../../domain/itemDocumento";
import { Enfermeiro } from "../../../domain/enfermeiro";
import { Entrada } from "../../../domain/entrada";

export const formToResponse = async (
  itemDocumentos,
  itemsDocumentoPreenchidos,
  usuario,
  paciente
) => {
  const items = [];
  const titulo = itemDocumentos[0].tituloDocumento;

  const enfermeiro = new Enfermeiro({
    ...usuario,
  });

  const entrada = new Entrada({
    dataHora: new Date(),
    paciente,
  });

  itemDocumentos.map(itemDoc => {
    const newItemDocumento = new ItemDocumento({
      descricao: itemDoc.descricao,
      enfermeiro,
      entrada,
      id: itemDoc.id,
      situacao: "ATIVO",
      titulo,
    });

    for (let doc in itemsDocumentoPreenchidos) {
      const keyValues = Object.entries(itemsDocumentoPreenchidos[doc]);
      if (keyValues[0] !== undefined) {
        const chave = keyValues[0][0];
        const valor = keyValues[0][1];
        if (itemDoc.tituloItemDocumento === chave) {
          if (itemDoc.tipoItem === "STRING") {
            newItemDocumento.valorTexto = valor;
            newItemDocumento.tipoItem = "STRING";
            newItemDocumento.tituloItemDocumento = chave;
          }
          if (itemDoc.tipoItem === `DOUBLE`) {
            newItemDocumento.tipoItem = "DOUBLE";
            newItemDocumento.valorFlutuante = valor;
            newItemDocumento.tituloItemDocumento = chave;
          }
          if (itemDoc.tipoItem === "DATA_HORA") {
            newItemDocumento.tipoItem = "DATA_HORA";
            newItemDocumento.valorData = valor;
            newItemDocumento.tituloItemDocumento = chave;
          }
        }
      }
    }
    items.push(newItemDocumento);
  });

  const documento = {
    paciente,
    enfermeiro,
    entrada,
    titulo,
    itensDocumento: items,
  };

  return axios.post(`${BASE_URL}/documento`, documento);
};
