<template>
  <v-container>
    <e-title title="Matriculas" route="/home"> </e-title>

    <v-row justify="end" class="mr-3">
      <v-btn color="success" @click="goTo('/nova-matricula')">
        Matricular Aluno
      </v-btn>
    </v-row>
    <v-card class="my-5 mx-4" v-if="!loading">
      <!-- <v-expansion-panels accordion>
        <v-expansion-panel
          v-for="item in matriculasPagination.content"
          :key="item.id"
        >
          <v-expansion-panel-header>Item</v-expansion-panel-header>
          <v-expansion-panel-content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels> -->
      <v-data-table
        :headers="headers"
        :items="matriculasPagination.content"
        :options.sync="options"
        :server-items-length.sync="matriculasPagination.totalElements"
        :loading="loading"
        :page.sync="page"
        class="elevation-1"
        single-expand
        show-expand
        :expanded.sync="expanded"
      >
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            {{ item }}
          </td>
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
      page: 0,
      expanded: [],
      headers: [
        {
          text: "Academico",
          value: "academico.nome",
        },
      ],
      options: {},
    }),
    methods: {
      async loadMatriculas() {
        this.startLoading();
        const { data: matriculas } = await fetchMatriculas(this.page);
        this.matriculasPagination = matriculas;
        console.log(this.matriculasPagination);
        this.stopLoading();
      },
    },
    mounted() {
      this.loadMatriculas();
    },
  };
</script>

<style></style>
