<template>
  <v-container
    ><v-tabs v-model="tab" ve>
      <v-tab :disabled="usuario.role !== `PROFESSOR`">{{
        this.tabTitle[0]
      }}</v-tab>
      <v-tab :disabled="usuario.role !== `PROFESSOR`">{{
        this.tabTitle[1]
      }}</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <disciplinas-cadastradas></disciplinas-cadastradas>
      </v-tab-item>
      <v-tab-item>
        <cadastrar-disciplina></cadastrar-disciplina>
      </v-tab-item> </v-tabs-items
  ></v-container>
</template>

<script>
  // TODO: verificar se está atualizando conforme crio novas disciplinas
  import { mapState } from "vuex";
  import CadastrarDisciplina from "../components/CadastrarDisciplina.vue";
  import DisciplinasCadastradas from "../components/DisciplinasCadastradas.vue";
  export default {
    components: { CadastrarDisciplina, DisciplinasCadastradas },
    data: () => ({
      tab: null,
      tabTitle: ["Disciplinas Cadastradas", "Cadastrar Disciplinas"],
    }),
    computed: {
      ...mapState("login", ["usuario"]),
    },
  };
</script>

<style></style>
