<template>
  <v-main>
    <switch-theme></switch-theme>
    <v-container>
      <h1>Verifique seu email</h1>

      {{ user.user.email }}
    </v-container>
  </v-main>
</template>

<script>
  import SwitchTheme from "../../../shared/components/SwitchTheme.vue";
  import { firebase } from "../../../firebase";
  import { mapActions, mapState } from "vuex";
  export default {
    components: { SwitchTheme },
    computed: {
      ...mapState("login", ["user"]),
    },
    methods: {
      ...mapActions("login", ["setUser"]),
      checkRoute() {
        if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
          firebase
            .auth()
            .signInWithEmailLink(this.user.user.email, window.location.href)
            .then(({ user }) => {
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
