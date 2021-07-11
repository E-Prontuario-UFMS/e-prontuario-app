<template>
  <v-container>
    <e-title :title="routeTitle" route="/home/disciplinas" />

    <v-card class="my-5 pa-4">
      <v-card-title>Pesquise o aluno por RGA</v-card-title>
      <v-form @submit.prevent="searchAcademicoByRga">
        <v-text-field outlined label="RGA" v-model="rga" required />
        <v-btn color="success" type="submit" outlined block :disabled="form">
          Pesquise
        </v-btn>
      </v-form>
    </v-card>

    <v-list v-if="hasSearchedAcademico">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            {{ searchedAcademico.nome }}
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn color="success" @click="handleMatricularAcademico">
            Matricular Aluno
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <v-card class="my-5">
      <v-card-title>Alunos Matriculados</v-card-title>
      <academicos-table class="my-1" :academicos="academicosMatriculados" />
    </v-card>
  </v-container>
</template>

<script>
  import {
    fetchAlunosByDisciplina,
    fetchDisciplinaById,
  } from "../../../firebase/services/disciplina";
  import { routerMixin, toastMixin } from "../../../mixins";
  import AcademicosTable from "@/shared/components/AcademicosTable.vue";
  import ETitle from "../../../shared/components/ETitle.vue";
  import { fetchAcademicoByRga } from "../../../firebase/services/academico";
  import { matriculaAluno } from "../../../firebase/services/matricula";
  export default {
    mixins: [routerMixin, toastMixin],
    components: { ETitle, AcademicosTable },
    computed: {
      routeTitle() {
        return `Alocar Aluno em ${this.disciplina.nome || ""}`;
      },
      hasSearchedAcademico() {
        return !!this.searchedAcademico.nome;
      },
    },
    data: () => ({
      form: false,
      rga: "",
      searchedAcademico: {},
      disciplina: {},
      academicosMatriculados: [],
    }),
    methods: {
      async loadDisciplina() {
        const response = await fetchDisciplinaById(this.getRouteId);
        this.disciplina = response;
        this.loadAcademicosMatriculados();
      },
      async loadAcademicosMatriculados() {
        const response = await fetchAlunosByDisciplina(this.getRouteId);
        this.academicosMatriculados = response;
      },
      async searchAcademicoByRga() {
        this.searchedAcademico = await fetchAcademicoByRga(this.rga);
      },
      async handleMatricularAcademico() {
        try {
          await matriculaAluno(this.searchedAcademico.id, this.getRouteId);
          this.throwSuccess("Aluno Matriculado");
          this.loadAcademicosMatriculados();
        } catch (err) {
          this.throwError("Algo deu errado");
        }
      },
    },
    mounted() {
      this.loadDisciplina();
    },
  };
</script>

<style></style>
