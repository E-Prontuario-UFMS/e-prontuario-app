<template>
  <v-container>
    <v-tabs v-model="tab">
      <v-tab>{{ this.tabTitle[0] }}</v-tab>
      <v-tab :disabled="usuario.role !== `PROFESSOR`">{{
        this.tabTitle[1]
      }}</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <tabela-documento-firebase></tabela-documento-firebase>
      </v-tab-item>
      <v-tab-item>
        <documentos-preenchidos></documentos-preenchidos>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
  import { mapActions, mapState } from "vuex";
  import TabelaDocumentoFirebase from "@/modules/documento/components/TabelaDocumentoFirebase";
  import DocumentosPreenchidos from "./DocumentosPreenchidosFirebase.vue";

  export default {
    components: { TabelaDocumentoFirebase, DocumentosPreenchidos },
    data: () => ({
      tab: null,
      tabTitle: ["Modelos de Documento", "Documentos Preenchidos"],
    }),
    methods: {
      ...mapActions("documento", ["ActionGetModelosDeDocumentoDaApi"]),
      goTo(item) {
        this.$router.push(`/home/documento/${item.titulo}`);
      },
      goToDocumentosPreenchidos() {
        this.$router.push(`/home/documentos-preenchidos`);
      },
    },
    computed: {
      ...mapState("login", ["usuario"]),
    },
    mounted() {
      this.ActionGetModelosDeDocumentoDaApi();
    },
  };
</script>

<style></style>
