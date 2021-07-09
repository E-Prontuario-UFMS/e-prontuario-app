<template>
  <v-container>
    <e-title title="Alocar Documento" route="/home/documento" />

    <v-card class="my-6">
      <v-card-title> Disciplina: {{ disciplina.nome }} </v-card-title>
    </v-card>
    <v-card>
      <v-card-title>
        Modelos
      </v-card-title>
      <v-card-subtitle v-if="disciplinaHaveMoreThanOneModelo">
        Modelos atualmente alocadas
      </v-card-subtitle>
      <v-card-subtitle v-if="!disciplinaHaveMoreThanOneModelo">
        Não existe modelos alocados para essa disciplina
      </v-card-subtitle>
      <v-list>
        <v-list-item v-for="modelo in modelosAlocados" :key="modelo.id">
          <v-list-item-content>
            <v-list-item-title>
              {{ modelo.titulo }}
            </v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn fab small @click="handleDelete(modelo.id)" color="error">
              <v-icon>mdi-minus</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
    <v-card class="my-4">
      <v-card-title>Modelos de Documento Disponiveis</v-card-title>
      <v-list>
        <v-list-item v-for="modelo in modelos" :key="modelo.id" dense ripple>
          <v-list-item-content>
            <v-list-item-title>{{ modelo.titulo }}</v-list-item-title>
            <v-list-item-subtitle>
              {{ modelo.descricao }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn color="success" fab small @click="handleAlocar(modelo.id)">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
  import ETitle from "../../../shared/components/ETitle.vue";
  import {
    fetchDisciplinaById,
    addModeloInDisciplina,
    removeModeloInDisciplina,
  } from "../../../firebase/services/disciplina";
  import { getModeloDocumentoByDisciplina } from "../../../firebase/services/modeloDocumento";
  import { efireMixin, toastMixin } from "../../../mixins";
  export default {
    components: { ETitle },
    mixins: [efireMixin, toastMixin],
    data: () => ({
      disciplina: {},
      modelosAlocados: [],
    }),
    computed: {
      getDisciplinaId() {
        return this.$route.params.id;
      },
      disciplinaHaveMoreThanOneModelo() {
        return this.modelosAlocados.length > 0;
      },
    },
    methods: {
      async loadDisciplina() {
        this.disciplina = await fetchDisciplinaById(this.getDisciplinaId);
        this.modelosAlocados = await getModeloDocumentoByDisciplina(
          this.getDisciplinaId,
        );
        console.log(this.modelosAlocados);
      },
      async handleAlocar(id) {
        const data = await addModeloInDisciplina(this.getDisciplinaId, id);
        data instanceof Error
          ? this.throwError("Ocorreu um erro")
          : this.throwSuccess("Modelo Adicionado com sucesso");

        this.loadDisciplina();
      },
      async handleDelete(id) {
        const data = await removeModeloInDisciplina(this.getDisciplinaId, id);
        data instanceof Error
          ? this.throwError("Ocorreu um erro")
          : this.throwSuccess("Modelo Removido com sucesso");

        this.loadDisciplina();
      },
    },
    mounted() {
      this.loadDisciplina();
    },
  };
</script>
