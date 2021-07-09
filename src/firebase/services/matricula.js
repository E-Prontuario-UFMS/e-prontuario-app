import { MATRICULA } from "../../constants";
import { db } from "../../firebase";

export async function matriculaAluno(academicoId, disciplinaId) {
  return await db.collection(MATRICULA).add({
    academico: db.doc(`academico/${academicoId}`),
    disciplina: db.doc(`disciplina/${disciplinaId}`),
    createdAt: new Date(),
  });
}

// export async function isAlunoMatriculado(academicoId, disciplinaId) {
//   return db.collection(MATRICULA).where("disciplina", "==", "");
// }
