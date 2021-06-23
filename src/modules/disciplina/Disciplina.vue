<template>
  <v-container>
    <e-title
      :title="disciplina.nome"
      route="/configuracoes/disciplinas"
    ></e-title>
    <v-card class="my-5">
      <v-card-title>
        Professor Responsavel: {{ professor.nome }} || {{ professor.siap }}
      </v-card-title>
      <v-card-text>
        {{ disciplina }}
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import { routerMixin } from "@/mixins";
  import ETitle from "../../shared/components/ETitle.vue";
  import {
    fetchDisciplinaById,
    fetchProfessorByDisciplinaId,
  } from "../../firebase/services/disciplina";
  export default {
    components: { ETitle },
    mixins: [routerMixin],
    data: () => ({
      disciplina: {
        nome: "",
      },
      professor: {},
      loading: true,
    }),
    methods: {
      async loadDisciplina() {
        const { id } = this.$route.params;
        const disciplina = await fetchDisciplinaById(id);
        this.disciplina = disciplina;
        this.loadProfessorResponsavel();
      },
      async loadProfessorResponsavel() {
        const { id } = this.$route.params;
        const response = await fetchProfessorByDisciplinaId(id);
        this.professor = response;
      },
    },
    mounted() {
      this.loadDisciplina();
    },
  };
</script>
