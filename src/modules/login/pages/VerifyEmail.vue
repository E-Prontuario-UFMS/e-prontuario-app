<template>
  <v-container>
    <switch-theme></switch-theme>
    <v-container class="my-5">
      <h1 v-if="getUserEmail">Verifique seu email</h1>
      {{ getUserEmail }}
    </v-container>

    <v-card @click="goTo('/')">
      <v-card-title>
        Voltar para o Login
      </v-card-title>
    </v-card>
    <e-overlay :loading="loading"></e-overlay>
  </v-container>
</template>

<script>
  import SwitchTheme from "../../../shared/components/SwitchTheme.vue";
  import { firebase } from "../../../firebase";
  import { mapActions, mapState } from "vuex";
  import { toastMixin, loadingMixin, routerMixin } from "../../../mixins";
  import EOverlay from "../../../shared/components/EOverlay.vue";

  export default {
    mixins: [toastMixin, loadingMixin, routerMixin],
    components: { SwitchTheme, EOverlay },
    computed: {
      ...mapState("login", ["user"]),
      getUserEmail() {
        return this.user.email || "";
      },
    },
    methods: {
      ...mapActions("login", ["setUser"]),
      checkRoute() {
        if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
          this.startLoading();
          const { email } = this.$route.query;
          console.log(email);
          firebase
            .auth()
            .signInWithEmailLink(email, window.location.href)
            .then(({ user }) => {
              this.setUser({
                displayName: user.displayName,
                email: user.email,
                uid: user.uid,
                phoneNumber: user.phoneNumber,
                emailVerified: user.emailVerified,
              });
              this.throwSuccess("Email confirmado 🥳");
              this.$router.replace("/home");
            })
            .catch(err => {
              this.throwError(err);
              this.stopLoading();
              this.$router.replace("/");
            });
        }
      },
    },
    mounted() {
      this.checkRoute();
    },
  };
</script>
