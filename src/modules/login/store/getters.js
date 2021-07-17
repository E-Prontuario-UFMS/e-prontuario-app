export const getUserState = ({ state }) => state;

export const isProfessor = state => state.user.isProfessor;

export const getEmail = state => state.user.email;

export const authId = state => state.user.uid;

export const isAdmin = state => state.user.isAdmin;
