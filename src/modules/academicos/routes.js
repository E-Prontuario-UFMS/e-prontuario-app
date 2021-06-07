export default [
  {
    path: "/academico",
    name: "Academico",
    component: () => import("./pages/Academico.vue"),
  },
  {
    path: "/novo-academico",
    name: "NovoAcademico",
    component: () => import("./pages/NovoAcademico.vue"),
  },
];
