<template>
  <v-container>
    <v-row class="ma-5">
      <v-btn icon @click="goBack()" class="mr-5">
        <v-icon> mdi-arrow-left </v-icon>
      </v-btn>
      <h2>Novo Academico</h2></v-row
    >
  </v-container>
</template>

<script>
  import routerMixin from "@/mixins/router.mixin";
  export default {
    mixins: [routerMixin],
  };
</script>

<style></style>
