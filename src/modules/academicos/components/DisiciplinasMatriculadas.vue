<template>
  <v-card>
    <v-card-title>
      Disciplinas Matriculadas
    </v-card-title>

    <v-list>
      <v-list-item v-for="disciplina in disciplinas" :key="disciplina.id">
        <v-list-item-content>
          <v-list-item-title>
            {{ disciplina.nome }}
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn fab small>
            <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
  import { getAllDisciplinasByAcademicoId } from "../../../firebase/services/academico";
  import { routerMixin } from "../../../mixins";
  export default {
    name: "DisciplinasMatriculadas",
    mixins: [routerMixin],
    props: {
      academico: {
        type: Object,
        default: () => {},
      },
    },
    data: () => ({
      disciplinas: [],
    }),

    methods: {
      async loadDisciplinasByAlunoId() {
        this.disciplinas = await getAllDisciplinasByAcademicoId(
          this.getRouteId,
        );
      },
    },

    mounted() {
      this.loadDisciplinasByAlunoId();
    },
  };
</script>

<style></style>
