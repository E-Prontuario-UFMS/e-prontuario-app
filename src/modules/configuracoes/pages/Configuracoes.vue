<template>
  <v-container>
    <v-row class="ma-5">
      <v-btn icon @click="goBack" class="mr-5">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <h2>Configurações</h2></v-row
    >
    <v-row class="mt-5 pa-5">
      <v-card
        elevation="2"
        class="m-2"
        width="500"
        hover
        ripple
        @click="goTo('/professores')"
      >
        <v-card-title>Professores</v-card-title>
        <v-card-subtitle>Cadastrar e remover</v-card-subtitle> </v-card
      ><v-card
        elevation="2"
        class="m-2"
        width="500"
        hover
        ripple
        @click="goTo('/academicos')"
      >
        <v-card-title>Academicos</v-card-title>
        <v-card-subtitle>Cadastrar e Remover</v-card-subtitle> </v-card
      ><v-card
        elevation="2"
        class="m-2"
        width="500"
        hover
        ripple
        @click="goTo('configuracoes/disciplinas')"
      >
        <v-card-title>Disciplinas</v-card-title>
        <v-card-subtitle>Cadastrar e remover</v-card-subtitle>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
  import routerMixin from "@/mixins/router.mixin";
  export default {
    mixins: [routerMixin],
  };
</script>
