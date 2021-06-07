import axios from "axios";

export const doLogin = async user => {
  return axios
    .post("/auth", { ...user })
    .then(({ data }) => data)
    .catch(err => {
      throw new Error(err);
    });
};
