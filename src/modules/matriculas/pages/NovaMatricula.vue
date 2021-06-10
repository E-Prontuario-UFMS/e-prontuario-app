<template>
  <v-container>
    <e-title :route="route" :title="title"></e-title>

    <v-card class="my-5">
      <v-card-title>vai mudar, só pra matricular por agora</v-card-title>
      <v-form ref="formRef" v-model="valid">
        <v-row class="ma-2">
          <v-autocomplete
            :items="academicos"
            item-text="nome"
            class="col-md-6 pa-2"
            required
            outlined
            return-object
            v-model="academico"
          ></v-autocomplete>
          <v-autocomplete
            :items="disciplinas"
            item-text="titulo"
            class="col-md-6 pa-2"
            required
            outlined
            return-object
            v-model="disciplina"
          ></v-autocomplete>
        </v-row>
        <v-row justify="end" class="ma-2 pa-2">
          <v-btn color="success" @click="handleAddMatricula">Matricular</v-btn>
        </v-row>
      </v-form>
    </v-card>

    <e-overlay :loading="loading"></e-overlay>
  </v-container>
</template>

<script>
  import EOverlay from "../../../shared/components/EOverlay.vue";
  import ETitle from "../../../shared/components/ETitle.vue";
  import { fetchAllAcademicos } from "../../academicos/services";
  import { fetchAllDisciplinas } from "../../disciplina/services";
  import { loadingMixin } from "../../../mixins";
  import { matriculaAcademico } from "../services";
  export default {
    mixins: [loadingMixin],
    components: { ETitle, EOverlay },
    data: () => ({
      title: "Nova Matricula",
      route: "/matriculas",
      valid: false,
      academicos: [],
      disciplinas: [],
      academico: {},
      disciplina: {},
    }),
    methods: {
      async loadAcademicos() {
        this.startLoading();
        const { data: academicos } = await fetchAllAcademicos();
        this.academicos = academicos;
        this.stopLoading();
      },
      async loadDisciplinas() {
        this.startLoading();
        const { data: disciplinas } = await fetchAllDisciplinas();
        this.disciplinas = disciplinas;
        this.stopLoading();
      },

      async handleAddMatricula() {
        this.startLoading();
        const { academico, disciplina } = this;
        const { data } = await matriculaAcademico(academico, disciplina);
        console.log(data);
        this.stopLoading();
      },
    },
    mounted() {
      this.loadAcademicos();
      this.loadDisciplinas();
    },
  };
</script>

<style></style>
