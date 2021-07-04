<template>
  <v-container>
    <v-list-group v-for="disciplina in disciplinas" :key="disciplina.id">
      <template v-slot:activator>
        <v-list-item-title>{{ disciplina.nome }}</v-list-item-title>
      </template>
      <v-list-item-group v-model="modelosSelecionados" multiple>
        <v-list-item v-for="modelo in modelos" :key="modelo.id">
          <template v-slot:default="{ active }">
            <v-list-item-content>
              <v-list-item-title>{{ modelo.titulo }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ modelo.descricao }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-checkbox :input-value="active" />
            </v-list-item-action>
          </template>
        </v-list-item>
      </v-list-item-group>
    </v-list-group>
  </v-container>
</template>

<script>
  import { efireMixin } from "../../../mixins";
  export default {
    components: {},
    mixins: [efireMixin],
    data: () => ({
      modelos: [],
      disciplinas: [],
      modelosSelecionados: [],
    }),
  };
</script>
