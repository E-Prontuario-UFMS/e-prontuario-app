<template>
  <v-container>
    <v-card-title class="ml-2">Cadastro</v-card-title>

    <v-alert :value="alertTrue" type="error">
      Não foi possivel Adicionar o Paciente
    </v-alert>

    <v-card elevation="10" class="pa-4" style="padding: 10px;">
      <v-card-text class="pl-0"><strong>Novo Paciente</strong></v-card-text>
      <v-form
        lazy-validation
        v-model="valid"
        ref="form"
        @submit.prevent="salvar"
      >
        <v-text-field
          label="Nome"
          v-model="nome"
          required
          :rules="rules.nome"
          outlined
        />

        <div class="row mb-12">
          <div class="col-md-6">
            <v-text-field
              label="CPF"
              v-mask="'###.###.###-##'"
              v-model="cpf"
              required
              :rules="rules.cpf"
              outlined
            />
          </div>
          <div class="col-md-6">
            <v-select
              :items="sexoConstantes"
              label="Sexo"
              v-model="genero"
              required
              :rules="rules.genero"
              outlined
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-2">
            <v-btn color="error" outlined @click="voltar">
              Cancelar
            </v-btn>
          </div>

          <div class="col-md-10">
            <v-btn color="success" @click="salvarESair" style="float: right;">
              Salvar
            </v-btn>

            <v-btn
              class="mr-1"
              color="success"
              @click="salvar"
              style="float: right;"
              outlined
            >
              Salvar e Continuar
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
  import { mapActions } from "vuex";
  import { mask } from "vue-the-mask";
  export default {
    directives: {
      mask,
    },
    data: () => ({
      alertTrue: false,
      sexoConstantes: ["MASCULINO", "FEMININO"],
      nome: "",
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
      alertTrigger() {
        this.alertTrue = true;
        setTimeout(() => {
          this.alertTrue = false;
        }, 5000);
      },

      ...mapActions("paciente", ["ActionAddPaciente"]),
      salvar() {
        this.valid = this.$refs.form.validate();
        if (this.valid) {
          this.$refs.form.validate();
          const paciente = {
            genero: this.genero,
            nome: this.nome,
            cpf: this.cpf.replaceAll("-", "").replaceAll(".", ""),
          };
          this.ActionAddPaciente(paciente);
          this.$refs.form.reset();
          return true;
        } else {
          return false;
        }
      },
      voltar() {
        this.$router.go(-1);
      },
      salvarESair() {
        this.salvar() ? this.$router.go(-1) : null;
      },
    },
  };
</script>

<style></style>
