<template>
  <v-container>
    <e-title title="Professores" route="/configuracoes"> </e-title>

    <v-row justify="end" class="mr-5 mb-5">
      <v-btn color="success" @click="goTo('/novo-professor')">
        Adicionar Professor
      </v-btn>
    </v-row>
    <v-card class="m-3" elevation="5">
      <v-data-table
        :headers="headers"
        :items="professores"
        :options.sync="options"
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
  import { routerMixin } from "@/mixins";
  import { db } from "../../../firebase";
  import ETitle from "@/shared/components/ETitle.vue";
  import { PROFESSORES } from "../../../constants";
  export default {
    components: { ETitle },
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
      professores: [],
    }),
    methods: {
      async handleDeleteProfessor(item) {
        console.log(item);
      },
    },
    mounted() {
      console.log(this.professores);
    },
    firestore: {
      professores: db.collection(PROFESSORES),
    },
  };
</script>

<style></style>
