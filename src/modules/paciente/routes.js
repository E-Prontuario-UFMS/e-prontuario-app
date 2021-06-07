export default [
  {
    path: "paciente",
    name: "Paciente",
    component: () => import("./pages/Paciente"),
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
];
