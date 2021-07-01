<template>
  <v-container>
    <e-title title="Preencher Documento" route="/home/documento"></e-title>
    <v-card class="my-6">
      <v-card-title>
        {{ documento.titulo }}
      </v-card-title>

      <v-card-text>
        <v-form v-model="valid" ref="formRef">
          <v-jsf v-model="textModel" :schema="textSchema"></v-jsf>
          <v-jsf v-model="dataModel" :schema="dataSchema"></v-jsf>
          <v-jsf v-model="numberModel" :schema="numberSchema"></v-jsf>
          <v-jsf v-model="booleanModel" :schema="booleanSchema"></v-jsf>

          <v-row class="mx-6">
            <v-select
              :items="pacientes"
              item-text="nome"
              required
              v-model="paciente"
              label="Escolha o Paciente"
              outlined
              clearable
              return-object
            >
            </v-select>
          </v-row>
          <v-row justify="end" class="ma-6">
            <v-btn color="success" @click="handleFinish" :disabled="!valid">
              Concluir
            </v-btn>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import { mapState } from "vuex";
  import { db } from "../../../firebase";
  import { routerMixin, efireMixin } from "@/mixins";
  import { getModeloDocumentoBySlug } from "../../../firebase/services/modeloDocumento";
  import ETitle from "../../../shared/components/ETitle.vue";
  import VJsf from "@koumoul/vjsf/lib/VJsf.js";
  import {
    buildTextSchema,
    buildDataSchema,
    buildBooleanSchema,
    buildNumberSchema,
  } from "../firebase/buildSchema";
  import { ACADEMICOS, PACIENTES } from "../../../constants";
  export default {
    components: { ETitle, VJsf },
    mixins: [routerMixin, efireMixin],
    data: () => ({
      documento: {},
      textSchema: {},
      textModel: {},
      dataSchema: {},
      dataModel: {},
      booleanSchema: {},
      booleanModel: {},
      numberSchema: {},
      numberModel: {},
      pacientes: [],
      paciente: {},
      valid: false,
    }),
    computed: {
      ...mapState("login", ["user"]),
      ...mapState("paciente", ["pacientesPagination"]),
    },
    methods: {
      async loadData() {
        const slug = this.$route.params.titulo;
        this.documento = await getModeloDocumentoBySlug(slug);
        this.buildSchema();
      },
      buildSchema() {
        this.textSchema = buildTextSchema(this.documento);
        this.dataSchema = buildDataSchema(this.documento);
        this.booleanSchema = buildBooleanSchema(this.documento);
        this.numberSchema = buildNumberSchema(this.documento);
      },
      async handleFinish() {
        const model = {
          ...this.textModel,
          ...this.dataModel,
          ...this.numberModel,
          ...this.booleanModel,
        };

        await db.collection("documentos").add({
          preenchido: model,
          documento: this.documento,
          paciente: db.doc(`${PACIENTES}/${this.paciente.id}`),
          createdAt: new Date(),
          academico: db.doc(`${ACADEMICOS}/${this.user.uid}`),
        });
        this.$router.replace("/home/documento");
      },
    },
    mounted() {
      this.loadData();
    },
    watch: {
      $route() {
        this.titulo = this.$route.params.titulo;
        this.loadData();
      },
    },
  };
</script>

<style></style>
