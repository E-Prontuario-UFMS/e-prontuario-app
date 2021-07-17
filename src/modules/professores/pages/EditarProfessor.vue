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
          />
          <v-text-field
            label="Siap"
            outlined
            required
            :rules="siapRules"
            v-model="form.siap"
            class="col-sm-12 col-md-4 pa-3"
          />
          >
        </v-row>
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
  import { getProfessorById, updateProfessor } from "../services";

  import { routerMixin } from "@/mixins";
  export default {
    mixins: [routerMixin],
    components: { ETitle, EOverlay },
    data: () => ({
      loading: true,
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
        this.loading = true;
        const { id } = this.$route.params;
        const { data: professor } = await getProfessorById(id);
        this.professor = professor;
        this.form = { ...professor };
        this.loading = false;
      },
      async handleEditarProfessor() {
        if (this.$refs.formRef.validate()) {
          try {
            await updateProfessor(this.form);
            this.snackbar = true;
          } catch (e) {
            console.log(e);
          }
        }
      },
    },
    mounted() {
      this.loadProfessor();
    },
  };
</script>
