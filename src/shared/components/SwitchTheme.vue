<template>
  <v-btn @click="changeTheme" icon>
    <v-icon>{{ isDark ? "mdi-weather-night" : "mdi-weather-sunny" }}</v-icon>
  </v-btn>
</template>

<script>
  export default {
    data: () => ({
      isDark: false,
    }),
    methods: {
      changeTheme() {
        this.$vuetify.theme.dark = !this.isDark;
        this.isDark = !this.isDark;
      },
    },
    mounted() {
      this.isDark = this.$vuetify.theme.dark;
    },
  };
</script>

<style></style>
