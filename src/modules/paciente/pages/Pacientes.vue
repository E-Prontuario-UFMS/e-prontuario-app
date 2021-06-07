<template>
  <v-container>
    <tabela-paciente></tabela-paciente>
  </v-container>
</template>

<script>
  import { mapActions, mapState } from "vuex";
  import TabelaPaciente from "../components/TabelaPaciente.vue";

  export default {
    components: {
      TabelaPaciente,
    },
    methods: {
      ...mapActions("paciente", ["ActionGetPacientesFromApi"]),
    },
    computed: {
      ...mapState("paciente", ["page", "limit"]),
    },
    mounted() {
      this.ActionGetPacientesFromApi({ page: this.page, limit: this.limit });
    },
  };
</script>

<style></style>
