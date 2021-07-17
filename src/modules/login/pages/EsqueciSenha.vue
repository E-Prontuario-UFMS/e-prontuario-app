<template>
  <v-container>
    <stick-top route="/" />
    <v-row justify="center">
      <v-col md="7" sm="12">
        <logo />
        <v-card class="py-8 px-4">
          <v-card-title>
            <span>Para recuperar a senha, digite seu email</span>
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
            />
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
  import { firebase } from "../../../firebase";
  import { toastMixin } from "../../../mixins";
  import { Logo, StickTop } from "@/shared/components";
  export default {
    mixins: [toastMixin],
    components: { Logo, StickTop },
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
