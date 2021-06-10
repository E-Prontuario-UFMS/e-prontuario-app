<template>
  <v-container>
    <e-title :title="academico.nome" route="/academicos"></e-title>

    <e-overlay :loading="loading"></e-overlay>
  </v-container>
</template>

<script>
  import EOverlay from "../../../shared/components/EOverlay.vue";
  import ETitle from "../../../shared/components/ETitle.vue";
  import { fetchAcademicoById } from "../services";
  export default {
    components: { ETitle, EOverlay },
    data: () => ({
      loading: true,
      academico: {
        nome: "",
        rga: "",
      },
    }),
    methods: {
      async loadAcademico() {
        this.loading = true;
        const { id } = this.$route.params;
        const { data: academico } = await fetchAcademicoById(id);

        this.academico = academico;
        this.loading = false;
      },
    },
    mounted() {
      this.loadAcademico();
    },
  };
</script>

<style></style>
