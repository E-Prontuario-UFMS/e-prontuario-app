<template>
  <v-container>
    <div
      style="border-bottom: 2px solid #1e4ffa;border-top: 2px solid #1e4ffa;"
    >
      <v-data-table
        :headers="headers"
        :items="documentosPreenchidos"
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
  import { getDocumentosPreenchidos as fetchDocumentosPreenchidos } from "../services/getDocumentosPreenchidos";

  export default {
    name: "DocumentosPreenchidos",
    data: () => ({
      loading: false,
      documentosPreenchidos: [],
      page: 0,
      limit: 10,
      headers: [
        {
          text: "Aluno",
          value: "enfermeiro.nome",
          align: "start",
        },
        {
          text: "Titulo",
          value: "titulo",
          align: "start",
        },
        {
          text: "Ações",
          value: "actions",
        },
      ],
    }),
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      getDocumentosPreenchidos() {
        this.loading = true;
        fetchDocumentosPreenchidos({ page: 0, limit: 10 }).then(({ data }) => {
          this.documentosPreenchidos = data.content;
          this.loading = false;
          console.log(this.documentosPreenchidos);
        });
      },
      acessarDocumento(item) {
        this.$router.push({
          name: "DocumentoPreenchidoComId",
          params: { id: item.id },
        });
      },
    },
    mounted() {
      this.getDocumentosPreenchidos();
    },
  };
</script>

<style scoped></style>
