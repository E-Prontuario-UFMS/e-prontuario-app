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
                ></v-text-field>
                <v-text-field
                  :disabled="loading"
                  outlined
                  v-model="senha"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[passwordRules.required, passwordRules.min]"
                  :type="show1 ? 'text' : 'password'"
                  name="input-10-1"
                  label="Senha"
                  @keypress.enter="doLogin"
                  @click:append="show1 = !show1"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-layout align-center justify-center>
                <v-btn large class="primary" @click="doLogin">
                  Entrar
                </v-btn>
                <v-btn @click="goTo('registro')" large class="secondary ml-2">
                  Registrar
                </v-btn>
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
  import { routerMixin, loadingMixin } from "@/mixins";
  import { doLogin } from "../services/firebase";

  export default {
    components: { Logo, SwitchTheme },
    mixins: [routerMixin, loadingMixin],
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
        if (!(data instanceof Error)) {
          console.log(data.user);
          // this.setUser(data.user);
          // this.$router.push("/home");
        }
        this.stopLoading();
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
