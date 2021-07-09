import { DISCIPLINAS, PROFESSORES } from "../../constants";
import { db, firebase } from "../../firebase";

export async function addNewProfessor({ siap, nome }) {
  db.collection(PROFESSORES).add({
    siap,
    nome,
    disciplinas: [],
  });
}

export async function getProfessorById(id) {
  return await db
    .collection(PROFESSORES)
    .doc(id)
    .get()
    .then(data => data.data());
}

export async function editarProfessor(id, professor) {
  return await db
    .collection(PROFESSORES)
    .doc(id)
    .set({ ...professor }, { merge: true });
}

export async function addDisciplinaToProfessor(idProfessor, idDisciplina) {
  const discipinaRef = await db.collection(DISCIPLINAS).doc(idDisciplina);
  return await db
    .collection(PROFESSORES)
    .doc(idProfessor)
    .update({
      disciplinas: firebase.firestore.FieldValue.arrayUnion(discipinaRef),
    });
}

export async function fetchAllProfessores() {
  return await db
    .collection(PROFESSORES)
    .get()
    .then(data => {
      return data.docs;
    });
}

export async function designarProfessorDisciplina(idProfessor, idDisciplina) {
  const disciplinaRef = db.doc(`/disciplinas/${idDisciplina}`);

  return await db
    .collection(PROFESSORES)
    .doc(idProfessor)
    .update({
      disciplinas: firebase.firestore.FieldValue.arrayUnion(disciplinaRef),
    })
    .then(data => data)
    .catch(err => Error(err));
}
