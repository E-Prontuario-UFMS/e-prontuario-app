<template>
  <v-container>
    <e-title
      title="Editar Disciplina"
      route="/configuracoes/disciplinas"
    ></e-title>
    <v-card class="mt-5 pa-5">
      <v-form ref="formRef" v-model="formValidation">
        <v-row class="pt-5 px-8"
          ><v-text-field
            class="col-md-6 col-sm-12"
            label="Titulo"
            v-model="disciplina.nome"
            outlined
            :rules="nameRules"
          ></v-text-field>
          <v-autocomplete
            class="col-md-6 col-sm-12"
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
            class="col-md-12"
            label="Descricao"
            v-model="disciplina.descricao"
            outlined
            :rules="descricaoRules"
          ></v-textarea
        ></v-row>
        <v-row justify="end" class="mb-5 px-8">
          <v-btn color="error" class="mr-5" @click="goBack()">Voltar</v-btn>
          <v-btn color="success" @click="handleEdit" :disabled="!formValidation"
            >Editar</v-btn
          >
        </v-row>
      </v-form>
    </v-card>
    <e-overlay :loading="loading"></e-overlay>
  </v-container>
</template>

<script>
  import EOverlay from "../../../shared/components/EOverlay.vue";
  import ETitle from "../../../shared/components/ETitle.vue";
  import { routerMixin, efireMixin } from "@/mixins";
  import { db } from "../../../firebase";
  import { DISCIPLINAS, PROFESSORES } from "../../../constants";
  export default {
    mixins: [routerMixin, efireMixin],
    components: { ETitle, EOverlay },
    data: () => ({
      loading: false,
      formValidation: false,
      disciplina: {},
      professorAutoComplete: "",
      nameRules: [
        v => !!v || "Nome não pode ser vazio",
        v => v.length >= 2 || "Nome precisa ter mais do que 2 caracteres",
      ],
      autoCompleteRules: [v => !!v || "Necessário ter um professor"],
      descricaoRules: [v => !!v || "Descrição não pode ser vazia"],
    }),
    methods: {
      async loadDisciplina() {
        const { id } = this.$route.params;
        this.disciplina = await db
          .collection(DISCIPLINAS)
          .doc(id)
          .get()
          .then(data => data.data());
      },
      async handleEdit() {
        if (this.$refs.formRef.validate()) {
          const { id } = this.$route.params;
          console.log(this.disciplina);
          await db
            .collection(DISCIPLINAS)
            .doc(id)
            .update({
              ...this.disciplina,
            });

          const professor = await db
            .collection(PROFESSORES)
            .doc(this.professorAutoComplete.id)
            .get()
            .then(data => data.data());
          console.log(professor);
        }
      },
    },
    mounted() {
      this.loadDisciplina();
    },
  };
</script>

<style></style>
