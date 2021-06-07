<template>
  <v-container>
    <div>
      <v-card class="mx-auto pa-2" max-width="400">
        <v-card-title>
          <span class="text--darken-1 blue--text"
            >Bem vindo(a) ao E-Prontuario</span
          >
        </v-card-title>
        <v-img
          contain
          height="500px"
          src="../../../assets/ufms_logo_mascote_com_livro_rgb.png"
        >
        </v-img>
      </v-card>
    </div>
  </v-container>
</template>

<script>
  import { mapActions } from "vuex";
  export default {
    computed: {},
    methods: {
      ...mapActions("documento", ["ActionGetTitulosDocumento"]),
    },
    mounted() {
      this.ActionGetTitulosDocumento();
    },
  };
</script>

<style></style>
