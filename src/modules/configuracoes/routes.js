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
  {
    path: "/configuracoes/disciplinas/designar/:id",
    name: "DesignarProfessor",
    component: () => import("./pages/DesignarProfessor.vue"),
  },
  {
    path: "/configuracoes/disciplinas/:id/alocar-aluno",
    name: "AlocarAlunoDisciplinaId",
    component: () => import("./pages/AlocarAlunoDisciplinaId.vue"),
  },
];
