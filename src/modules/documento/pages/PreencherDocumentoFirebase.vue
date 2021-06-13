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
  import { routerMixin } from "@/mixins";
  import ETitle from "../../../shared/components/ETitle.vue";
  import VJsf from "@koumoul/vjsf/lib/VJsf.js";
  import {
    buildTextSchema,
    buildDataSchema,
    buildBooleanSchema,
    buildNumberSchema,
  } from "../firebase/buildSchema";
  export default {
    components: { ETitle, VJsf },
    mixins: [routerMixin],
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
      valid: false,
    }),
    computed: {
      ...mapState("login", ["usuario"]),
      ...mapState("paciente", ["pacientesPagination"]),
    },
    methods: {
      async loadData() {
        const slug = this.$route.params.titulo;
        this.documento = await db
          .collection("modelos")
          .doc(slug)
          .get()
          .then(snapshot => snapshot.data());
        this.buildSchema();
      },
      buildSchema() {
        this.textSchema = buildTextSchema(this.documento);
        console.log(this.textSchema);
        this.dataSchema = buildDataSchema(this.documento);
        this.booleanSchema = buildBooleanSchema(this.documento);
        this.numberSchema = buildNumberSchema(this.documento);
      },
      handleFinish() {
        const model = {
          ...this.textModel,
          ...this.dataModel,
          ...this.numberModel,
          ...this.booleanModel,
        };
        console.log(model);
        const slug = this.$route.params.titulo;
        db.collection("documentos")
          .doc(slug)
          .set({ preenchido: model, documento: this.documento });
      },
    },
    mounted() {
      this.loadData();
    },
    watch: {
      $route() {
        this.titulo = this.$route.params.titulo;
      },
    },
    firestore: {},
  };
</script>

<style></style>
