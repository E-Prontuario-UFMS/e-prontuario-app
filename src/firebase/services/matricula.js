import { MATRICULA } from "../../constants";
import { db } from "../../firebase";
import { getAcademicoById } from "./academico";
import { addAlunoInDisciplina } from "./disciplina";

export async function matriculaAluno(academicoId, disciplinaId) {
  await db.collection(MATRICULA).add({
    academico: db.doc(`academico/${academicoId}`),
    disciplina: db.doc(`disciplina/${disciplinaId}`),
    createdAt: new Date(),
  });
  return await addAlunoInDisciplina(disciplinaId, academicoId);
}

// export async function isAlunoMatriculado(academicoId, disciplinaId) {
//   return db.collection(MATRICULA).where("disciplina", "==", "");
// }

export async function getAllMatriculas() {
  const matriculasRef = await db
    .collection(MATRICULA)
    .get()
    .then(snapshot => snapshot.docs);

  const matriculas = [];

  matriculasRef.forEach(async matricula => {
    const academico = await getAcademicoById(matricula.academico.id);
    matriculas.push({ ...academico });
  });

  return matriculas;
}
