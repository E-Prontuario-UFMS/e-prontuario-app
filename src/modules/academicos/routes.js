export default [
  {
    path: "/academicos",
    name: "Academicos",
    component: () => import("./pages/AcademicosFirebase.vue"),
  },
  {
    path: "/academico/:id",
    name: "Academico",
    component: () => import("./pages/AcademicoFirebase.vue"),
  },
  {
    path: "/novo-academico",
    name: "NovoAcademico",
    component: () => import("./pages/NovoAcademico.vue"),
  },
];
