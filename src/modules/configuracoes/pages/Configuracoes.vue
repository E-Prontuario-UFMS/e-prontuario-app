<template>
  <v-container>
    <e-title title="Configurações" route="/home" />
    <v-row class="mx-4 mt-5">
      <v-col cols="12" sm="12" md="6">
        <v-card elevation="12" hover ripple @click="goTo('/professores')">
          <v-card-title>Professores</v-card-title>
          <v-card-subtitle>Cadastrar e remover</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col>
        <v-card elevation="12" hover ripple @click="goTo('/academicos')">
          <v-card-title>Academicos</v-card-title>
          <v-card-subtitle>Cadastrar e Remover</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mx-4">
      <v-col cols="12" sm="12" md="6">
        <v-card
          elevation="12"
          hover
          ripple
          @click="goTo('configuracoes/disciplinas')"
        >
          <v-card-title>Disciplinas</v-card-title>
          <v-card-subtitle>Cadastrar e remover</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col>
        <v-card elevation="12" hover ripple @click="goTo('matriculas')">
          <v-card-title>Matriculas</v-card-title>
          <v-card-subtitle>Cadastrar e remover</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mx-4">
      <v-col>
        <v-card
          elevation="12"
          hover
          ripple
          @click="goTo('configuracoes/permissoes')"
        >
          <v-card-title>Painel de Permissões</v-card-title>
          <v-card-subtitle>Adiciona e Remove Permissões</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import routerMixin from "@/mixins/router.mixin";
  import ETitle from "@/shared/components/ETitle";
  import { mapGetters } from "vuex";
  export default {
    mixins: [routerMixin],
    components: {
      ETitle,
    },
    computed: {
      ...mapGetters("login", ["isAdmin"]),
    },
  };
</script>
