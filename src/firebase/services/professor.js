import { PROFESSORES } from "../../constants";
import { db } from "../../firebase";

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
  idDisciplina;
  const disciplinasDoProfessor = await db
    .collection(PROFESSORES)
    .doc(idProfessor)
    .get()
    .then(data => data.data());

  disciplinasDoProfessor.map(disciplina => console.log(disciplina));
  return await db
    .collection(PROFESSORES)
    .doc(idProfessor)
    .update({});
}
