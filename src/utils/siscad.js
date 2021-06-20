import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.ufms.br/passaporte-ws/authentication",
});

export const doSiscadLogin = async ({ passaporte, senha }) => {
  const response = await api
    .post("", {
      passaporte,
      senha,
    })
    .catch(() => {
      return new Error("Não foi possivel fazer o login, tente novamente");
    });

  if (response && response.status === 200) {
    return {
      usuario: response.data.usuario,
      token: response.data.authToken,
      professor: checkIfIsProfessor(response.data.dn),
    };
  } else {
    return new Error("Não foi possivel fazer o login, tente novamente");
  }
};

function checkIfIsProfessor(dn) {
  const regex = /(?:[^\][,]+|\[[^\][]+\])+/gm;

  const teste = dn.match(regex);

  return !teste.filter(element => element === "OU=ALUNOS")[0];
}
