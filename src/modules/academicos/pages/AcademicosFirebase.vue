<template>
  <v-container>
    <e-title title="Academicos" route="/configuracoes"></e-title>
    <v-row class="pa-5">
      <v-col align="end">
        <v-btn color="success" @click="goTo('novo-academico')">
          Adicionar Novo
        </v-btn>
      </v-col>
    </v-row>
    <v-card class="ma-5 pa-2">
      <v-data-table
        :headers="headers"
        :items="academicos"
        :options.sync="options"
        :server-items-length.sync="academicos.length"
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
                    <v-btn icon @click="goTo(`/academico/${item.id}`)">
                      <v-icon color="primary" dark v-bind="attrs" v-on="on">
                        mdi-arrow-right
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>Acessar Academico</span>
                </v-tooltip>

                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon>
                      <v-icon color="warning" dark v-bind="attrs" v-on="on">
                        mdi-pencil
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>Editar Academico</span>
                </v-tooltip>

                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon @click="handleDeleteAcademico(item)">
                      <v-icon color="error" dark v-bind="attrs" v-on="on">
                        mdi-delete
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>Deletar Academico</span>
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
  import { getAcademicos } from "../services";
  import routerMixin from "@/mixins/router.mixin";
  import ETitle from "../../../shared/components/ETitle.vue";
  import { efireMixin } from "../../../mixins";
  export default {
    components: { ETitle },
    mixins: [routerMixin, efireMixin],
    data: () => ({
      page: 1,
      academicosPagination: {},
      options: {},
      headers: [
        { text: "Nome", value: "nome" },
        {
          text: "RGA",
          value: "rga",
        },
        {
          text: "Ações",
          value: "acoes",
        },
      ],
      loading: false,
    }),
    methods: {
      async loadAcademicos() {
        const { data } = await getAcademicos({ page: this.page - 1 });
        this.academicosPagination = data;
      },
      async handleDeleteAcademico(academico) {
        console.log(academico);
      },
    },
    mounted() {
      this.loadAcademicos();
    },
  };
</script>

<style></style>
