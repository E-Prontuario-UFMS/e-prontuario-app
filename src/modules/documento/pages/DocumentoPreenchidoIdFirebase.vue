<template>
  <v-container>
    <div style="display: contents">
      <e-title title="Documento" route="/home/documento"></e-title>

      <v-row class="wrap">
        <v-col sm="12" md="12" lg="12">
          <documento-card
            :documentos="documentos"
            :preenchido="preenchido"
          ></documento-card>
        </v-col>
        <v-col sm="12" md="6" lg="6">
          <academico-card :academico="academico"></academico-card>
        </v-col>
        <v-col sm="12" md="6" lg="6">
          <entrada-card :entrada="createdAt"></entrada-card>
        </v-col>
        <v-col sm="12" md="6" lg="6">
          <paciente-card :paciente="paciente"></paciente-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
  import AcademicoCard from "@/modules/documento/components/AcademicoCard";
  import EntradaCard from "@/modules/documento/components/EntradaCard";
  import PacienteCard from "@/modules/documento/components/PacienteCard";
  import DocumentoCard from "@/modules/documento/components/DocumentoCard";
  import { getDocumentoPreenchidoById } from "../../../firebase/services/documento";
  import { getAcademicoById } from "../../../firebase/services/academico";
  import { getPacienteById } from "../../../firebase/services/paciente";
  import ETitle from "../../../shared/components/ETitle.vue";

  export default {
    name: "DocumentoPreenchidoId",
    components: {
      PacienteCard,
      EntradaCard,
      AcademicoCard,
      ETitle,
      DocumentoCard,
    },
    data: () => ({
      documentos: {},
      academico: {},
      paciente: {},
      createdAt: {},
      preenchido: {},
    }),
    methods: {
      async fetchDocumentById() {
        const id = this.$route.params.id;
        const response = await getDocumentoPreenchidoById(id);
        this.documentos = response.documento;
        this.preenchido = response.preenchido;
        this.academico = await getAcademicoById(response.academico.id);
        this.paciente = await getPacienteById(response.paciente.id);
        this.createdAt = response.createdAt;
        console.log(this.documentos);
      },
    },
    mounted() {
      this.fetchDocumentById();
    },
  };
</script>

<style scoped></style>
