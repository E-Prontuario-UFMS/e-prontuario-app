<template>
  <v-container>
    <e-title title="Documentos" route="/home"></e-title>

    <v-card class="my-5 mx-auto">
      <v-tabs v-model="tab">
        <v-tab>{{ this.tabTitle[0] }}</v-tab>
        <v-tab>{{ this.tabTitle[1] }}</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-row justify="end" v-if="isProfessor">
            <v-btn
              color="success"
              class="my-3 mx-5"
              @click="goTo('novo-documento')"
            >
              Adicionar Novo
            </v-btn>
          </v-row>
          <v-data-table
            :headers="headers"
            :items="disciplinas"
            single-expand
            show-expand
          >
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length" v-if="item.modelos.length > 0">
                <v-card
                  class="pa-2 ma-5"
                  elevation="10"
                  v-for="modelo in item.modelos"
                  :key="modelo.id"
                  ripple
                  raised
                >
                  <v-row>
                    <v-col cols="9">
                      <span class="font-weight-bold text-h6">
                        {{ modelo.titulo }}
                      </span>
                    </v-col>
                    <v-col cols="3">
                      <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn icon>
                            <v-icon
                              color="primary"
                              dark
                              v-bind="attrs"
                              v-on="on"
                              @click="goTo('documento/' + modelo.id)"
                            >
                              mdi-arrow-right
                            </v-icon>
                          </v-btn>
                        </template>
                        <span>Acessar Documento</span>
                      </v-tooltip>
                    </v-col>
                  </v-row>
                </v-card>
              </td>
            </template>
          </v-data-table>
        </v-tab-item>
        <v-tab-item>
          <documentos-preenchidos-firebase></documentos-preenchidos-firebase>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
  import { mapGetters } from "vuex";
  import { efireMixin, routerMixin } from "../../../mixins";
  import ETitle from "../../../shared/components/ETitle.vue";
  import DocumentosPreenchidosFirebase from "./DocumentosPreenchidosFirebase.vue";

  export default {
    mixins: [efireMixin, routerMixin],
    components: { ETitle, DocumentosPreenchidosFirebase },
    computed: {
      ...mapGetters("login", ["isProfessor"]),
    },
    data: () => ({
      disciplinas: [],
      tab: null,
      tabTitle: ["Documentos", "Documentos Preenchidos"],
      headers: [
        {
          text: "Nome",
          value: "nome",
        },
      ],
    }),
    methods: {
      loadDocumentosFromDisciplinas() {},
    },
    mounted() {
      console.log(this);
    },
  };
</script>

<style></style>
