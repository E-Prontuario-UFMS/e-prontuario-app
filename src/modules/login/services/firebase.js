import { firebase } from "../../../firebase";

export function createEmail({ email, password, usuarioProvisorio }) {
  if (usuarioProvisorio.professor) {
    return createProfessor({
      email,
      password,
      usuarioProvisorio,
    });
  } else {
    return createAluno({
      email,
      password,
      usuarioProvisorio,
    });
  }
}

function createProfessor({ email, password, usuarioProvisorio }) {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(
      credentials => {
        credentials.user.updateProfile({
          displayName: usuarioProvisorio.usuario.nome,
        });
      },
      err => console.log(err),
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
          });
      },
      err => console.log(err),
    );
}

export async function doLogin({ email, senha }) {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, senha)
    .then(credentials => credentials)
    .catch(() => new Error("Não foi possivel fazer login"));
}

function sendVerificationEmail(email) {
  firebase.auth().sendSignInLinkToEmail(email, {
    handleCodeInApp: true,
    url: "http://localhost:3000/verifica",
  });
}
