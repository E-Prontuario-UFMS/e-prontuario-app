<template>
  <v-container>
    <e-title title="Documentos" route="/home"></e-title>

    <v-card class="my-5 mx-auto">
      <v-data-table
        :headers="headers"
        :items="disciplinas"
        single-expand
        show-expand
      >
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">More info about {{ item }}</td>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
  import { efireMixin } from "../../../mixins";
  import ETitle from "../../../shared/components/ETitle.vue";

  export default {
    mixins: [efireMixin],
    components: { ETitle },
    data: () => ({
      disciplinas: [],
      headers: [
        {
          text: "Nome",
          value: "nome",
        },
      ],
    }),
    methods: {},

    mounted() {
      console.log(this.disciplinas);
    },
  };
</script>

<style></style>
