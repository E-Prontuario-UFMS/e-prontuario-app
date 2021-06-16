import { DISCIPLINAS, PROFESSORES } from "../../constants";
import { db } from "../../firebase";

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
