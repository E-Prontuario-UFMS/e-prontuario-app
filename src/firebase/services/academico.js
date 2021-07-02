import { ACADEMICOS } from "../../constants";
import { db } from "../../firebase";

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
