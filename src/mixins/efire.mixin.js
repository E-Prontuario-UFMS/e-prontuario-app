import {
  ACADEMICOS,
  DISCIPLINAS,
  MODELOS,
  PACIENTES,
  PROFESSORES,
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
  }),
  firestore: {
    documentos: db.collection(MODELOS),
    professores: db.collection(PROFESSORES),
    modelos: db.collection(MODELOS),
    pacientes: db.collection(PACIENTES),
    disciplinas: db.collection(DISCIPLINAS),
    academicos: db.collection(ACADEMICOS),
  },
};
