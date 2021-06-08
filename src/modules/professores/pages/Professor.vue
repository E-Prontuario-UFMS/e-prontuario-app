<template>
  <v-container>
    <v-row class="mt-5">
      <v-btn icon class="mr-5" @click="goBack()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <h2>{{ professor.nome }}</h2>
    </v-row>
    <e-overlay :loading="loading"></e-overlay>
  </v-container>
</template>

<script>
  import EOverlay from "../../../shared/components/EOverlay.vue";
  import { getProfessorById } from "../services";
  import routerMixin from "@/mixins/router.mixin";
  export default {
    mixins: [routerMixin],
    components: { EOverlay },
    data: () => ({
      professor: {},
      loading: false,
    }),
    methods: {
      async handleGetProfessorById() {
        this.loading = true;
        const id = this.$route.params.id;
        const { data } = await getProfessorById(id);
        this.professor = data;
        this.loading = false;
      },
    },
    mounted() {
      this.handleGetProfessorById();
    },
    // TODO: Verificar se existe a possibilidade de buscar as disciplinas pertencentes a esse professor
  };
</script>

<style></style>
