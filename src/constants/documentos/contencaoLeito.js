export default {
  type: "object",
  properties: {
    dataHora: {
      type: "string",
      title: "Data e Hora",
      format: "date-time",
    },
    motivo: { type: "string", title: "Motivo" },
    tipo: { type: "string", title: "Tipo" },
    intercorrencias: {
      type: "array",
      title: "Intercorrencias",
      description: "This description is used as a help message.",
      "x-itemTitle": "titleProp",
      items: {
        type: "object",
        required: ["titleProp"],
        properties: {
          titleProp: {
            type: "string",
            title: "Digite nova intercorrencia",
          },
        },
      },
    },
    providencias: {
      type: "array",
      title: "Providencias",
      description: "This description is used as a help message.",
      "x-itemTitle": "titleProp",
      items: {
        type: "object",
        required: ["titleProp"],
        properties: {
          titleProp: {
            type: "string",
            title: "Digite nova Providencia",
          },
        },
      },
    },
  },
};
