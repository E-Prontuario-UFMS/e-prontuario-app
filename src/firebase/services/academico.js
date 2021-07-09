import { ACADEMICOS, DISCIPLINAS } from "../../constants";
import { db } from "../../firebase";
import { fetchDisciplinaById } from "./disciplina";

export async function getAcademicoById(id) {
  return await db
    .collection(ACADEMICOS)
    .doc(id)
    .get()
    .then(snapshot => snapshot.data());
}

export async function getUserByAuthenticationId(id) {
  return await db
    .collection(ACADEMICOS)
    .where("id", "==", id)
    .get()
    .then(snapshot => {
      return snapshot.docs[0].data();
    });
}

export async function getAllDisciplinasByAcademicoId(id) {
  const academicoRef = await db.collection(ACADEMICOS).doc(id);
  const disciplinasRefs = await db
    .collection(DISCIPLINAS)
    .where("academicos", "array-contains", academicoRef)
    .get()
    .then(data => data.docs);

  const disciplinas = [];

  disciplinasRefs.forEach(async ref => {
    const disciplina = await fetchDisciplinaById(ref.id);
    disciplinas.push(disciplina);
  });

  return disciplinas;
}
