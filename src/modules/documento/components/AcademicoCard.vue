<template>
  <v-card v-if="enfermeiro">
    <v-card-title>
      Academico
    </v-card-title>
    <v-card-text> Nome: {{ enfermeiro.nome }} </v-card-text>
    <v-card-text> RGA: {{ enfermeiro.rga }} </v-card-text>
  </v-card>
</template>

<script>
  export default {
    props: ["enfermeiro"],
    name: "AcademicoCard",
  };
</script>

<style scoped></style>
