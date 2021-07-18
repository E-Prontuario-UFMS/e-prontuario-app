<template>
  <v-container>
    <e-title :title="disciplina.nome" route="/configuracoes/disciplinas">
    </e-title>
    <v-card class="my-5" v-if="this.hasProfessorDesignado">
      <v-card-title v-if="this.hasProfessorDesignado">
        Professores Responsaveis
      </v-card-title>
      <v-card-subtitle v-for="professor in professores" :key="professor.authId">
        {{ professor.nome }}
      </v-card-subtitle>
    </v-card>
    <v-card class="my-5" v-if="!this.hasProfessorDesignado">
      <v-card-title>
        Não existe professor designado ainda
      </v-card-title>
      <v-card-actions>
        <v-btn
          @click="goTo(`/configuracoes/disciplinas/designar/${getRouteId}`)"
        >
          Designar Professor
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card v-if="this.hasMoreThanOneModels">
      <v-card-title>
        Modelos Relacionados
      </v-card-title>
      <v-list>
        <v-list-item
          v-for="modelo in modelos"
          :key="modelo.id"
          ripple
          shaped
          dense
        >
          <v-list-item-title>{{ modelo.titulo }}</v-list-item-title>
          <v-list-item-action>
            <v-btn icon>
              <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
    <alunos-matriculados :alunos="alunos" />
  </v-container>
</template>

<script>
  import { routerMixin } from "@/mixins";
  import { ETitle } from "@/shared/components";
  import {
    fetchDisciplinaById,
    fetchProfessorByDisciplinaId,
    fetchAlunosByDisciplina,
  } from "../../firebase/services/disciplina";
  import { getModeloDocumentoByDisciplina } from "../../firebase/services/modeloDocumento";
  import AlunosMatriculados from "./components/AlunosMatriculados.vue";
  export default {
    components: { ETitle, AlunosMatriculados },
    mixins: [routerMixin],
    data: () => ({
      disciplina: {
        nome: "",
      },
      professores: [],
      loading: true,
      modelos: [],
      alunos: [],
    }),

    computed: {
      hasProfessorDesignado() {
        return this.professores.length > 0;
      },
      hasMoreThanOneModels() {
        return this.modelos.length > 0;
      },
    },

    methods: {
      async loadDisciplina() {
        this.disciplina = await fetchDisciplinaById(this.getRouteId);

        this.loadProfessorResponsavel();
        this.modelos = await getModeloDocumentoByDisciplina(this.getRouteId);

        this.loadAlunosByDisciplina();
      },

      async loadProfessorResponsavel() {
        this.professores = await fetchProfessorByDisciplinaId(this.getRouteId);
      },

      async loadAlunosByDisciplina() {
        const response = await fetchAlunosByDisciplina(this.getRouteId);
        this.alunos = response;
      },
    },

    mounted() {
      this.loadDisciplina();
    },
  };
</script>
