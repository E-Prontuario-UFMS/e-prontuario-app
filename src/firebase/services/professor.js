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
  console.log(professor);
  return await db
    .collection(PROFESSORES)
    .doc(id)
    .set({ ...professor }, { merge: true });
}
