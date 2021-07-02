import { DISCIPLINAS, MODELOS } from "../../constants";
import { db } from "../../firebase";

export async function getModeloDocumentoBySlug(slug) {
  return await db
    .collection(MODELOS)
    .doc(slug)
    .get()
    .then(snapshot => snapshot.data());
}

export async function getModeloDocumentoByDisciplina(disciplinaId) {
  return await db
    .collection(DISCIPLINAS)
    .doc(disciplinaId)
    .get()
    .then(async snapshot => {
      const { modelos } = await snapshot.data();
      return await modelos.map(async ({ id }) => {
        return await getModeloDocumentoBySlug(id);
      });
    });
}
