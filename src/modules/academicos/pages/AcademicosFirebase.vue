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
              </div>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
  import routerMixin from "@/mixins/router.mixin";
  import ETitle from "../../../shared/components/ETitle.vue";
  import { fetchAllAcademicos } from "../../../firebase/services/academico";
  export default {
    components: { ETitle },
    mixins: [routerMixin],
    data: () => ({
      page: 1,
      options: {},
      academicos: [],
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
        this.loading = true;
        this.academicos = await fetchAllAcademicos();
        this.loading = false;
      },
    },
    mounted() {
      this.loadAcademicos();
    },
  };
</script>
