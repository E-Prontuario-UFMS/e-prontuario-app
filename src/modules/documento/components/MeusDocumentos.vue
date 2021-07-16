<template>
  <v-card>
    <v-autocomplete
      v-model="search"
      class="mx-6 mt-4"
      outlined
      label="Pesquise"
      :items="modelos"
      item-text="documento.titulo"
      clearable
    ></v-autocomplete>
    <v-data-table
      :items="modelos"
      :headers="headers"
      :search="search"
      :options="options"
      class="mx-6"
    >
      <template v-slot:item.acoes="{ item }">
        <tr>
          <td>
            <v-btn icon @click="goTo(`/home/documento-preenchido/${item.id}`)">
              <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
  import { mapGetters } from "vuex";
  import { fetchDocumentosPreenchidosById } from "../../../firebase/services/documento";
  import { routerMixin } from "../../../mixins";
  export default {
    mixins: [routerMixin],
    data: () => ({
      modelos: [],
      search: "",
      options: {},
    }),
    computed: {
      ...mapGetters("login", ["authId"]),
      headers() {
        return [
          {
            text: "Nome",
            value: "documento.titulo",
          },
          {
            text: "Acões",
            value: "acoes",
          },
        ];
      },
    },
    methods: {
      async loadMyDocuments() {
        const response = await fetchDocumentosPreenchidosById(this.authId);
        this.modelos = response;
      },
    },
    mounted() {
      this.loadMyDocuments();
    },
  };
</script>

<style></style>
