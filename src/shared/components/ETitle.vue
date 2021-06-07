<template>
  <v-row class="mt-5">
    <v-btn class="mr-5" icon @click="goTo(route)"
      ><v-icon>mdi-arrow-left</v-icon></v-btn
    >
    <h2>{{ title }}</h2>
  </v-row>
</template>

<script>
  import routerMixin from "@/mixins/router.mixin";
  export default {
    mixins: [routerMixin],
    props: {
      title: {
        type: String,
        required: true,
      },
      route: {
        type: String,
        required: true,
      },
    },
  };
</script>

<style></style>
