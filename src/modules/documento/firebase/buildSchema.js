export const buildTextSchema = ({ itensDocumentos }) => {
  let properties = {};
  itensDocumentos.forEach(item => {
    properties[item.tituloItemDocumento] = constroiTextItemProperty(item);
  });

  const required = itensDocumentos
    .filter(item => item.tipo === "STRING")
    .map(item => item.tituloItemDocumento);
  return {
    type: "object",
    required: [...required],
    properties: properties,
  };
};

const constroiTextItemProperty = controleItem => {
  switch (controleItem.tipo) {
    case "STRING":
      return {
        type: "string",

        title: controleItem.tituloItemDocumento,
        "x-props": {
          outlined: true,
        },
        "x-class": "col-lg-5 col-sm-11",
      };
  }
};

export const buildDataSchema = ({ itensDocumentos }) => {
  let properties = {};
  itensDocumentos.forEach(item => {
    properties[item.tituloItemDocumento] = constroiDataItemProperty(item);
  });

  return {
    type: "object",
    properties: properties,
  };
};

const constroiDataItemProperty = controleItem => {
  switch (controleItem.tipo) {
    case "DATETIME":
      return {
        type: "string",
        format: "date-time",
        title: controleItem.tituloItemDocumento,
        "x-options": {
          locale: "pt-br",
        },
        "x-props": {
          outlined: true,
        },
        "x-class": "ml-4 mr-4 mx-auto col-sm-5 col-lg-5",
      };
  }
};

export const buildBooleanSchema = ({ itensDocumentos }) => {
  let properties = {};

  itensDocumentos.forEach(item => {
    properties[item.tituloItemDocumento] = constroiBooleanItemProperty(item);
  });

  return {
    type: "object",
    properties: properties,
  };
};

const constroiBooleanItemProperty = controleItem => {
  switch (controleItem.tipo) {
    case "BOOLEAN":
      return {
        type: "boolean",
        "x-display": "switch",
        title: controleItem.tituloItemDocumento,
        "x-class": "ml-4 mr-4 col-sm-6 col-md-4",
      };
  }
};

export const buildNumberSchema = ({ itensDocumentos }) => {
  let properties = {};

  itensDocumentos.forEach(item => {
    properties[item.tituloItemDocumento] = constroiNumberItemProperty(item);
  });

  return {
    type: "object",
    properties: properties,
  };
};

const constroiNumberItemProperty = controleItem => {
  switch (controleItem.tipo) {
    case "NUMBER":
      return {
        type: "number",
        title: controleItem.tituloItemDocumento,
        "x-props": {
          outlined: true,
        },
        "x-class": "ml-4 mr-4 col-sm-6 col-md-4",
      };
  }
};
