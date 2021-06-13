<template>
  <v-container>
    <e-title title="Professor" route="/professores"></e-title>
    <v-card class="my-6 pa-2">
      <v-card-title> Nome: {{ professor.nome }} </v-card-title>
      <v-card-subtitle> Siap: {{ professor.siap }} </v-card-subtitle>

      <v-card> </v-card>
    </v-card>

    <e-overlay :loading="loading"></e-overlay>
  </v-container>
</template>

<script>
  import EOverlay from "../../../shared/components/EOverlay.vue";
  import routerMixin from "@/mixins/router.mixin";
  import ETitle from "../../../shared/components/ETitle.vue";
  import { db } from "../../../firebase";
  import { PROFESSORES } from "../../../constants";
  export default {
    mixins: [routerMixin],
    components: { EOverlay, ETitle },
    data: () => ({
      professor: {},
      disciplinas: [],
      loading: false,
    }),
    methods: {
      async loadData() {
        const { id } = this.$route.params;
        this.professor = await db
          .collection(PROFESSORES)
          .doc(id)
          .get()
          .then(data => data.data());
        console.log(this.professor);
      },
    },
    mounted() {
      this.loadData();
    },
    // TODO: Verificar se existe a possibilidade de buscar as disciplinas pertencentes a esse professor
  };
</script>

<style></style>
