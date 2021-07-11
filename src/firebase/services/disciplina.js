import { DISCIPLINAS, PROFESSORES } from "../../constants";
import { db, firebase } from "../../firebase";
import { getAcademicoById } from "./academico";

export async function fetchDisciplinaById(id) {
  return await db
    .collection(DISCIPLINAS)
    .doc(id)
    .get()
    .then(snapshot => snapshot.data());
}

export async function fetchProfessorByDisciplinaId(disciplinaId) {
  const disciplinaRef = await db.collection(DISCIPLINAS).doc(disciplinaId);
  return await db
    .collection(PROFESSORES)
    .where("disciplinas", "array-contains", disciplinaRef)
    .get()
    .then(snapshot => snapshot.docs[0].data());
}

export async function fetchAllDisciplinas() {
  return await db
    .collection(DISCIPLINAS)
    .get()
    .then(snapshot => snapshot.docs);
}

export async function fetchAlunosByDisciplina(disciplinaId) {
  const { academicos: academicosRef } = await db
    .collection(DISCIPLINAS)
    .doc(disciplinaId)
    .get()
    .then(data => data.data());

  const academicos = [];

  await academicosRef.forEach(async ({ id }) => {
    const academico = await getAcademicoById(id);
    academicos.push(academico);
  });
  return academicos;
}

export async function addModeloInDisciplina(disciplinaId, modelId) {
  const modelIdRef = db.doc(`/modelos/${modelId}`);

  return await db
    .collection(DISCIPLINAS)
    .doc(disciplinaId)
    .update({
      modelos: firebase.firestore.FieldValue.arrayUnion(modelIdRef),
    })
    .then(data => data)
    .catch(err => Error(err));
}

export async function removeModeloInDisciplina(disciplinaId, modelId) {
  const modelIdRef = db.doc(`/modelos/${modelId}`);

  return await db
    .collection(DISCIPLINAS)
    .doc(disciplinaId)
    .update({
      modelos: firebase.firestore.FieldValue.arrayRemove(modelIdRef),
    })
    .then(data => data)
    .catch(err => Error(err));
}

export async function addAlunoInDisciplina(disciplinaId, alunoId) {
  const alunoRef = db.doc(`/academicos/${alunoId}`);

  return await db
    .collection(DISCIPLINAS)
    .doc(disciplinaId)
    .update({
      academicos: firebase.firestore.FieldValue.arrayUnion(alunoRef),
    })
    .then(data => data)
    .catch(err => Error(err));
}

export async function deleteDisicplina(id) {
  return await db
    .collection(DISCIPLINAS)
    .doc(id)
    .delete();
}
