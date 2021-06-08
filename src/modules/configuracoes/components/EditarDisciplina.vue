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
            v-model="disciplina.titulo"
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
  import {
    fetchDisciplinaById,
    putDisciplina,
  } from "../../disciplina/services";
  import { getProfessoresFromApi } from "../../professores/services";
  import { routerMixin } from "@/mixins";
  export default {
    mixins: [routerMixin],
    components: { ETitle, EOverlay },
    data: () => ({
      loading: true,
      formValidation: false,
      disciplina: {},
      professores: [],
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
        this.loading = true;
        const { id } = this.$route.params;
        const { data: disciplina } = await fetchDisciplinaById(id);
        this.disciplina = disciplina;
        this.loading = false;
        this.professorAutoComplete = disciplina.professorPojo;
      },
      async loadProfessores() {
        this.loading = true;
        const { data } = await getProfessoresFromApi(1);
        const professores = data.content;
        this.professores = professores;

        this.loading = false;
      },
      async handleEdit() {
        if (this.$refs.formRef.validate()) {
          this.loading = true;
          const { data } = await putDisciplina(this.disciplina);
          console.log(data);
          // TODO: editar disciplina retorna 500
          this.loading = false;
        }
      },
    },
    mounted() {
      this.loadDisciplina();
      this.loadProfessores();
    },
  };
</script>

<style></style>
