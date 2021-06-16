<template>
  <v-card>
    <v-card-title> {{ documento.titulo }}</v-card-title>
    <v-card-subtitle>{{ documento.descricao }}</v-card-subtitle>
  </v-card>
</template>

<script>
  export default {
    props: {
      documento: {
        type: Object,
        required: true,
      },
    },
  };
</script>

<style></style>
