<template>
  <v-card v-if="academico">
    <v-card-title>
      Academico
    </v-card-title>
    <v-card-text> Nome: {{ academico.nome }} </v-card-text>
    <v-card-text> RGA: {{ academico.rga }} </v-card-text>
  </v-card>
</template>

<script>
  export default {
    props: ["academico"],
    name: "AcademicoCard",
  };
</script>

<style scoped></style>
