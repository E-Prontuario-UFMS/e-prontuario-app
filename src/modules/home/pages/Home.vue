<template>
  <v-container>
    <div>
      <v-card class="mx-auto pa-2" max-width="400">
        <v-card-title>
          <span class="text--darken-1 blue--text">
            Bem vindo(a) ao E-Prontuario
          </span>
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
  import { mapState } from "vuex";
  import { toastMixin } from "../../../mixins";
  export default {
    mixins: [toastMixin],
    computed: {
      ...mapState("login", ["user"]),
    },
    methods: {
      checkIfEmailIsVerified() {
        this.user.emailVerified
          ? null
          : this.throwError("Email ainda não foi verificado 😞");
      },
      checkIfHaveEmailInStore() {
        this.user.uid ? null : this.redirectToLoginIfUserDontHaveAuthId();
      },
      redirectToLoginIfUserDontHaveAuthId() {
        this.throwError("Usúario não autenticado 😞");
        this.$router.push("/");
      },
    },
    mounted() {
      this.checkIfEmailIsVerified();
      this.checkIfHaveEmailInStore();
    },
  };
</script>

<style></style>
