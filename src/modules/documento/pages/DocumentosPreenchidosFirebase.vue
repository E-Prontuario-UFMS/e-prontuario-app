<template>
  <v-container>
    <div class="table-border">
      <v-row class="my-2">
        <v-col sm="12" md="6">
          <v-autocomplete
            v-model="studentSearch"
            label="Aluno"
            :items="documentos"
            item-text="nome"
            dense
            outlined
            filled
          />
        </v-col>
        <v-col sm="12" md="6">
          <v-autocomplete
            v-model="titleSearch"
            dense
            :items="documentos"
            item-text="documento.titulo"
            label="Titulo"
            outlined
            filled
          />
        </v-col>
      </v-row>
      <v-data-table
        :headers="headers"
        :items="documentos"
        :loading="loading"
        loading-text="Carregando, por favor espere"
      >
        <template v-slot:item.actions="{ item }">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon>
                <v-icon
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  @click="acessarDocumento(item)"
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
                  color="error"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  @click="goTo(item)"
                >
                  mdi-delete
                </v-icon>
              </v-btn>
            </template>
            <span>Remover</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon>
                <v-icon
                  color="warning"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  @click="goTo(item)"
                >
                  mdi-pencil
                </v-icon>
              </v-btn>
            </template>
            <span>Editar Documento</span>
          </v-tooltip>
        </template>
        <template v-slot:no-data>
          Sem itens
        </template>
      </v-data-table>
    </div>
  </v-container>
</template>

<script>
  import { fetchDocumentosPreenchidos } from "../../../firebase/services/documento";
  import { routerMixin } from "../../../mixins";
  export default {
    name: "DocumentosPreenchidos",
    mixins: [routerMixin],
    data: () => ({
      loading: false,
      documentos: [],
      studentSearch: "",
      titleSearch: "",
      headers: [
        {
          text: "Aluno",
          value: "nome",
          align: "start",
        },
        {
          text: "Titulo",
          value: "documento.titulo",
          align: "start",
        },
        {
          text: "Ações",
          value: "actions",
        },
      ],
    }),
    methods: {
      acessarDocumento(item) {
        this.$router.push({
          name: "DocumentoPreenchidoComId",
          params: { id: item.id },
        });
      },
      async loadDocumentosPreenchidos() {
        this.documentos = await fetchDocumentosPreenchidos();
      },
    },
    mounted() {
      this.loadDocumentosPreenchidos();
    },
  };
</script>
