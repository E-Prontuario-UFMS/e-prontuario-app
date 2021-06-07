export const constroiDataFormSchema = controlesItems => {
  let properties = {};

  controlesItems.forEach(item => {
    properties[item.tituloItemDocumento] = constroiItemProperty(item);
  });

  return {
    type: "object",
    properties: properties,
  };
};

const constroiItemProperty = controleItem => {
  switch (controleItem.tipoItem) {
    case "DATAHORA":
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
