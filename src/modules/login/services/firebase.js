import { firebase } from "../../../firebase";

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
            sendVerificationEmail(email);
          })
          .catch(err => Error(err.message));
      },
      err => Error(err.message),
    );
}

export async function doLogin({ email, senha }) {
  console.log(senha);
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, senha)
    .then(credentials => credentials)
    .catch(() => Error("Não foi possivel fazer login"));
}

function sendVerificationEmail(email) {
  firebase.auth().sendSignInLinkToEmail(email, {
    handleCodeInApp: true,
    url: `${process.env.VUE_APP_URL}/verifica-email?email=${email}`,
  });
}
