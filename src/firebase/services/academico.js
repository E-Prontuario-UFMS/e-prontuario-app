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

export async function getUserByAuthenticationId(authId) {
  return await db
    .collection(ACADEMICOS)
    .where("authId", "==", authId)
    .get()
    .then(snapshot => snapshot.docs[0].data());
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

export async function fetchAcademicoByRga(rga) {
  return await db
    .collection(ACADEMICOS)
    .where("rga", "==", rga)
    .get()
    .then(snapshot =>
      snapshot.docs[0].ref.get().then(data => {
        const academico = { ...data.data(), id: data.id };
        return academico;
      }),
    );
}
