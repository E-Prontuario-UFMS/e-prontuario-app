import { ACADEMICOS } from "../../../constants";
import { db, firebase } from "../../../firebase";

export function createEmail({ email, password, usuarioProvisorio }) {
  return usuarioProvisorio.professor
    ? createProfessor({
        email,
        password,
        usuarioProvisorio,
      })
    : createAluno({
        email,
        password,
        usuarioProvisorio,
      });
}

function createProfessor({ email, password, usuarioProvisorio }) {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(
      credentials => {
        credentials.user
          .updateProfile({
            displayName: usuarioProvisorio.usuario.nome,
          })
          .then(() => {
            sendVerificationEmail(email);
          })
          .catch(err => Error(err.message));
      },
      err => Error(err.message),
    );
}

function createAluno({ email, password, usuarioProvisorio }) {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(
      credentials => {
        credentials.user
          .updateProfile({
            displayName: usuarioProvisorio.usuario.nome,
          })
          .then(() => {
            db.collection(ACADEMICOS).add({
              email,
              id: credentials.user.uid,
              passaporte: usuarioProvisorio.usuario.passaporte,
              cpf: usuarioProvisorio.usuario.cpf,
              nome: usuarioProvisorio.usuario.nome,
              rga: usuarioProvisorio.usuario.rga,
            });
            sendVerificationEmail(email);
          })
          .catch(err => Error(err.message));
      },
      err => Error(err.message),
    );
}

export async function doLogin({ email, senha }) {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, senha)
    .then(credentials => credentials)
    .catch(e => {
      console.error(e);
      return Error("Não foi possivel fazer o login");
    });
}

function sendVerificationEmail(email) {
  firebase.auth().sendSignInLinkToEmail(email, {
    handleCodeInApp: true,
    url: `${process.env.VUE_APP_URL}/verifica-email?email=${email}`,
  });
}

export async function verifyIfExistsSamePassportInData(passport) {
  return await firebase
    .firestore()
    .collection(ACADEMICOS)
    .where("passaporte", "==", passport)
    .get()
    .then(data => data.docs)
    .catch(error => console.error(error));
}
