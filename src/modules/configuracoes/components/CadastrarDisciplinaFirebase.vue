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
        />
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
        />
        <v-textarea
          class="pa-2"
          label="Descrição"
          outlined
          required
          v-model="descricao"
          :rules="descricaoRules"
        />
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
  import EOverlay from "../../../shared/components/EOverlay.vue";
  import { fetchAllUsersWithIsProfessorFlag } from "../../../firebase/services/professor";
  import {
    addDisciplina,
    addDisciplinaInProfessor,
    addProfessorInDisciplina,
  } from "../../../firebase/services/disciplina";
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
        v => v.length >= 2 || "Nome precisa ter mais do que 2 caracteres",
      ],
      autoCompleteRules: [v => !!v || "Necessário ter um professor"],
      descricaoRules: [v => !!v || "Descrição não pode ser vazia"],
    }),
    methods: {
      async handleAddNewDisciplina() {
        const { id } = await addDisciplina({
          nome: this.nome,
          descricao: this.descricao,
        });
        await addProfessorInDisciplina(id, this.professorAutoComplete.id);
        await addDisciplinaInProfessor(this.professorAutoComplete.id, id);
        this.$refs.form.reset();
      },

      async loadProfessores() {
        const response = await fetchAllUsersWithIsProfessorFlag();
        this.professores = response;
      },
    },
    mounted() {
      this.loadProfessores();
    },
  };
</script>
