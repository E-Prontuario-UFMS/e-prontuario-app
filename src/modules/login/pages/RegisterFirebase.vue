<template>
  <v-main>
    <v-container fluid>
      <switch-theme></switch-theme>
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
              <v-form @submit.prevent="handleFormSubmit">
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
                  data-cy="senha"
                ></v-text-field>
                <v-row class="mt-5" justify="center">
                  <v-btn large class="primary" type="submit" data-cy="btn-next">
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
  import { mapActions } from "vuex";
  export default {
    components: { EOverlay, SwitchTheme, Logo },
    mixins: [loadingMixin],
    data: () => ({
      passaporte: "",
      senha: "",
      show1: false,
    }),
    methods: {
      ...mapActions("login", ["saveUsuarioProvisorio"]),
      async handleFormSubmit() {
        this.startLoading();
        const data = await doSiscadLogin(this);

        if (data instanceof Error) {
          console.log(data.message);
        } else {
          this.saveUsuarioProvisorio(data);
          this.$router.push("/create-email");
        }
        this.stopLoading();
      },
    },
  };
</script>

<style></style>
