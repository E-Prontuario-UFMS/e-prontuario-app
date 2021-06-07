<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="disciplinasPagination.content"
      :options.sync="options"
      :server-items-length.sync="disciplinasPagination.totalElements"
      :loading="loading"
      :page.sync="page"
      class="elevation-1"
    >
      <template v-slot:item.acoes="{ item }">
        <tr>
          <td>
            <div style="float: right">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon @click="goTo(`/professor/${item.id}`)">
                    <v-icon color="primary" dark v-bind="attrs" v-on="on">
                      mdi-arrow-right
                    </v-icon>
                  </v-btn>
                </template>
                <span>Acessar Disciplina</span>
              </v-tooltip>

              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon>
                    <v-icon color="warning" dark v-bind="attrs" v-on="on">
                      mdi-pencil
                    </v-icon>
                  </v-btn>
                </template>
                <span>Editar Disciplina</span>
              </v-tooltip>

              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon @click="handleDeleteProfessor(item)">
                    <v-icon color="error" dark v-bind="attrs" v-on="on">
                      mdi-delete
                    </v-icon>
                  </v-btn>
                </template>
                <span>Deletar Disciplina</span>
              </v-tooltip>
            </div>
          </td>
        </tr>
      </template></v-data-table
    >
    <e-overlay :loading="loading"></e-overlay>
  </v-container>
</template>

<script>
  import EOverlay from "../../../shared/components/EOverlay.vue";
  import { getDisciplinas } from "../../disciplina/services";

  export default {
    components: { EOverlay },
    data: () => ({
      headers: [
        { text: "Nome", value: "titulo" },
        { text: "Professor", value: "professorPojo.nome" },
        { text: "Ações", value: "acoes" },
      ],
      disciplinasPagination: {},
      loading: false,
      page: 1,
      options: {},
    }),
    methods: {
      async loadDisciplinas() {
        this.loading = true;
        const { data } = await getDisciplinas({ page: this.page - 1 });
        console.log(data);
        this.disciplinasPagination = data;
        this.loading = false;
      },
    },
    mounted() {
      this.loadDisciplinas();
    },
  };
</script>

<style></style>
