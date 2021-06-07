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
  import { fetchPacienteFromId } from "../services";
  export default {
    components: { ETitle, EOverlay },
    data: () => ({
      paciente: {
        title: "",
      },
      loading: false,
    }),
    methods: {
      async getPacienteById() {
        this.loading = true;
        const { id } = this.$route.params;
        const { data: paciente } = await fetchPacienteFromId(id);
        this.paciente = paciente;
        this.loading = false;
      },
    },
    mounted() {
      this.getPacienteById();
    },
  };
</script>

<style></style>
