<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="disciplinas"
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
                  <v-btn icon @click="goTo(`/home/disciplina/${item.id}`)">
                    <v-icon color="primary" dark v-bind="attrs" v-on="on">
                      mdi-arrow-right
                    </v-icon>
                  </v-btn>
                </template>
                <span>Acessar Disciplina</span>
              </v-tooltip>

              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    @click="goTo(`/configuracoes/disciplina/${item.id}`)"
                  >
                    <v-icon color="warning" dark v-bind="attrs" v-on="on">
                      mdi-pencil
                    </v-icon>
                  </v-btn>
                </template>
                <span>Editar Disciplina</span>
              </v-tooltip>

              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon @click="handleDeleteDisciplina(item)">
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
  import { routerMixin, efireMixin } from "@/mixins";
  import { db } from "../../../firebase";
  import { DISCIPLINAS } from "../../../constants";
  export default {
    mixins: [routerMixin, efireMixin],
    components: { EOverlay },
    data: () => ({
      headers: [
        { text: "Nome", value: "nome" },
        { text: "Ações", value: "acoes" },
      ],
      loading: false,
      page: 1,
      options: {},
    }),
    methods: {
      async handleDeleteDisciplina(item) {
        await db
          .collection(DISCIPLINAS)
          .doc(item.id)
          .delete();
      },
    },
    mounted() {
      console.log(this.disciplinas);
    },
  };
</script>

<style></style>
