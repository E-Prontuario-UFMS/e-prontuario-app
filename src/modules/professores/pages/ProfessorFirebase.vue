<template>
  <v-container>
    <e-title title="Professor" route="/professores"></e-title>
    <v-card class="my-6 pa-2">
      <v-card-title> Nome: {{ professor.nome }} </v-card-title>
      <v-card-subtitle> Siap: {{ professor.siap }} </v-card-subtitle>
      <v-card-text>Disciplinas Alocadas: </v-card-text>

      <div v-if="disciplinas">
        <v-card
          v-for="disciplina in disciplinas"
          :key="disciplina.id"
          ripple
          raised
          @click="goTo(`/home/disciplina/${disciplina.id}`)"
        >
          <v-card-title>{{ disciplina.nome }}</v-card-title>
          <v-card-subtitle>{{ disciplina.descricao }}</v-card-subtitle>
        </v-card>
      </div>
    </v-card>

    <e-overlay :loading="loading"></e-overlay>
  </v-container>
</template>

<script>
  import EOverlay from "../../../shared/components/EOverlay.vue";
  import routerMixin from "@/mixins/router.mixin";
  import ETitle from "../../../shared/components/ETitle.vue";
  import { db } from "../../../firebase";
  import { DISCIPLINAS, PROFESSORES } from "../../../constants";
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
        this.professor.disciplinas.map(async d => {
          await db
            .collection(DISCIPLINAS)
            .doc(d.id)
            .get()
            .then(data => this.disciplinas.push(data.data()));
        });
      },
    },
    mounted() {
      this.loadData();
    },
  };
</script>

<style></style>
