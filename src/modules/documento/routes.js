export default [
  {
    path: "documento",
    name: "Documento",
    component: () => import("./pages/DocumentoDisciplinaFirebase"),
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
  {
    path: "alocar-documento/:id",
    name: "AlocarDocumento",
    component: () => import("./pages/AlocarDocumentoFirebase.vue"),
  },
];
