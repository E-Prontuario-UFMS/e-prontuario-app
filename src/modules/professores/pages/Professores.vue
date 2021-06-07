<template>
  <v-container>
    <v-row class="mt-5">
      <v-btn icon class="mr-5" @click="goTo('/configuracoes')">
        <v-icon>
          mdi-arrow-left
        </v-icon>
      </v-btn>
      <h2>Professores</h2>
    </v-row>

    <v-row justify="end" class="mr-5 mb-5">
      <v-btn color="success" @click="goTo('/novo-professor')"
        >Adicionar Professor</v-btn
      >
    </v-row>
    <v-card class="m-3" elevation="5">
      <v-data-table
        :headers="headers"
        :items="professoresPagination.content"
        :options.sync="options"
        :server-items-length.sync="professoresPagination.totalElements"
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
                  <span>Acessar Professor</span>
                </v-tooltip>

                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon @click="goTo(`/editar-professor/${item.id}`)">
                      <v-icon color="warning" dark v-bind="attrs" v-on="on">
                        mdi-pencil
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>Editar Professor</span>
                </v-tooltip>

                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon @click="handleDeleteProfessor(item)">
                      <v-icon color="error" dark v-bind="attrs" v-on="on">
                        mdi-delete
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>Deletar Professor</span>
                </v-tooltip>
              </div>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
  import { getProfessoresFromApi, deleteProfessor } from "../services";
  import routerMixin from "../../../mixins/router.mixin";
  export default {
    mixins: [routerMixin],
    data: () => ({
      headers: [
        { text: "Nome", value: "nome" },
        { text: "SIAP", value: "siap" },
        { text: "Ações", value: "acoes" },
      ],
      page: 0,
      options: {},
      loading: false,
      professoresPagination: {},
      pagination: {},
    }),
    methods: {
      async getProfessores() {
        this.loading = true;
        const { data } = await getProfessoresFromApi({ page: this.page - 1 });
        this.professoresPagination = data;
        this.loading = false;
      },
      async handleDeleteProfessor(professor) {
        this.loading = true;
        const response = await deleteProfessor(professor.id);
        console.log(response);
        this.loading = false;
        this.getProfessores();
      },
    },
    mounted() {
      this.getProfessores();
    },
    watch: {
      page: {
        handler() {
          this.getProfessores();
        },
      },
    },
  };
</script>

<style></style>
