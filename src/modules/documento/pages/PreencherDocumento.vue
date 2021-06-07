<template>
  <v-container>
    <v-row align="center" class="pt-8 pb-8">
      <v-btn icon class="mr-10" @click="goBack">
        <v-icon>
          mdi-arrow-left
        </v-icon>
      </v-btn>
      <h3>Preencher documento</h3>
    </v-row>
    <v-alert type="error" :value="errorOnSendDocument">
      Não foi possivel enviar o documento
    </v-alert>
    <v-card>
      <v-card-title>
        {{ titulo }}
      </v-card-title>
      <v-form v-model="valid" class="pa-4" onsubmit="getData()">
        <v-jsf v-model="dataModel" :schema="dataSchema"></v-jsf>
        <v-jsf v-model="switchModel" :schema="switchSchema"></v-jsf>
        <v-jsf v-model="textModel" :schema="textSchema"></v-jsf>
        <v-jsf v-model="numberModel" :schema="numberSchema"></v-jsf>

        <v-select
          :items="pacientesPagination.content"
          item-text="nome"
          v-model="paciente"
          label="Escolha um Paciente"
          return-object
        ></v-select>
        <v-btn @click="getData()" color="success">Enviar</v-btn>
        <v-overlay :value="overlay">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
  import { getDocumentosPeloTituloDaApi } from "../services/getDocumentosPeloTituloDaApi";
  import {
    constroiDataFormSchema,
    constroiSwitchFormSchema,
    constroiNumberFormSchema,
    constroiTextFormSchema,
  } from "../services/schemas";
  import VJsf from "@koumoul/vjsf/lib/VJsf.js";
  import { formToResponse } from "@/modules/documento/services/formToResponse.js";
  import { mapState } from "vuex";
  export default {
    components: { VJsf },
    data: () => ({
      overlay: false,
      errorOnSendDocument: false,
      paciente: {},
      dataSchema: {},
      dataModel: {},
      switchSchema: {},
      switchModel: {},
      titulo: "",
      textModel: {},
      textSchema: {},
      numberModel: {},
      numberSchema: {},
      itemsDocumento: [],
      valid: false,
    }),
    computed: {
      ...mapState("login", ["usuario"]),
      ...mapState("paciente", ["pacientesPagination"]),
    },
    methods: {
      alertTrigger() {
        this.errorOnSendDocument = true;
        setTimeout(() => {
          this.errorOnSendDocument = false;
        }, 5000);
      },
      getData() {
        this.overlay = true;
        const full = {
          textModel: this.textModel,
          switchModel: this.switchModel,
          dataModel: this.dataModel,
          numberModel: this.numberModel,
        };
        formToResponse(this.itemsDocumento, full, this.usuario, this.paciente)
          .then(() => {
            this.overlay = false;
            this.$router.go(-1);
          })
          .catch(() => {
            this.alertTrigger();
            this.overlay = false;
            this.alert = true;
          });
      },
      async loadData() {
        this.itemsDocumento = await getDocumentosPeloTituloDaApi(this.titulo);

        this.textSchema = constroiTextFormSchema(this.itemsDocumento);
        this.dataSchema = constroiDataFormSchema(this.itemsDocumento);
        this.switchSchema = constroiSwitchFormSchema(this.itemsDocumento);
        this.numberSchema = constroiNumberFormSchema(this.itemsDocumento);
      },
      goBack() {
        this.$router.go(-1);
      },
    },
    mounted() {
      this.titulo = this.$router.history.current.params.titulo;
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
