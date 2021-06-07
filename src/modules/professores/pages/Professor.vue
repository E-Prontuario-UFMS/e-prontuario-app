<template>
  <v-container>
    <v-row
      ><h2>{{ professor.nome }}</h2></v-row
    >

    <e-overlay :loading="loading"></e-overlay>
  </v-container>
</template>

<script>
  import EOverlay from "../../../shared/components/EOverlay.vue";
  import { getProfessorById } from "../services";
  export default {
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
  };
</script>

<style></style>
