<template>
  <v-container>
    <v-card class="pa-5" elevation="5">
      <v-card-title>
        <h3>Adicionar Novo Professor</h3>
      </v-card-title>
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
          <v-btn color="error" outlined @click="goTo('professores')"
            >Voltar</v-btn
          >
          <v-btn color="success" class="ml-4" @click="handleAddNewProfessor"
            >Adicionar Professor</v-btn
          >
        </v-row>
      </v-form>
    </v-card>
    <v-snackbar v-model="snackbar" timeout="4000" color="success">
      Professor Adicionado
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          X
        </v-btn>
      </template>
    </v-snackbar>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
  import routerMixin from "@/mixins/router.mixin";
  import { addNewProfessor } from "../../../firebase/services/professor";
  export default {
    mixins: [routerMixin],
    data: () => ({
      form: {
        siap: "",
        nome: "",
      },
      formValidation: false,
      nameRules: [
        v => !!v || "Nome não pode ser vazio",
        v => v.length >= 10 || "Nome precisa ter mais do que 10 caracteres",
      ],
      siapRules: [v => !!v || "Siap não pode ser vazio"],
      loading: false,
      snackbar: false,
    }),
    methods: {
      resetFields() {
        this.form.siap = "";
        this.form.nome = "";
      },
      async handleAddNewProfessor() {
        this.$refs.formRef.validate();
        if (this.formValidation) {
          this.loading = true;
          await addNewProfessor({
            siap: this.form.siap,
            nome: this.form.nome,
          });
          this.loading = false;
          this.resetFields();
          this.$refs.formRef.reset();
          this.snackbar = true;
        }
      },
    },
  };
</script>

<style></style>
