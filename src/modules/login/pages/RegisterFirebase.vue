<template>
  <v-main>
    <v-container>
      <stick-top route="/" />
      <logo />
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md5>
          <v-card class="pa-2" elevation="12">
            <v-card-title class="pa-5 mx-auto">
              <h1>Cadastro</h1>
            </v-card-title>
            <v-card-subtitle class="pb-12">
              <span>
                Para prosseguirmos precisaremos concluir algumas etapas
              </span>
            </v-card-subtitle>
            <v-card-text>
              <v-form @submit.prevent="handleFormSubmit" v-model="form">
                <v-text-field
                  outlined
                  label="Passaporte"
                  v-model="passaporte"
                  data-cy="passaporte"
                />
                <v-text-field
                  label="Senha"
                  v-model="senha"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  @click:append="show1 = !show1"
                  outlined
                  :rules="[passwordRules.required, passwordRules.min]"
                  data-cy="senha"
                />
                <v-row class="mt-5" justify="center">
                  <v-btn
                    large
                    class="primary"
                    type="submit"
                    :disabled="!form"
                    data-cy="btn-next"
                  >
                    Proximo
                  </v-btn>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <e-overlay :loading="loading" />
  </v-main>
</template>

<script>
  import { doSiscadLogin } from "../../../utils/siscad";
  import { loadingMixin } from "@/mixins";

  import { mapActions } from "vuex";
  import { toastMixin } from "../../../mixins";
  import { verifyIfExistsSamePassportInData } from "../services/firebase";

  import { StickTop, EOverlay, Logo } from "@/shared/components";
  export default {
    components: { EOverlay, Logo, StickTop },
    mixins: [loadingMixin, toastMixin],
    data: () => ({
      passaporte: "",
      senha: "",
      show1: false,
      form: false,
      passwordRules: {
        required: value => !!value || "Não pode ser vazio",
        min: value =>
          value.length >= 6 || "Precisa ter mais do que 6 caracteres",
      },
    }),
    methods: {
      ...mapActions("login", ["saveUsuarioProvisorio"]),
      async handleFormSubmit() {
        this.startLoading();
        const data = await doSiscadLogin(this);
        data instanceof Error
          ? this.throwError("Não foi possivel fazer o login no Siscad 😞")
          : this.saveUsuarioAndNavigate(data);
        this.stopLoading();
      },
      async saveUsuarioAndNavigate(data) {
        const response = await this.checkIfPassportIsAlreadyUsed();
        if (response.length == 0) {
          this.saveUsuarioProvisorio(data);
          this.$router.push("/create-email");
        } else {
          this.throwError(
            "Esse passaporte já está em uso, você esqueceu a senha ? 😞",
          );
        }
      },
      async checkIfPassportIsAlreadyUsed() {
        return await verifyIfExistsSamePassportInData(this.passaporte);
      },
    },
  };
</script>
