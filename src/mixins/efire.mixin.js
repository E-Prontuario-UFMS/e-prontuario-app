import {
  DISCIPLINAS,
  DOCUMENTOS,
  MATRICULA,
  MODELOS,
  PACIENTES,
  PROFESSORES,
  USUARIOS,
} from "../constants";
import { db } from "../firebase";
export default {
  data: () => ({
    documentos: [],
    professores: [],
    modelos: [],
    pacientes: [],
    disciplinas: [],
    academicos: [],
    matriculas: [],
  }),
  firestore: {
    documentos: db.collection(DOCUMENTOS),
    professores: db.collection(PROFESSORES),
    modelos: db.collection(MODELOS),
    pacientes: db.collection(PACIENTES),
    disciplinas: db.collection(DISCIPLINAS),
    academicos: db.collection(USUARIOS),
    matriculas: db.collection(MATRICULA),
  },
};
