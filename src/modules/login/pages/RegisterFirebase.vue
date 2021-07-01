<template>
  <v-main>
    <v-container>
      <switch-theme></switch-theme>
      <e-title style="margin-left: 0px" route="/" title=""></e-title>
      <logo />
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md5>
          <v-card class="login-title elevation-12 pa-5 flex-column" shaped>
            <v-card-title class="pa-5 mx-auto">
              <h1 class="pt-5">Cadastro</h1>
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
                ></v-text-field>
                <v-text-field
                  label="Senha"
                  v-model="senha"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  @click:append="show1 = !show1"
                  outlined
                  :rules="[passwordRules.required, passwordRules.min]"
                  data-cy="senha"
                ></v-text-field>
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
    <e-overlay :loading="loading"></e-overlay>
  </v-main>
</template>

<script>
  import Logo from "@/shared/components/Logo.vue";
  import { doSiscadLogin } from "../../../utils/siscad";
  import { loadingMixin } from "@/mixins";

  import EOverlay from "../../../shared/components/EOverlay.vue";
  import SwitchTheme from "../../../shared/components/SwitchTheme.vue";
  import ETitle from "../../../shared/components/ETitle.vue";
  import { mapActions } from "vuex";
  import { toastMixin } from "../../../mixins";
  import { verifyIfExistsSamePassportInData } from "../services/firebase";
  export default {
    components: { EOverlay, SwitchTheme, Logo, ETitle },
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
            "Esse passaporte já está em uso, você esqueceu a senha ? ",
          );
        }
      },
      async checkIfPassportIsAlreadyUsed() {
        return await verifyIfExistsSamePassportInData(this.passaporte);
      },
    },
  };
</script>

<style></style>
