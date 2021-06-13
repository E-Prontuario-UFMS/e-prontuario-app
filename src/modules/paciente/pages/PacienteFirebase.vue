<template>
  <v-container>
    <e-title route="/home/pacientes" title="Detalhes do Paciente"></e-title>

    <v-card elevation="5" class="mt-5">
      <v-card-title> Nome: {{ paciente.nome }} </v-card-title>
      <v-card-subtitle>
        Cpf: {{ paciente.cpf }}
        <hr />
        Genero: {{ paciente.genero }}
      </v-card-subtitle>
    </v-card>

    <e-overlay :loading="loading"></e-overlay>
  </v-container>
</template>

<script>
  import EOverlay from "../../../shared/components/EOverlay.vue";
  import ETitle from "../../../shared/components/ETitle.vue";
  import { loadingMixin } from "@/mixins";
  import { db } from "../../../firebase";
  export default {
    components: { ETitle, EOverlay },
    mixins: [loadingMixin],
    data: () => ({
      paciente: {},
    }),
    methods: {
      async fetchPacienteData() {
        const { id } = this.$route.params;
        this.paciente = await db
          .collection("pacientes")
          .doc(id)
          .get()
          .then(snapshot => snapshot.data());
      },
    },
    mounted() {
      this.fetchPacienteData();
    },
  };
</script>

<style></style>
