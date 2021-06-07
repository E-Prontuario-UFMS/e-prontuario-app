<template>
  <v-app id="inspire">
    <router-view />
    <custom-footer></custom-footer>
  </v-app>
</template>

<script>
  import "@koumoul/vjsf/lib/VJsf.css";
  import "@koumoul/vjsf/lib/deps/third-party.js";
  import CustomFooter from "@/shared/components/CustomFooter.vue";

  export default {
    components: { CustomFooter },
    mounted() {
      document.title = "E-Prontuario";
    },
  };
</script>

<style lang="scss"></style>
