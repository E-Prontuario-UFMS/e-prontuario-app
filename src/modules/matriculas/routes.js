export default [
  {
    path: "/matriculas",
    name: "Matriculas",
    component: () => import("./pages/MatriculasFirebase.vue"),
  },
  {
    path: "/nova-matricula",
    name: "NovaMatricula",
    component: () => import("./pages/NovaMatriculaFirebase.vue"),
  },
];
