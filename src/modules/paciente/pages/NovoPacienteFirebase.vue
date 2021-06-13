<template>
  <v-container>
    <e-title title="Novo Paciente" route="/home/pacientes"></e-title>

    <v-alert :value="alertTrue" type="error">
      Não foi possivel Adicionar o Paciente
    </v-alert>

    <v-card elevation="10" class="pa-4 my-5" style="padding: 10px;">
      <v-form v-model="valid" ref="form" @submit.prevent="salvar">
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
        <v-row>
          <v-col class="col-md-2">
            <v-btn color="error" outlined @click="goBack()">
              Cancelar
            </v-btn>
          </v-col>

          <v-col class="col-md-10" align="end">
            <v-btn color="success" :disabled="!valid" @click="handleSalvar">
              Salvar
            </v-btn>

            <v-btn
              class="mr-1"
              color="success"
              :disabled="!valid"
              outlined
              @click="handleSalvarContinuar"
            >
              Salvar e Continuar
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
  import ETitle from "../../../shared/components/ETitle.vue";
  import { routerMixin, loadingMixin } from "@/mixins";
  import { mask } from "vue-the-mask";
  import { db } from "../../../firebase";
  export default {
    directives: {
      mask,
    },
    mixins: [routerMixin, loadingMixin],
    components: { ETitle },
    data: () => ({
      alertTrue: false,
      sexoConstantes: ["MASCULINO", "FEMININO"],
      nome: "",
      cpf: "",
      genero: null,
      valid: false,
      rules: {
        nome: [val => (val || "").length > 0 || "Nome não pode ser vazio"],
        cpf: [val => (val || "").length > 0 || "CPF não pode ser vazio"],
        genero: [v => !!v || "Genero Precisa ser Especificado"],
      },
    }),
    methods: {
      async savePaciente() {
        this.startLoading();
        const { cpf } = this;
        const cpfWithoutMask = cpf.replace(/[^\d]+/g, "");
        const paciente = {
          nome: this.nome,
          cpf: cpfWithoutMask,
          genero: this.genero,
        };

        await db.collection("pacientes").add(paciente);
        this.$refs.form.reset();
        this.stopLoading();
      },
      async handleSalvar() {
        await this.savePaciente();
        this.goBack();
      },
      async handleSalvarContinuar() {
        await this.savePaciente();
      },
    },
  };
</script>
