export default [
  {
    path: "/matriculas",
    name: "Matriculas",
    component: () => import("./pages/Matriculas.vue"),
  },
  {
    path: "/nova-matricula",
    name: "NovaMatricula",
    component: () => import("./pages/NovaMatricula.vue"),
  },
];
