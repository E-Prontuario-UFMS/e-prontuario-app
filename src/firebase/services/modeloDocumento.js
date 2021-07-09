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
  const { modelos } = await db
    .collection(DISCIPLINAS)
    .doc(disciplinaId)
    .get()
    .then(snapshot => snapshot.data());

  const modelosLoaded = [];
  await modelos.forEach(async ({ id }) => {
    const modelo = await getModeloDocumentoBySlug(id);
    modelosLoaded.push({ ...modelo, id });
  });

  return modelosLoaded;
}
