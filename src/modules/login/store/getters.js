export const getUserState = ({ state }) => state;

export const getToken = ({ state }) => state.token;

export const isProfessor = state => state.user.isProfessor;
