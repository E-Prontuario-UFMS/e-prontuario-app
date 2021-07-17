<template>
  <v-layout align-center justify-center class="pa-5 mb-5">
    <v-img
      max-width="300px"
      max-height="140px"
      :src="getCorrectLogoTheme"
      contain
    />
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      isDark: false,
    }),

    computed: {
      getCorrectLogoTheme() {
        return !this.$vuetify.theme.dark
          ? require("../../assets/ufms_logo_negativo_assinatura_vertical_rgb.png")
          : require("../../assets/ufms_logo_positivo_assinatura_vertical_rgb.png");
      },
    },
  };
</script>

<style scoped></style>
