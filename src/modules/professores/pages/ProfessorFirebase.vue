<template>
  <v-container>
    <e-title title="Professor" route="/professores"></e-title>
    <v-card class="my-6 pa-2">
      <v-card-title> {{ professor.nome }} </v-card-title>

      <div v-if="hasDisciplinas">
        <v-card-text>Disciplinas Alocadas: </v-card-text>
        <v-card
          v-for="disciplina in disciplinas"
          :key="disciplina.id"
          ripple
          raised
          class="my-2"
          elevation="5"
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
  import { DISCIPLINAS } from "../../../constants";
  import { getProfessorById } from "../../../firebase/services/professor";
  export default {
    mixins: [routerMixin],
    components: { EOverlay, ETitle },
    data: () => ({
      professor: {},
      disciplinas: [],
      loading: false,
    }),
    computed: {
      hasDisciplinas() {
        return this.disciplinas.length > 0;
      },
    },
    methods: {
      async loadData() {
        this.professor = await getProfessorById(this.getRouteId);
        this.professor.disciplinas.map(async d => {
          await db
            .collection(DISCIPLINAS)
            .doc(d.id)
            .get()
            .then(data => this.disciplinas.push({ ...data.data(), id: d.id }));
        });
      },
    },
    mounted() {
      this.loadData();
    },
  };
</script>

<style></style>
