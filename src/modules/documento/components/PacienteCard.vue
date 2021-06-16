<template>
  <v-card>
    <v-card-title>Paciente</v-card-title>
    <v-card-text>Nome: {{ paciente.nome }}</v-card-text>
    <v-card-text>Cpf: {{ paciente.cpf }}</v-card-text>
    <v-card-text>Genero: {{ paciente.genero }}</v-card-text>
  </v-card>
</template>

<script>
  export default {
    props: ["paciente"],
    name: "PacienteCard",
  };
</script>

<style scoped></style>
