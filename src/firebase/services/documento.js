import { DOCUMENTOS } from "../../constants";
import { db } from "../../firebase";
import { getUserByAuthenticationId } from "./academico";

export async function getDocumentoPreenchidoById(id) {
  return await db
    .collection(DOCUMENTOS)
    .doc(id)
    .get()
    .then(snapshot => snapshot.data());
}

export async function fetchDocumentosPreenchidos() {
  const documentosReference = await db
    .collection(DOCUMENTOS)
    .get()
    .then(snapshot => snapshot.docs);

  const documentos = [];

  await documentosReference.forEach(async doc => {
    const docById = await getDocumentoPreenchidoById(doc.id);
    const academicoById = await getUserByAuthenticationId(docById.academico.id);
    documentos.push({ ...docById, ...academicoById, id: doc.id });
  });

  return documentos;
}

export async function fetchDocumentosPreenchidosById(academicoId) {
  const academico = await getUserByAuthenticationId(academicoId);

  const documentosRef = await db
    .collection(DOCUMENTOS)
    .where("academico", "==", db.doc(`academicos/${academico.id}`))
    .get()
    .then(snapshot => snapshot.docs);

  const documentos = [];

  await documentosRef.forEach(async documentoRef => {
    const documento = await getDocumentoPreenchidoById(documentoRef.id);
    documentos.push({ ...documento, id: documentoRef.id });
  });
  return documentos;
}
