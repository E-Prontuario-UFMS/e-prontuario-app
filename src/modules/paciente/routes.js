export default [
  {
    path: "pacientes",
    name: "Pacientes",
    component: () => import("./pages/PacientesFirebase"),
  },
  {
    path: "paciente/novo-paciente",
    name: "NovoPaciente",
    component: () => import("./pages/NovoPacienteFirebase"),
  },
  {
    path: "paciente/editar-paciente/:id",
    name: "EditarPaciente",
    component: () => import("./pages/EditarPacienteFirebase"),
  },
  {
    path: "paciente/:id",
    name: "Paciente",
    component: () => import("./pages/PacienteFirebase.vue"),
  },
];
