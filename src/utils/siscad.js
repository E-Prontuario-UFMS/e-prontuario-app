import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.ufms.br/passaporte-ws/authentication",
});

export const doSiscadLogin = async ({ passaporte, senha }) => {
  const response = await api.post("", {
    passaporte,
    senha,
  });
  if (response && response.status === 200) {
    return {
      usuario: response.data.usuario,
      token: response.data.authToken,
    };
  } else {
    return response;
  }
};
