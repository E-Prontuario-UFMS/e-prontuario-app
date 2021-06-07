<template>
  <v-card>
    <v-row class="d-flex justify-center pl-6 pr-6 pt-6" fluid dense>
      <v-col>
        <v-text-field
          dense
          label="Pesquise"
          outlined
          append-icon="mdi-magnify"
          v-model="search"
        />
      </v-col>
      <v-col cols="3">
        <v-select
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
                  :items="modelosDeDocumento"
                  class="elevation-1"
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

  export default {
    name: "TabelaDocumento",
    data: () => ({
      headers: [],
      documentos: [],
      search: "",
    }),
    computed: {
      ...mapState("documento", ["modelosDeDocumento"]),
      ...mapState("login", ["usuario"]),
    },
    created() {
      this.headers = this.criarHeaderDaTabela();
    },

    methods: {
      goTo(item) {
        this.$router.push({
          name: "PreencherDocumento",
          params: { titulo: item.tituloDocumento },
        });
      },
      criarHeaderDaTabela() {
        return [
          {
            text: "Título",
            align: "start",
            sortable: true,
            value: "tituloDocumento",
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
  };
</script>

<style scoped></style>
