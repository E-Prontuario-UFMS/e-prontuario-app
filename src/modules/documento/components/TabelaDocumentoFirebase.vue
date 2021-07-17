<template>
  <v-card>
    <v-row class="d-flex justify-center pl-6 pr-6 pt-6" fluid dense>
      <v-col cols="auto" md="9" sm="12">
        <v-autocomplete
          dense
          :items="modelos"
          label="Pesquise pelo titulo"
          outlined
          item-text="titulo"
          append-icon="mdi-magnify"
          v-model="search"
          clearable
        />
      </v-col>
      <v-col cols="auto" md="3" sm="12" v-if="false">
        <v-select
          clearable
          outlined
          dense
          label="Filtros"
          :items="['Novo', 'Em Uso', 'Deletado']"
        />
      </v-col>
    </v-row>
    <v-row
      class="d-flex justify-end pl-6 pr-6  ma-0"
      fluid
      dense
      v-if="usuario.role === 'PROFESSOR'"
    >
      <v-btn color="success" style="text-decoration:none;" to="novo-documento">
        <v-icon>
          mdi-plus
        </v-icon>
        Adicionar novo
      </v-btn>
    </v-row>
    <v-row class="d-flex  pl-6 pr-6 pt-6" fluid dense>
      <v-col class="justify-center">
        <div
          style="border-bottom: 2px solid #1e4ffa;border-top: 2px solid #1e4ffa;"
        >
          <v-simple-table>
            <template>
              <div>
                <v-data-table
                  :headers="headers"
                  :items="modelos"
                  class="elevation-1"
                  :search="search"
                >
                  <template v-slot:item.acoes="{ item }">
                    <tr>
                      <td>
                        <div style="float: right">
                          <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn icon>
                                <v-icon
                                  color="primary"
                                  dark
                                  v-bind="attrs"
                                  v-on="on"
                                  @click="goTo(item)"
                                >
                                  mdi-arrow-right
                                </v-icon>
                              </v-btn>
                            </template>
                            <span>Acessar Documento</span>
                          </v-tooltip>

                          <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn icon>
                                <v-icon
                                  color="warning"
                                  dark
                                  v-bind="attrs"
                                  v-on="on"
                                >
                                  mdi-pencil
                                </v-icon>
                              </v-btn>
                            </template>
                            <span>Editar Documento</span>
                          </v-tooltip>

                          <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn icon>
                                <v-icon
                                  color="error"
                                  dark
                                  v-bind="attrs"
                                  v-on="on"
                                >
                                  mdi-delete
                                </v-icon>
                              </v-btn>
                            </template>
                            <span>Deletar Documento</span>
                          </v-tooltip>
                        </div>
                      </td>
                    </tr>
                  </template>
                </v-data-table>
              </div>
            </template>
          </v-simple-table>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
  import { mapState } from "vuex";
  import { efireMixin } from "@/mixins";

  export default {
    name: "TabelaDocumento",
    mixins: [efireMixin],
    data: () => ({
      headers: [],
      search: "",
      modelos: [],
      searchedModels: [],
    }),
    computed: {
      ...mapState("login", ["usuario"]),
    },
    created() {
      this.headers = this.criarHeaderDaTabela();
    },

    methods: {
      goTo(item) {
        this.$router.push({
          name: "PreencherDocumento",
          params: { titulo: item.id },
        });
      },

      criarHeaderDaTabela() {
        return [
          {
            text: "Título",
            align: "start",
            sortable: true,
            value: "titulo",
            width: "35%",
          },
          {
            text: "Descrição",
            value: "descricao",
            sortable: false,
            width: "50%",
          },
          {
            text: "Ações",
            align: "center",
            value: "acoes",
            sortable: false,
            width: "20%",
          },
        ];
      },
    },
    watch: {
      search(value) {
        console.log(value);
      },
    },
  };
</script>

<style scoped></style>
