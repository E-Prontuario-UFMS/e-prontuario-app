export default [
  {
    path: "pacientes",
    name: "Pacientes",
    component: () => import("./pages/Pacientes"),
  },
  {
    path: "paciente/novo-paciente",
    name: "NovoPaciente",
    component: () => import("./pages/NovoPaciente"),
  },
  {
    path: "paciente/editar-paciente/:id",
    name: "EditarPaciente",
    component: () => import("./pages/EditarPaciente"),
  },
  {
    path: "paciente/:id",
    name: "Paciente",
    component: () => import("./pages/Paciente.vue"),
  },
];
