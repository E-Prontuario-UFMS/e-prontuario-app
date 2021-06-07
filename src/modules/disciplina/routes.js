export default [
  {
    name: "Disciplinas",
    path: "disciplinas",
    component: () => import("./DisciplinaPage"),
  },
  {
    name: "Disciplina",
    path: "disciplina/:id",
    component: () => import("./Disciplina.vue"),
  },
];
