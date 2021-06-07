<template>
  <v-card v-if="entrada" class="lg6 sm12">
    <v-card-title>
      Entrada
    </v-card-title>
    <v-card-text>Data: {{ new Date(entrada.dataHora) | date }}</v-card-text>
  </v-card>
</template>

<script>
import { createDateFilter } from 'vue-date-fns'
import locale from 'date-fns/locale/pt-BR'

  export default {
  filters: {
    date: createDateFilter('dd MMMM yyyy | hh:mm:ss', { locale })
  },
    props: ["entrada"],
    name: "EntradaCard",
  };
</script>

<style scoped></style>
