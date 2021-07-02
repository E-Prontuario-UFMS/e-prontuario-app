<template>
  <v-container>
    <e-title :title="disciplina.nome" route="/configuracoes/disciplinas">
    </e-title>
    <v-card class="my-5" v-if="this.hasProfessorDesignado">
      <v-card-title v-if="this.hasProfessorDesignado">
        Professor Responsavel: {{ professor.nome }}
      </v-card-title>

      <v-card-subtitle v-if="this.hasProfessorDesignado">
        Siap: {{ professor.siap }}
      </v-card-subtitle>
    </v-card>
    <v-card class="my-5" v-if="!this.hasProfessorDesignado">
      <v-card-title>
        Não existe professor designado ainda
      </v-card-title>
      <v-card-actions>
        <v-btn>Designar Professor</v-btn>
      </v-card-actions>
    </v-card>
    <v-card> </v-card>
  </v-container>
</template>

<script>
  import { routerMixin } from "@/mixins";
  import ETitle from "../../shared/components/ETitle.vue";
  import {
    fetchDisciplinaById,
    fetchProfessorByDisciplinaId,
  } from "../../firebase/services/disciplina";
  import { getModeloDocumentoByDisciplina } from "../../firebase/services/modeloDocumento";
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

    computed: {
      hasProfessorDesignado() {
        return !!this.professor.nome && !!this.professor.siap;
      },
    },

    methods: {
      async loadDisciplina() {
        const { id } = this.$route.params;
        const disciplina = await fetchDisciplinaById(id);
        this.disciplina = disciplina;
        this.loadProfessorResponsavel();
        const response = await getModeloDocumentoByDisciplina(id);
        console.log(response);
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
