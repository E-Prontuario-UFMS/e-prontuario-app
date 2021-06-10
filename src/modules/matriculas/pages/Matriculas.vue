<template>
  <v-container>
    <e-title title="Matriculas" route="/home"> </e-title>

    <v-row justify="end" class="mr-3">
      <v-btn color="success" @click="goTo('/nova-matricula')">
        Matricular Aluno
      </v-btn>
    </v-row>
    <v-card class="my-5 mx-4">
      <v-data-table
        :headers="headers"
        :items="matriculasPagination.content"
        :options.sync="options"
        :server-items-length.sync="matriculasPagination.totalElements"
        :loading="loading"
        :page.sync="page"
      >
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">More info about {{ item.name }}</td>
        </template>
      </v-data-table>
    </v-card>
    <e-overlay :loading="loading"></e-overlay>
  </v-container>
</template>

<script>
  import { routerMixin, loadingMixin } from "@/mixins";
  import ETitle from "@/shared/components/ETitle.vue";
  import EOverlay from "@/shared/components/EOverlay.vue";

  import { fetchMatriculas } from "../services";
  export default {
    mixins: [routerMixin, loadingMixin],
    components: { ETitle, EOverlay },
    data: () => ({
      matriculasPagination: {},
      loading: false,
      options: {},
      headers: [
        {
          text: "Academico",
          value: "academico",
        },
      ],
      page: 0,
    }),
    methods: {
      async loadMatriculas() {
        this.startLoading();
        this.matriculasPagination = await fetchMatriculas(this.page);
        this.stopLoading();
      },
    },
    mounted() {
      this.loadMatriculas();
    },
  };
</script>

<style></style>
