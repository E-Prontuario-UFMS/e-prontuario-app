import { ACADEMICOS } from "../../constants";
import { db } from "../../firebase";

export async function getAcademicoById(id) {
  return await db
    .collection(ACADEMICOS)
    .doc(id)
    .get()
    .then(snapshot => snapshot.data());
}
