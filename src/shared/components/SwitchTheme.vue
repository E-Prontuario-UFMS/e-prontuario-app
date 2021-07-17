<template>
  <v-btn @click="changeTheme" icon>
    <v-icon>{{ isDark ? "mdi-weather-night" : "mdi-weather-sunny" }}</v-icon>
  </v-btn>
</template>

<script>
  import { mapActions, mapState } from "vuex";
  export default {
    computed: {
      ...mapState("shared", ["isDark"]),
    },
    methods: {
      ...mapActions("shared", ["ActionToggleTheme"]),
      changeTheme() {
        this.ActionToggleTheme(!this.isDark);
        this.$vuetify.theme.dark = this.isDark;
      },
    },
    mounted() {
      this.$vuetify.theme.dark = this.isDark;
    },
  };
</script>

<style></style>
