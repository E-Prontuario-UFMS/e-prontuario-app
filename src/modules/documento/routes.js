export default [
  {
    path: "documento",
    name: "Documento",
    component: () => import("./pages/Documento"),
  },
  {
    path: "novo-documento",
    name: "NovoDocumento",
    component: () => import("./pages/NovoDocumentoStepper"),
  },
  {
    path: "documento/:titulo",
    name: "PreencherDocumento",
    component: () => import("./pages/PreencherDocumento"),
  },
  {
    path: "documentos-preenchidos",
    name: "DocumentosPreenchidos",
    component: () => import("./pages/DocumentosPreenchidos"),
  },
  {
    path: "documento-preenchido/:id",
    name: "DocumentoPreenchidoComId",
    component: () => import("./pages/DocumentoPreenchidoId"),
  },
];
