import { routes as documento } from "../documento";
import { routes as paciente } from "../paciente";
import { routes as disciplina } from "../disciplina";
import { routes as professores } from "../professores";
import { routes as configuracoes } from "../configuracoes";
import { routes as academicos } from "../academicos";

export default [
  {
    path: "/home",
    name: "Inicial",
    component: () => import("./pages/Inicial"),
    children: [
      ...documento,
      ...paciente,
      ...disciplina,
      ...professores,
      ...configuracoes,
      ...academicos,
      {
        path: "/",
        name: "Home",
        component: () => import("./pages/Home"),
      },
    ],
  },
];
