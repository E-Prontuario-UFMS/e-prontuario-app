<template>
  <v-container>
    <v-form ref="form" v-model="formValidation">
      <v-row class="mt-5 pa-5">
        <v-text-field
          class="col-md-6 pa-2"
          label="Nome da Disciplina"
          outlined
          required
          :rules="nameRules"
          v-model="nome"
        ></v-text-field>
        <v-autocomplete
          class="col-md-6 pa-2"
          required
          outlined
          :items="professores"
          item-text="nome"
          :rules="autoCompleteRules"
          v-model="professorAutoComplete"
          label="Professor Responsavel"
          return-object
        ></v-autocomplete>
        <v-textarea
          class="pa-2"
          label="Descrição"
          outlined
          required
          v-model="descricao"
          :rules="descricaoRules"
        ></v-textarea>
      </v-row>
      <v-row class="pa-5" justify="end">
        <v-btn
          color="success"
          :disabled="!formValidation"
          outlined
          @click="handleAddNewDisciplina"
        >
          Adicionar Disciplina
        </v-btn>
      </v-row>
    </v-form>
    <e-overlay :loading="loading"></e-overlay>
  </v-container>
</template>

<script>
  import { addNewDisciplina } from "../../disciplina/services";
  import EOverlay from "../../../shared/components/EOverlay.vue";
  import { getProfessoresFromApi } from "../../professores/services";
  export default {
    components: { EOverlay },
    data: () => ({
      formValidation: false,
      professores: [],
      professorAutoComplete: "",
      nome: "",
      descricao: "",
      loading: false,
      nameRules: [
        v => !!v || "Nome não pode ser vazio",
        v => v.length >= 10 || "Nome precisa ter mais do que 10 caracteres",
      ],
      autoCompleteRules: [v => !!v || "Necessário ter um professor"],
      descricaoRules: [v => !!v || "Descrição não pode ser vazia"],
    }),
    methods: {
      // TODO PRECISO DE UMA ROTA QUE TRAGA TODOS OS NOMES DE PROFESSORES SEM PAGINAÇÃO

      async loadProfessores() {
        this.loading = true;
        const response = await getProfessoresFromApi(1);
        const professores = response.data.content;
        this.setProfessores(professores);
        this.loading = false;
      },
      setProfessores(state) {
        this.professores = state;
      },
      async handleAddNewDisciplina() {
        this.$refs.form.validate();
        const response = await addNewDisciplina({
          descricao: this.descricao,
          titulo: this.nome,
          professor: this.professorAutoComplete,
        });
        console.log(response);
        this.$refs.form.reset();
      },
    },
    mounted() {
      this.loadProfessores();
    },
  };
</script>
