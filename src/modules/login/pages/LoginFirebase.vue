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
              </v-layout>
            </v-card-actions>
            <v-row justify="center my-2">
              <div class="g-sign-in-button" @click="googleLogin">
                <div class="content-wrapper">
                  <div class="logo-wrapper">
                    <img
                      src="https://developers.google.com/identity/images/g-logo.png"
                    />
                  </div>
                  <span class="text-container">
                    <span>Faça login com Google</span>
                  </span>
                </div>
              </div>
            </v-row>
            <v-row justify="center" class="ma-2">
              <router-link to="esqueci-a-senha">
                Esqueceu a Senha ?
              </router-link>
            </v-row>
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
  import { getUserByAuthenticationId } from "../../../firebase/services/academico";
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
      async handleSuccessfullyLogin({ user }) {
        const firebaseUser = await getUserByAuthenticationId(user.uid);
        this.setUser({
          emailVerified: user.emailVerified,
          displayName: user.displayName,
          email: user.email,
          photoUrl: user.photoUrl,
          phoneNumber: user.phoneNumber,
          isProfessor: firebaseUser.isProfessor,
          uid: user.uid,
        });
        this.throwSuccess("Login Bem Sucedido");
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
            this.handleSuccessfullyLogin(result);
          })
          .catch(error => {
            this.throwError(error);
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
  .g-sign-in-button {
    margin: 10px;
    display: inline-block;
    width: 240px;
    height: 50px;
    background-color: #4285f4;
    color: #fff;
    border-radius: 1px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
    transition: background-color 0.218s, border-color 0.218s, box-shadow 0.218s;
  }

  .g-sign-in-button:hover {
    cursor: pointer;
    -webkit-box-shadow: 0 0 3px 3px rgba(66, 133, 244, 0.3);
    box-shadow: 0 0 3px 3px rgba(66, 133, 244, 0.3);
  }

  .g-sign-in-button:active {
    background-color: #3367d6;
    transition: background-color 0.2s;
  }

  .g-sign-in-button .content-wrapper {
    height: 100%;
    width: 100%;
    border: 1px solid transparent;
  }

  .g-sign-in-button img {
    width: 18px;
    height: 18px;
  }

  .g-sign-in-button .logo-wrapper {
    padding: 15px;
    background: #fff;
    width: 48px;
    height: 100%;
    border-radius: 1px;
    display: inline-block;
  }

  .g-sign-in-button .text-container {
    font-family: Roboto, arial, sans-serif;
    font-weight: 500;
    letter-spacing: 0.21px;
    font-size: 16px;
    line-height: 48px;
    vertical-align: top;
    border: none;
    display: inline-block;
    text-align: center;
    width: 180px;
  }
</style>
