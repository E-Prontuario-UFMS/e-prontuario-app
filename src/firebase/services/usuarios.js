import { USUARIOS } from "../../constants";
import { db } from "../../firebase";

// get all users from firebase collection
export async function fetchAllUsers() {
  return await db
    .collection(USUARIOS)
    .get()
    .then(snapshot => snapshot.docs);
}
