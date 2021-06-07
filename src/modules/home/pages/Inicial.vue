<template>
  <v-app>
    <main-bar></main-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
  import { documentos } from "../../../constants/documentos";
  import { mapActions, mapState } from "vuex";
  import MainBar from "@/shared/components/MainBar.vue";
  export default {
    components: { MainBar },
    data: () => ({
      documentos,
      drawer: true,
    }),
    methods: {
      ...mapActions("documento", ["ActionGetGlobalDocumentos"]),
      ...mapActions("documento", ["ActionSetDocumento"]),
    },
    computed: {
      ...mapState("login", ["usuario"]),
      ...mapState("login", ["token"]),
    },
    mounted() {
      // this.ActionGetGlobalDocumentos();
    },
    created() {},
  };
</script>

<style></style>
