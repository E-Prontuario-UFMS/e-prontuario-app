export default [
  {
    path: "/professores",
    name: "Professores",
    component: () => import("./pages/ProfessoresFirebase.vue"),
  },
  {
    path: "/novo-professor",
    name: "NovoProfessor",
    component: () => import("./pages/NewProfessorFirebase.vue"),
  },
  {
    path: "/professor/:id",
    name: "Professor",
    component: () => import("./pages/ProfessorFirebase.vue"),
  },
  {
    path: "/editar-professor/:id",
    name: "EditarProfessor",
    component: () => import("./pages/EditarProfessorFirebase.vue"),
  },
];
