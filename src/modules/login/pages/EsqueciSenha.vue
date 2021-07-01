<template>
  <v-container>
    <switch-theme></switch-theme>
    <e-title
      style="margin-left: 0px"
      route="/"
      title="Esqueceu a senha"
    ></e-title>

    <v-row justify="center">
      <v-col md="6" sm="12">
        <logo> </logo>
        <v-card class="py-8 px-4">
          <v-card-title>
            Para recuperar a senha, digite seu email
          </v-card-title>
          <v-form
            v-model="form"
            class="px-4"
            @submit.prevent="sendRecoveryPasswordEmail"
          >
            <v-text-field
              label="Digite seu Email"
              :rules="[emailRules.required]"
              v-model="email"
              required
              outlined
            >
            </v-text-field>
            <v-btn :disabled="!form" color="success" type="submit" block>
              Enviar
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import SwitchTheme from "@/shared/components/SwitchTheme.vue";
  import Logo from "@/shared/components/Logo.vue";
  import ETitle from "@/shared/components/ETitle.vue";
  import { firebase } from "../../../firebase";
  import { toastMixin } from "../../../mixins";
  export default {
    mixins: [toastMixin],
    components: { SwitchTheme, ETitle, Logo },
    data: () => ({
      email: "",
      form: false,
      emailRules: {
        required: value => !!value || "Não pode ser vazio.",
      },
    }),
    methods: {
      sendRecoveryPasswordEmail() {
        firebase
          .auth()
          .sendPasswordResetEmail(this.email)
          .then(() => {
            this.throwSuccess(
              "Email enviado com sucesso, cheque sua caixa de email",
            );
            this.$router.replace("/");
          })
          .catch(() => {
            this.throwError(
              "Não foi possivel enviar o email, cheque sua conexão ou os campos e tente novamente 😞",
            );
          });
      },
    },
  };
</script>

<style></style>
