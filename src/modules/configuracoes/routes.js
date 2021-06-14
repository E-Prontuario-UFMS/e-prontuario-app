export default [
  {
    path: "/configuracoes",
    name: "Configuracoes",
    component: () => import("./pages/Configuracoes.vue"),
  },
  {
    path: "/configuracoes/disciplinas",
    name: "ConfiguracoesDisciplinas",
    component: () => import("./pages/Disciplinas.vue"),
  },
  {
    path: "/configuracoes/disciplina/:id",
    name: "EditarDisciplina",
    component: () => import("./components/EditarDisciplinaFirebase.vue"),
  },
];
