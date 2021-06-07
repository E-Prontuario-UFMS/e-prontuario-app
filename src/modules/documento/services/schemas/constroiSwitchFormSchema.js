export const constroiSwitchFormSchema = controlesItems => {
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
    case "BOOLEAN":
      return {
        type: "boolean",
        "x-display": "switch",
        title: controleItem.tituloItemDocumento,
        "x-class": "ml-4 mr-4 col-sm-6 col-md-4",
      };
  }
};
