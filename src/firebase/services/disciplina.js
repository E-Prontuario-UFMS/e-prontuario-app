import { ACADEMICOS, DISCIPLINAS, PROFESSORES } from "../../constants";
import { db, firebase } from "../../firebase";

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
  const { alunos: alunosRef } = await db
    .collection(DISCIPLINAS)
    .doc(disciplinaId)
    .get()
    .then(snapshot => snapshot.data());

  const alunos = [];
  await alunosRef.forEach(async alunoRef => {
    const aluno = await db
      .collection(ACADEMICOS)
      .doc(alunoRef.id)
      .get()
      .then(snapshot => snapshot.data());
    alunos.push(aluno);
  });
  return alunos;
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
