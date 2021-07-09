import { MATRICULA } from "../../constants";
import { db } from "../../firebase";
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
