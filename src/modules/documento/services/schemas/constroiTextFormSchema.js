export const constroiTextFormSchema = controlesItems => {
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
    case "STRING":
      return {
        type: "string",
        title: controleItem.tituloItemDocumento,
        "x-props": {
          outlined: true,
        },
        "x-class": "col-lg-5 col-sm-11",
        "x-style": "margin: 0px 2px",
      };
  }
};
