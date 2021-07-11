<template>
  <v-container>
    <e-title title="Matriculas" route="/home" />

    <v-row justify="end" class="mr-3">
      <v-btn color="success" @click="goTo('/nova-matricula')">
        Matricular Aluno
      </v-btn>
    </v-row>
    <v-card class="my-5 mx-4">
      <v-data-table
        :headers="headers"
        :options="options"
        :items="matriculas"
      ></v-data-table>
    </v-card>
    <e-overlay :loading="loading"></e-overlay>
  </v-container>
</template>

<script>
  import { routerMixin, loadingMixin } from "@/mixins";
  import ETitle from "@/shared/components/ETitle.vue";
  import EOverlay from "@/shared/components/EOverlay.vue";
  import { efireMixin } from "../../../mixins";
  import { getAllMatriculas } from "../../../firebase/services/matricula";

  export default {
    mixins: [routerMixin, loadingMixin, efireMixin],
    components: { ETitle, EOverlay },
    data: () => ({
      loading: false,
      matriculas: [],
      headers: [
        {
          text: "Academico",
          value: "academico.nome",
        },
        { text: "Disciplina" },
        { text: "Matriculado em" },
      ],
      options: {},
    }),
    methods: {
      async loadMatriculas() {
        const response = await getAllMatriculas();
        console.log(response);
        this.matriculas = response;
      },
    },
    mounted() {
      this.loadMatriculas();
    },
  };
</script>

<style></style>
