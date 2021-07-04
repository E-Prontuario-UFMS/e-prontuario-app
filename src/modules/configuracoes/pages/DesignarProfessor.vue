<template>
  <v-container>
    <e-title title="Designar Professor" route="/configuracoes/disciplinas" />

    <v-card class="my-4 py-2">
      <v-card-title>
        <v-row>
          <v-col sm="12" md="10" cols="12">
            Selecione o Professor
          </v-col>
          <v-col sm="12" md="2">
            <v-btn :disabled="!professor" color="success" @click="design"
              >Designar</v-btn
            >
          </v-col>
        </v-row>
      </v-card-title>
      <v-list elevation="5">
        <v-list-item-group v-model="professor">
          <v-list-item
            v-for="professor in professores"
            :key="professor.id"
            :value="professor.id"
          >
            <template v-slot:default="{ active }">
              <v-list-item-content>
                <v-list-item-title>{{ professor.nome }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ professor.siap }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-checkbox :input-value="active" />
              </v-list-item-action>
            </template>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
  import { designarProfessorDisciplina } from "../../../firebase/services/professor";
  import { efireMixin, toastMixin } from "../../../mixins";
  import ETitle from "../../../shared/components/ETitle.vue";
  export default {
    components: { ETitle },
    mixins: [efireMixin, toastMixin],
    data: () => ({
      professores: [],
      professor: null,
    }),
    computed: {
      routeId() {
        return this.$route.params.id;
      },
    },

    methods: {
      async design() {
        const data = await designarProfessorDisciplina(
          this.professor,
          this.routeId,
        );
        data instanceof Error
          ? this.throwError(data.err)
          : this.throwSuccess("Disciplina designada com sucesso");
        this.$router.go(-1);
      },
    },
  };
</script>
