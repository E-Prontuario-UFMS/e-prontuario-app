<template>
  <v-container>
    <e-title :title="academico.nome" route="/academicos"></e-title>

    <v-card class="my-5 pa-3">
      <v-card-title>Informações</v-card-title>
      <v-card-subtitle>
        Somente para Consulta, não é possivel editar informações por aqui
      </v-card-subtitle>

      <v-row class="mx-2">
        <v-col cols="12" sm="12" md="6">
          <v-text-field :value="academico.cpf" disabled label="CPF" outlined />
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <v-text-field :value="academico.rga" disabled label="RGA" outlined />
        </v-col>
      </v-row>
      <v-row class="mx-2">
        <v-col cols="12" sm="12" md="6">
          <v-text-field
            :value="academico.email"
            disabled
            label="Email"
            outlined
          />
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <v-text-field
            :value="academico.passaporte"
            disabled
            label="Passaporte"
            outlined
          />
        </v-col>
      </v-row>
    </v-card>

    <disiciplinas-matriculadas :academico="academico" />
    <e-overlay :loading="loading" />
  </v-container>
</template>

<script>
  import { getAcademicoById } from "../../../firebase/services/academico";
  import { routerMixin } from "../../../mixins";
  import EOverlay from "../../../shared/components/EOverlay.vue";
  import ETitle from "../../../shared/components/ETitle.vue";
  import DisiciplinasMatriculadas from "../components/DisiciplinasMatriculadas.vue";
  export default {
    mixins: [routerMixin],
    components: { ETitle, EOverlay, DisiciplinasMatriculadas },
    data: () => ({
      loading: false,
      academico: {
        nome: "",
        rga: "",
      },
    }),
    methods: {
      async loadAcademico() {
        const academico = await getAcademicoById(this.getRouteId);
        this.academico = academico;
      },
    },
    mounted() {
      this.loadAcademico();
    },
  };
</script>

<style></style>
