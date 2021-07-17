import { routes as documento } from "../documento";
import { routes as paciente } from "../paciente";
import { routes as disciplina } from "../disciplina";
import { routes as professores } from "../professores";
import { routes as configuracoes } from "../configuracoes";
import { routes as academicos } from "../academicos";
import { routes as matriculas } from "../matriculas";
import { routes as feedback } from "../feedback";

export default [
  {
    path: "/home",
    component: () => import("./pages/Inicial"),
    children: [
      ...documento,
      ...paciente,
      ...disciplina,
      ...professores,
      ...configuracoes,
      ...academicos,
      ...matriculas,
      ...feedback,
      {
        path: "/",
        name: "Home",
        component: () => import("./pages/Home"),
      },
    ],
  },
];
