<template>
  <v-container>
    <v-card-title class="ml-2">Editar Paciente</v-card-title>

    <v-card class="pa-4" elevation="10" style="padding: 10px;">
      <v-alert v-if="alert.active"> {{ alert.message }}</v-alert>
      <v-card-text class="pl-0"
        ><strong>Editando Paciente {{ nome }}</strong></v-card-text
      >
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="editar"
      >
        <v-text-field
          v-model="nome"
          :rules="rules.nome"
          label="Nome"
          outlined
          required
        />

        <div class="row mb-12">
          <div class="col-md-6">
            <v-text-field
              v-model="cpf"
              :rules="rules.cpf"
              label="CPF"
              outlined
              required
            />
          </div>
          <div class="col-md-6">
            <v-select
              v-model="genero"
              :items="sexoConstantes"
              :rules="rules.genero"
              label="Sexo"
              outlined
              required
            />
          </div>
        </div>

        <div class="row">
          <div class="col-md-2">
            <v-btn color="error" outlined @click="cancelar">
              Cancelar
            </v-btn>
          </div>

          <div class="col-md-10">
            <v-btn color="success" style="float: right;" @click="editarESair">
              Editar
            </v-btn>
          </div>
        </div>
      </v-form>
      <v-overlay :value="loading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </v-card>
  </v-container>
</template>

<script>
  import { mapActions, mapState } from "vuex";
  import { getPacienteFromId } from "@/modules/paciente/services/getPacienteFromId";

  export default {
    data: () => ({
      alert: {
        active: false,
        message: "",
      },
      sexoConstantes: ["MASCULINO", "FEMININO"],
      nome: "",
      id: 0,
      isFormDesabilitado: true,
      cpf: "",
      genero: null,
      valid: true,
      loading: false,
      rules: {
        nome: [val => (val || "").length > 0 || "Nome não pode ser vazio"],
        cpf: [val => (val || "").length > 0 || "CPF não pode ser vazio"],
        genero: [v => !!v || "Genero Precisa ser Especificado"],
      },
    }),
    methods: {
      ...mapActions("paciente", ["ActionEditPaciente"]),
      ...mapState("paciente", ["pacientesPagination"]),
      editar() {
        this.valid = this.$refs.form.validate();
        if (this.valid) {
          this.$refs.form.validate();

          const paciente = {
            genero: this.genero,
            nome: this.nome,
            cpf: this.cpf,
            id: this.id,
          };
          this.ActionEditPaciente(paciente);
          this.$refs.form.reset();
          return true;
        } else {
          return false;
        }
      },
      cancelar() {
        this.$router.go(-1);
      },
      editarESair() {
        this.editar() ? this.$router.go(-1) : null;
      },
    },
    mounted() {
      this.id = this.$route.params.id;
      getPacienteFromId(this.id)
        .then(data => {
          this.nome = data.nome;
          this.cpf = data.cpf;
          this.genero = data.genero;
        })
        .catch(err => {
          this.alert.active = true;
          this.alert.message = err.message;
        });
    },
  };
</script>

<style></style>
