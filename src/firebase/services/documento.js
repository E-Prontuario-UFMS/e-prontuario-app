import { DOCUMENTOS } from "../../constants";
import { db } from "../../firebase";

export async function getDocumentoPreenchidoById(id) {
  return await db
    .collection(DOCUMENTOS)
    .doc(id)
    .get()
    .then(snapshot => snapshot.data());
}
