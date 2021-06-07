export const constroiNumberFormSchema = controlesItems => {
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
    case "DOUBLE":
      return {
        type: "number",
        title: controleItem.tituloItemDocumento,
        "x-props": {
          outlined: true,
        },
      };
    case "INTEGER":
      return {
        type: "number",
        title: controleItem.tituloItemDocumento,
      };
  }
};
