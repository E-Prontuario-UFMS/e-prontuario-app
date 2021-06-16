import { db } from "../../firebase";

export async function getModeloDocumentoBySlug(slug) {
  return await db
    .collection("modelos")
    .doc(slug)
    .get()
    .then(snapshot => snapshot.data());
}
