<template>
  <v-main>
    <v-container fluid>
      <stick-top route="/home" />
      <logo />
      <v-layout justify-center>
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
          <v-card
            class="elevation-12 py-3 px-5 flex-column align-center"
            shaped
          >
            <v-card-title class="py-5 mx-auto">
              <h4 class="text--primary">E-Prontuario</h4>
            </v-card-title>

            <v-card-text>
              <v-form>
                <v-text-field
                  class="email-form"
                  v-model="email"
                  name="email"
                  label="Email"
                  :disabled="loading"
                  data-cy="email"
                  outlined
                  rounded
                  filled
                  dense
                />
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
                  filled
                  rounded
                  dense
                />
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-layout justify-center>
                <v-btn
                  large
                  color="primary"
                  class="mr-1"
                  @click="doLogin"
                  data-cy="btn-next"
                >
                  Entrar
                </v-btn>
                <v-btn
                  data-cy="btn-register"
                  @click="goTo('registro')"
                  large
                  color="primary"
                  outlined
                  class="ml-1"
                >
                  Registrar
                </v-btn>
              </v-layout>
            </v-card-actions>
            <google-login-button :googleLogin="googleLogin" />
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
  import { mapActions } from "vuex";
  import { routerMixin, loadingMixin, toastMixin } from "@/mixins";
  import { doLogin } from "../services/firebase";
  import { firebase } from "../../../firebase";
  import { getUserByAuthenticationId } from "../../../firebase/services/academico";
  import { StickTop, Logo, GoogleLoginButton } from "@/shared/components";
  export default {
    components: { Logo, StickTop, GoogleLoginButton },
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
          isAdmin: firebaseUser.isAdmin,
          uid: user.uid,
        });
        this.throwSuccess("Login Bem Sucedido");
        this.$router.push("/home");
      },

      googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
        firebase.auth().languageCode = "pt_BR";
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

<style lang="scss" scoped></style>
