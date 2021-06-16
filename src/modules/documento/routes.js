export default [
  {
    path: "documento",
    name: "Documento",
    component: () => import("./pages/Documento"),
  },
  {
    path: "novo-documento",
    name: "NovoDocumento",
    component: () => import("./pages/NovoDocumentoStepperFirebase"),
  },
  {
    path: "documento/:titulo",
    name: "PreencherDocumento",
    component: () => import("./pages/PreencherDocumentoFirebase"),
  },
  {
    path: "documentos-preenchidos",
    name: "DocumentosPreenchidos",
    component: () => import("./pages/DocumentosPreenchidosFirebase"),
  },
  {
    path: "documento-preenchido/:id",
    name: "DocumentoPreenchidoComId",
    component: () => import("./pages/DocumentoPreenchidoIdFirebase"),
  },
];
