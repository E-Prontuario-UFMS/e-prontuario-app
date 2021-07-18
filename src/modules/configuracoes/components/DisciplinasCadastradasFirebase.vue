<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="disciplinas"
      :options="options"
      :loading="loading"
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
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    @click="
                      goTo(`/configuracoes/disciplinas/${item.id}/alocar-aluno`)
                    "
                  >
                    <v-icon color="success" dark v-bind="attrs" v-on="on">
                      mdi-arrow-up
                    </v-icon>
                  </v-btn>
                </template>
                <span>Matricular Alunos</span>
              </v-tooltip>
            </div>
          </td>
        </tr>
      </template>
    </v-data-table>
    <e-overlay :loading="loading"></e-overlay>
  </v-container>
</template>

<script>
  import EOverlay from "../../../shared/components/EOverlay.vue";
  import { routerMixin } from "@/mixins";
  import { fetchAllDisciplinas } from "../../../firebase/services/disciplina";
  export default {
    mixins: [routerMixin],
    components: { EOverlay },
    data: () => ({
      headers: [
        { text: "Nome", value: "nome" },
        { text: "Ações", value: "acoes" },
      ],
      loading: false,
      options: {},
      disciplinas: [],
    }),
    methods: {
      async handleDeleteDisciplina(item) {
        console.log(item);
      },
      async loadDisciplinas() {
        this.disciplinas = await fetchAllDisciplinas();
      },
    },
    mounted() {
      this.loadDisciplinas();
    },
  };
</script>

<style></style>
