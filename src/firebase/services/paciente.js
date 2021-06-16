import { PACIENTES } from "../../constants";
import { db } from "../../firebase";

export async function getPacienteById(id) {
  return await db
    .collection(PACIENTES)
    .doc(id)
    .get()
    .then(snapshot => snapshot.data());
}
