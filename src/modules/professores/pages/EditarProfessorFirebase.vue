<template>
  <v-container>
    <e-title title="Editar Professor" route="/professores"></e-title>
    <v-card class="pa-5 mt-5" elevation="5" v-if="!loading">
      <v-form v-model="formValidation" ref="formRef">
        <v-row
          ><v-text-field
            label="Nome"
            outlined
            required
            class="col-sm-12 col-md-8 pa-3"
            v-model="form.nome"
            :rules="nameRules"
          ></v-text-field>
          <v-text-field
            label="Siap"
            outlined
            required
            :rules="siapRules"
            v-model="form.siap"
            class="col-sm-12 col-md-4 pa-3"
          ></v-text-field
        ></v-row>
        <v-row justify="end" class="pa-3">
          <v-btn color="error" outlined @click="goBack()">Voltar</v-btn>
          <v-btn
            color="success"
            class="ml-4"
            @click="handleEditarProfessor"
            :disabled="!formValidation"
            >Editar Professor</v-btn
          >
        </v-row>
      </v-form>
    </v-card>
    <v-snackbar v-model="snackbar" timeout="4000" color="success">
      Professor Atualizado
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          X
        </v-btn>
      </template>
    </v-snackbar>
    <e-overlay :loading="loading"></e-overlay>
  </v-container>
</template>

<script>
  import EOverlay from "../../../shared/components/EOverlay.vue";
  import ETitle from "../../../shared/components/ETitle.vue";

  import { routerMixin } from "@/mixins";
  import {
    editarProfessor,
    getProfessorById,
  } from "../../../firebase/services/professor";
  export default {
    mixins: [routerMixin],
    components: { ETitle, EOverlay },
    data: () => ({
      loading: false,
      professor: {},
      form: {},
      snackbar: false,
      formValidation: false,
      nameRules: [
        v => !!v || "Nome não pode ser vazio",
        v => v.length >= 10 || "Nome precisa ter mais do que 10 caracteres",
      ],
      siapRules: [v => !!v || "Siap não pode ser vazio"],
    }),
    methods: {
      async loadProfessor() {
        const { id } = this.$route.params;
        const professor = await getProfessorById(id);
        this.form = { ...professor };
      },
      async handleEditarProfessor() {
        const { id } = this.$route.params;
        await editarProfessor(id, this.form);
      },
    },
    mounted() {
      this.loadProfessor();
    },
  };
</script>
