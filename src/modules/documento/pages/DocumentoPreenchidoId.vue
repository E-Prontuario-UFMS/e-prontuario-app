<template>
  <v-container>
    <div style="display: contents" v-if="documento">
        <h5>{{ documento.titulo }}</h5>
        <h6>{{ documento.descricao }}</h6>
        <v-row>
          <v-col sm="12" lg="6">
            <academico-card :enfermeiro="documento.enfermeiro"></academico-card>
          </v-col>
          <v-col sm="12" lg="6">
            <entrada-card :entrada="documento.entrada"></entrada-card>
          </v-col>
          <v-col sm="12" lg="6">
            <paciente-card :paciente="documento.paciente"></paciente-card>
          </v-col>
        </v-row>

    </div>
    <div v-if="!documento">
      <v-progress-circular></v-progress-circular>
    </div>
  </v-container>
</template>

<script>
  import { getDocumentById } from "../services/getDocumentById";
  import AcademicoCard from "@/modules/documento/components/AcademicoCard";
  import EntradaCard from "@/modules/documento/components/EntradaCard";
  import PacienteCard from "@/modules/documento/components/PacienteCard";
  export default {
    name: "DocumentoPreenchidoId",
    components: { PacienteCard, EntradaCard, AcademicoCard },
    data: () => ({
      documento: null,
    }),
    methods: {
      fetchDocumentById() {
        const id = this.$route.params.id;
        getDocumentById(id).then(({ data }) => {
          this.documento = data;
          console.log(this.documento);
        });
      },
    },
    created() {
      this.fetchDocumentById();
    },
  };
</script>

<style scoped></style>
