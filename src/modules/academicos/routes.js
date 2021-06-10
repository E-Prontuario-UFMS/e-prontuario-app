export default [
  {
    path: "/academicos",
    name: "Academicos",
    component: () => import("./pages/Academicos.vue"),
  },
  {
    path: "/academico/:id",
    name: "Academico",
    component: () => import("./pages/Academico.vue"),
  },
  {
    path: "/novo-academico",
    name: "NovoAcademico",
    component: () => import("./pages/NovoAcademico.vue"),
  },
];
