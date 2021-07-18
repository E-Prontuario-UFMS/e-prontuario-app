import { USUARIOS } from "../../constants";
import { db } from "../../firebase";

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

  return usuariosRef.map(usuario => {
    return { ...usuario.data(), id: usuario.id };
  });
}

export async function updateUser(usuario) {
  const usuarioRef = await db
    .collection(USUARIOS)
    .doc(usuario.id)
    .update({
      isAdmin: usuario.isAdmin,
      isProfessor: usuario.isProfessor,
    });
  return usuarioRef.data();
}
