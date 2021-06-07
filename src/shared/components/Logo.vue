<template>
  <v-layout align-center justify-center class="pa-5 mb-5">
    <v-img
      max-width="370px"
      max-height="190px"
      :src="
        isDark
          ? require('../../assets/ufms_logo_negativo_assinatura_vertical_rgb.png')
          : require('../../assets/ufms_logo_positivo_assinatura_vertical_rgb.png')
      "
      contain
    />
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      isDark: false,
    }),

    watch: {
      "$vuetify.theme.dark"(val) {
        this.isDark = !val;
      },
    },
  };
</script>

<style scoped></style>
