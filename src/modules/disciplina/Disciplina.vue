<template>
  <v-container>
    <e-title
      :title="disciplina.titulo"
      route="/configuracoes/disciplinas"
    ></e-title>
    <v-card class="my-5" v-if="!loading">
      <v-card-title>
        Responsavel: {{ disciplina.professorPojo.nome }}
      </v-card-title>
      <v-card-text> </v-card-text>
    </v-card>
    <e-overlay :loading="loading"></e-overlay>
  </v-container>
</template>

<script>
  import { routerMixin } from "@/mixins";
  import { fetchDisciplinaById } from "./services";
  import EOverlay from "../../shared/components/EOverlay.vue";
  import ETitle from "../../shared/components/ETitle.vue";
  export default {
    components: { EOverlay, ETitle },
    mixins: [routerMixin],
    data: () => ({
      disciplina: {
        titulo: "",
        professorPojo: {
          nome: "",
        },
      },
      loading: true,
    }),
    methods: {
      async loadDisciplina() {
        this.loading = true;
        const { id } = this.$route.params;
        const { data: disciplina } = await fetchDisciplinaById(id);
        this.disciplina = disciplina;
        this.loading = false;
      },
    },
    mounted() {
      this.loadDisciplina();
    },
  };
</script>

<style></style>
