<template>
  <v-container>
    <e-title title="Matriculas" route="/home"> </e-title>

    <v-card class="my-5">
      <v-data-table :headers="headers" :items="matriculasPagination.content">
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">More info about {{ item.name }}</td>
        </template>
      </v-data-table>
    </v-card>
    <e-overlay :loading="loading"></e-overlay>
  </v-container>
</template>

<script>
  import { routerMixin } from "@/mixins";
  import ETitle from "@/shared/components/ETitle.vue";
  import EOverlay from "@/shared/components/EOverlay.vue";

  import { fetchMatriculas } from "../services";
  export default {
    mixins: [routerMixin],
    components: { ETitle, EOverlay },
    data: () => ({
      matriculasPagination: {},
      loading: false,
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
        this.matriculasPagination = await fetchMatriculas(this.page);
      },
    },
    mounted() {
      this.loadMatriculas();
    },
  };
</script>

<style></style>
