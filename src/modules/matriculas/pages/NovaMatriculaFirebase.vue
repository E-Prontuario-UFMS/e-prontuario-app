<template>
  <v-container>
    <e-title :route="route" :title="title"></e-title>

    <v-card class="my-5">
      <v-form ref="formRef" v-model="valid">
        <v-row class="pa-2">
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
            placeholder="Disciplina"
            item-text="nome"
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
  import { efireMixin, loadingMixin } from "../../../mixins";
  import { matriculaAluno } from "../../../firebase/services/matricula";
  export default {
    mixins: [loadingMixin, efireMixin],
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
      async handleAddMatricula() {
        this.startLoading();
        const { academico, disciplina } = this;
        await matriculaAluno(academico.id, disciplina.id);
        this.stopLoading();
      },
    },
  };
</script>

<style></style>
