<template>
  <v-card>
    <v-card-title>{{ documentos.titulo }}</v-card-title>
    <v-card-text
      v-for="documento in documentos.itensDocumentos"
      :key="documento.tituloItemDocumento"
    >
      <v-textarea
        :label="documento.tituloItemDocumento"
        rows="2"
        v-model="preenchido[documento.tituloItemDocumento]"
        disabled
      ></v-textarea>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    props: {
      documentos: {
        type: Object,
        required: true,
        default: () => {},
      },
      preenchido: {
        type: Object,
        required: true,
        default: () => {},
      },
    },
  };
</script>

<style></style>
