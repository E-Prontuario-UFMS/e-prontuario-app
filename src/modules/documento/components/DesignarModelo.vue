<template>
  <v-container>
    <h4 class="my-2">Disciplinas</h4>
    <v-card
      v-for="disciplina in disciplinas"
      :key="disciplina.id"
      class="my-3"
      ripple
      elevation="10"
      hover
      @click="goTo(`/home/alocar-documento/${disciplina.id}`)"
    >
      <v-card-title>{{ disciplina.nome }}</v-card-title>
    </v-card>
  </v-container>
</template>

<script>
  import { efireMixin, routerMixin } from "../../../mixins";
  export default {
    components: {},
    mixins: [efireMixin, routerMixin],
    data: () => ({
      modelos: [],
      disciplinas: [],
      modelosSelecionados: [],
    }),
  };
</script>
