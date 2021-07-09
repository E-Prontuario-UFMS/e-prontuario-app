<template>
  <v-container>
    <e-title title="Matriculas" route="/home" />

    <v-row justify="end" class="mr-3">
      <v-btn color="success" @click="goTo('/nova-matricula')">
        Matricular Aluno
      </v-btn>
    </v-row>
    <v-card class="my-5 mx-4"> </v-card>
    <e-overlay :loading="loading"></e-overlay>
  </v-container>
</template>

<script>
  import { routerMixin, loadingMixin } from "@/mixins";
  import ETitle from "@/shared/components/ETitle.vue";
  import EOverlay from "@/shared/components/EOverlay.vue";

  export default {
    mixins: [routerMixin, loadingMixin],
    components: { ETitle, EOverlay },
    data: () => ({
      loading: false,
      page: 0,
      expanded: [],
      headers: [
        {
          text: "Academico",
          value: "academico.nome",
        },
      ],
      options: {},
    }),
    methods: {},
  };
</script>

<style></style>
