<template>
  <v-card class="my-4" v-if="hasMoreThanOneAluno">
    <v-card-title>Alunos Matriculados</v-card-title>
    <v-list>
      <v-list-item v-for="aluno in alunos" :key="aluno.id" ripple>
        <v-list-item-content>
          <v-list-item-title>
            {{ aluno.nome }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ aluno.rga }} - {{ aluno.email }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
  export default {
    props: {
      alunos: {
        type: Array,
        default: () => [],
      },
    },
    computed: {
      hasMoreThanOneAluno() {
        return this.alunos.length > 0;
      },
    },
  };
</script>

<style></style>
