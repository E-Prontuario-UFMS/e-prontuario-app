<template>
  <v-container>
    <e-title title="Novo Academico" route="/academico"></e-title>

    <v-card class="pa-6 my-6">
      <v-form v-model="form" ref="formRef">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <v-text-field
              outlined
              required
              label="Nome"
              v-model="academico.nome"
            ></v-text-field>
          </div>
          <div class="col-sm-12 col-md-6">
            <v-text-field
              outlined
              label="Rga"
              required
              v-model="academico.rga"
            ></v-text-field>
          </div>
        </div>
        <v-row justify="end" class="px-6">
          <v-btn :disabled="!form" color="success" @click="handleAddAcademico">
            Adicionar
          </v-btn>
        </v-row>
      </v-form>
    </v-card>
    <e-overlay :loading="loading"></e-overlay>
  </v-container>
</template>

<script>
  import { routerMixin } from "@/mixins";
  import ETitle from "@/shared/components/ETitle.vue";
  import { addAcademico } from "../services";
  import EOverlay from "@/shared/components/EOverlay.vue";
  export default {
    components: { ETitle, EOverlay },
    mixins: [routerMixin],
    data: () => ({
      form: false,
      loading: false,
      academico: {
        nome: "",
        rga: "",
      },
    }),
    methods: {
      async handleAddAcademico() {
        this.loading = true;
        if (this.$refs.formRef.validate()) {
          await addAcademico(this.academico);
          this.$refs.formRef.reset();
          this.loading = false;
        }
        this.loading = false;
      },
      //TODO: todas as disciplinas, só nome e ID
      async loadDisciplinas() {},
    },
  };
</script>

<style></style>
