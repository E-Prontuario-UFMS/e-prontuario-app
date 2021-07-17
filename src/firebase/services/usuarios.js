import { USUARIOS } from "../../constants";
import { db } from "../../firebase";

// fetch usuario by id
export async function fetchUserById(id) {
  const usuario = await db
    .collection(USUARIOS)
    .doc(id)
    .get();
  return usuario.data();
}

export async function fetchAllUsers() {
  const usuariosRef = await db
    .collection(USUARIOS)
    .get()
    .then(snaps => snaps.docs);

  return usuariosRef.map(usuario => usuario.data());
}
