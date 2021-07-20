<template>
  <v-container>
    <e-title route="/home/pacientes" title="Detalhes do Paciente"></e-title>

    <v-card elevation="5" class="my-5">
      <v-card-title> Nome: {{ paciente.nome }} </v-card-title>
      <v-card-subtitle>
        Cpf: {{ paciente.cpf }}
        <hr />
        Genero: {{ paciente.genero }}
      </v-card-subtitle>
    </v-card>

    <v-card v-if="hasMoreThanOneDocumento">
      <v-card-title>
        Documentos Cadastrados com esse paciente
      </v-card-title>

      <v-list>
        <v-list-item
          ripple
          v-for="documentoPreenchido in documentos"
          :key="documentoPreenchido.id"
        >
          <v-list-item-content>
            <v-list-item-title>{{
              documentoPreenchido.documento.titulo
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>

    <e-overlay :loading="loading"></e-overlay>
  </v-container>
</template>

<script>
  import EOverlay from "../../../shared/components/EOverlay.vue";
  import ETitle from "../../../shared/components/ETitle.vue";
  import { loadingMixin, routerMixin } from "@/mixins";
  import {
    getPacienteById,
    fetchDocumentosByPaciente,
  } from "../../../firebase/services/paciente";
  export default {
    components: { ETitle, EOverlay },
    mixins: [loadingMixin, routerMixin],
    data: () => ({
      paciente: {},
      documentos: [],
    }),
    computed: {
      hasMoreThanOneDocumento() {
        return this.documentos.length > 0;
      },
    },

    methods: {
      async loadPaciente() {
        this.paciente = await getPacienteById(this.getRouteId);
        this.getDocumentosByPaciente();
      },
      async getDocumentosByPaciente() {
        this.loading = true;
        const documentos = await fetchDocumentosByPaciente(this.getRouteId);
        this.documentos = documentos;

        this.loading = false;
      },
    },
    mounted() {
      this.loadPaciente();
    },
  };
</script>

<style></style>
