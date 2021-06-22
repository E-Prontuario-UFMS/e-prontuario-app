<template>
  <v-main>
    <v-container fluid>
      <switch-theme></switch-theme>
      <logo />
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md5>
          <v-alert
            :value="alert"
            color="pink"
            dark
            border="top"
            icon="mdi-close-thick"
            transition="scale-transition"
          >
            {{ error }}
          </v-alert>
          <v-card class="login-title elevation-12 pa-5 flex-column" shaped>
            <v-card-title class="pa-5 mx-auto">
              <h1 class="pt-5 pb-5">E-Prontuario</h1>
            </v-card-title>

            <v-card-text>
              <v-form>
                <v-text-field
                  outlined
                  v-model="email"
                  name="email"
                  label="Email"
                  :disabled="loading"
                  data-cy="email"
                ></v-text-field>
                <v-text-field
                  :disabled="loading"
                  outlined
                  v-model="senha"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[passwordRules.required, passwordRules.min]"
                  :type="show1 ? 'text' : 'password'"
                  data-cy="password"
                  label="Senha"
                  @keypress.enter="doLogin"
                  @click:append="show1 = !show1"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-layout align-center justify-center>
                <v-btn
                  large
                  class="primary"
                  @click="doLogin"
                  data-cy="btn-next"
                >
                  Entrar
                </v-btn>
                <v-btn
                  data-cy="btn-register"
                  @click="goTo('registro')"
                  large
                  class="secondary ml-2"
                >
                  Registrar
                </v-btn>
                <!-- <v-btn @click="googleLogin">google</v-btn> -->
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-main>
</template>

<script>
  import Logo from "@/shared/components/Logo.vue";
  import { mapActions } from "vuex";
  import SwitchTheme from "@/shared/components/SwitchTheme.vue";
  import { routerMixin, loadingMixin, toastMixin } from "@/mixins";
  import { doLogin } from "../services/firebase";
  import { firebase } from "../../../firebase";
  export default {
    components: { Logo, SwitchTheme },
    mixins: [routerMixin, loadingMixin, toastMixin],
    data: () => ({
      show1: false,
      email: "",
      senha: "",
      alert: false,
      error: "",
      passwordRules: {
        required: value => !!value || "Não pode ser vazio.",
        min: v => v.length >= 6 || "Minimo de 8 Caracteres",
      },
    }),
    methods: {
      ...mapActions("login", ["setUser"]),
      setLoading(state) {
        this.loading = state;
      },

      async doLogin() {
        this.startLoading();
        const data = await doLogin(this);
        data instanceof Error
          ? this.throwError("Não foi possivel fazer o login 😞")
          : this.handleSuccessfullyLogin(data);
        this.stopLoading();
      },
      handleSuccessfullyLogin({ user }) {
        this.setUser({
          emailVerified: user.emailVerified,
          displayName: user.displayName,
          email: user.email,
          photoUrl: user.photoUrl,
          phoneNumber: user.phoneNumber,
        });
        this.$router.push("/home");
      },
      googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
        firebase.auth().languageCode = "it";
        firebase
          .auth()
          .signInWithPopup(provider)
          .then(result => {
            /** @type {firebase.auth.OAuthCredential} */
            // var credential = result.credential;
            // This gives you a Google Access Token. You can use it to access the Google API.
            // var token = credential.accessToken;
            // The signed-in user info.
            // var user = result.user;
            // ...
            console.log(result);
          })
          .catch(error => {
            this.throwError(error);
            // Handle Errors here.
            // var errorCode = error.code;
            // var errorMessage = error.message;
            // The email of the user's account used.
            // var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            // var credential = error.credential;
            // ...
          });
      },
    },
  };
</script>

<style>
  .login-title {
    display: flex;
    justify-content: center;
    align-content: center;
  }
  .login-title h1 {
    color: #0088b7;
  }
</style>
