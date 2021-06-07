export default [
  {
    path: "/professores",
    name: "Professores",
    component: () => import("./pages/Professores.vue"),
  },
  {
    path: "/novo-professor",
    name: "NovoProfessor",
    component: () => import("./pages/NewProfessor.vue"),
  },
  {
    path: "/professor/:id",
    name: "Professor",
    component: () => import("./pages/Professor.vue"),
  },
];
