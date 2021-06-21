<template>
  <v-container>
    <switch-theme></switch-theme>
    <h1>Verifique seu email</h1>
    {{ getUserEmail }}
  </v-container>
</template>

<script>
  import SwitchTheme from "../../../shared/components/SwitchTheme.vue";
  import { firebase } from "../../../firebase";
  import { mapActions, mapState } from "vuex";
  export default {
    components: { SwitchTheme },
    computed: {
      ...mapState("login", ["user"]),
      getUserEmail() {
        return this.user?.user?.email || "";
      },
    },
    methods: {
      ...mapActions("login", ["setUser"]),
      checkRoute() {
        console.log("checkroute");
        if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
          firebase
            .auth()
            .signInWithEmailLink(this.user.user.email, window.location.href)
            .then(({ user }) => {
              console.log("deu certo");
              this.setUser({
                displayName: user.displayName,
                email: user.email,
                uid: user.uid,
                phoneNumber: user.phoneNumber,
              });
              this.$router.replace("/home");
            })
            .catch(err => {
              console.error(err);
            });
        }
      },
    },
    mounted() {
      this.checkRoute();
    },
  };
</script>
