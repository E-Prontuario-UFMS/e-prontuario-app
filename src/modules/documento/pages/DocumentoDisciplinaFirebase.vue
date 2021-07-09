<template>
  <v-container>
    <e-title title="Documentos" route="/home"></e-title>

    <v-card class="my-5 mx-auto">
      <v-tabs v-model="tab">
        <v-tab v-for="tabTitle in tabsTitles" :key="tabTitle">
          {{ tabTitle }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-data-table
            :headers="headers"
            :items="disciplinas"
            single-expand
            show-expand
          >
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length" v-if="item.modelos.length > 0">
                <v-list-item
                  v-for="modelo in item.modelos"
                  :key="modelo.id"
                  ripple
                  raised
                  dense
                  @click="goTo('documento/' + modelo.id)"
                >
                  <v-list-item-title>
                    {{ modelo.titulo }}
                  </v-list-item-title>
                  <v-list-item-action>
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
                  </v-list-item-action>
                </v-list-item>
              </td>
            </template>
          </v-data-table>
        </v-tab-item>
        <v-tab-item>
          <documentos-preenchidos-firebase></documentos-preenchidos-firebase>
        </v-tab-item>
        <v-tab-item>
          <tabela-documento-firebase></tabela-documento-firebase>
        </v-tab-item>
        <v-tab-item>
          <designar-modelo></designar-modelo>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    <div class="fixedButton">
      <v-btn
        v-if="isProfessor"
        fab
        @click="goTo('novo-documento')"
        color="success"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
  import { mapGetters } from "vuex";
  import { efireMixin, routerMixin } from "../../../mixins";
  import ETitle from "../../../shared/components/ETitle.vue";
  import DesignarModelo from "../components/DesignarModelo.vue";
  import TabelaDocumentoFirebase from "../components/TabelaDocumentoFirebase.vue";
  import DocumentosPreenchidosFirebase from "./DocumentosPreenchidosFirebase.vue";

  export default {
    mixins: [efireMixin, routerMixin],
    components: {
      ETitle,
      DocumentosPreenchidosFirebase,
      TabelaDocumentoFirebase,
      DesignarModelo,
    },
    computed: {
      ...mapGetters("login", ["isProfessor"]),
    },
    data: () => ({
      disciplinas: [],
      tab: null,
      tabsTitles: [
        "Documentos Por Disciplina",
        "Documentos Preenchidos",
        "Todos Modelos",
        "Designar Documentos",
      ],
      headers: [
        {
          text: "Nome",
          value: "nome",
        },
      ],
    }),
  };
</script>

<style scoped>
  .fixedButton {
    position: absolute;
    right: 5vw;
    bottom: 5vh;
  }
</style>
