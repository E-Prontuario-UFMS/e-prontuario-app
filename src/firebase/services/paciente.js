import { DOCUMENTOS, PACIENTES } from "../../constants";
import { db } from "../../firebase";

export async function getPacienteById(id) {
  return await db
    .collection(PACIENTES)
    .doc(id)
    .get()
    .then(snapshot => snapshot.data());
}

export async function fetchDocumentosByPaciente(id) {
  const pacienteRef = await db.collection(PACIENTES).doc(id);
  return await db
    .collection(DOCUMENTOS)
    .where("paciente", "==", pacienteRef)
    .get()
    .then(snapshot => snapshot.docs.map(doc => doc.data()));
}
