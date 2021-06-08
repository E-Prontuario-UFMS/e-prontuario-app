<template>
  <v-container>
    <e-title route="/configuracoes" title="Disciplinas"></e-title>
    <v-tabs v-model="tab" class="mt-5">
      <v-tab>{{ this.tabTitle[0] }}</v-tab>
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
  import ETitle from "@/shared/components/ETitle";
  export default {
    components: { CadastrarDisciplina, DisciplinasCadastradas, ETitle },
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
