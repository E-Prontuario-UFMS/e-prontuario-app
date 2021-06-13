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
  import EOverlay from "../../../shared/components/EOverlay.vue";
  import { db } from "../../../firebase";
  import { DISCIPLINAS, PROFESSORES } from "../../../constants";
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
        const { id } = await db.collection(DISCIPLINAS).add({
          descricao: this.descricao,
          nome: this.nome,
          modelos: [],
        });
        const professorId = this.professorAutoComplete.id;
        this.addDisciplinaOnProfessor(id, professorId);
        this.$refs.form.reset();
      },
      async addDisciplinaOnProfessor(disciplinaId, professorId) {
        const professor = await db
          .collection(PROFESSORES)
          .doc(professorId)
          .get()
          .then(data => data.data());
        professor.disciplinas.push(db.doc(`/${DISCIPLINAS}/${disciplinaId}`));
        db.collection(PROFESSORES)
          .doc(professorId)
          .update({
            ...professor,
          });
      },
    },
    firestore: {
      professores: db.collection("professores"),
    },
  };
</script>
