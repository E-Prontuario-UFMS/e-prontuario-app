<template>
  <div v-if="!isLogin">
    <v-app-bar app clipped-right flat height="72" color="primary" dark>
      <v-btn icon @click="toogleDrawer" app>
        <v-icon>
          mdi-menu
        </v-icon>
      </v-btn>
      <v-spacer></v-spacer>

      <auto-complete-input-firebase></auto-complete-input-firebase>
      <switch-theme />
    </v-app-bar>

    <v-navigation-drawer app width="300" v-model="drawer">
      <v-card height="128" width="100%">
        <v-card-title>{{ user && user.displayName }} </v-card-title>
        <v-card-subtitle>{{ user && user.email }}</v-card-subtitle>
      </v-card>

      <v-list shaped>
        <v-list-item-group v-model="selectedItem">
          <v-list-item>
            <v-list-item-title>
              Home
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              Documento
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Paciente</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="isProfessor">
            <v-list-item-title>
              Disciplinas
            </v-list-item-title>
          </v-list-item>
          <v-list-item v-if="isProfessor">
            <v-list-item-title>
              Matriculas
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              Sugestões
            </v-list-item-title>
          </v-list-item>
          <v-list-item v-if="isProfessor">
            <v-list-item-title>Configurações </v-list-item-title>
          </v-list-item>
          <v-list-item @click="doLogout">
            <v-list-item-title> Sair </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
  import SwitchTheme from "./SwitchTheme.vue";
  import { mapActions, mapState } from "vuex";
  import AutoCompleteInputFirebase from "./AutoCompleteInputFirebase.vue";

  export default {
    components: {
      SwitchTheme,
      AutoCompleteInputFirebase,
    },
    data: () => ({
      drawer: true,
      isLogin: true,
      selectedItem: 0,
    }),
    computed: {
      ...mapState("login", ["user"]),
      isProfessor() {
        return true;
      },
    },
    methods: {
      ...mapActions("login", ["ActionDeleteGlobalUser"]),
      ...mapActions("documento", ["ActionSetDocumento"]),
      doLogout() {
        this.ActionDeleteGlobalUser();
        this.ActionSetDocumento({});
        this.$router.push("/");
      },
      toogleDrawer() {
        this.drawer = !this.drawer;
      },
      toogleLogin() {
        this.isLogin = this.$router.currentRoute.fullPath === "/";
      },
    },
    watch: {
      $route() {
        this.toogleLogin();
      },
      selectedItem(val) {
        switch (val) {
          case 0:
            this.$router.replace({ name: "Home" });
            break;

          case 1:
            this.$router.replace({ name: "Documento" });
            break;

          case 2:
            this.$router.replace({ name: "Pacientes" });
            break;

          case 3:
            this.$router.replace({ name: "Disciplinas" });
            break;

          case 4:
            this.$router.replace("/matriculas");
            break;

          case 5:
            this.$router.replace("/home/feedback");
            break;

          case 6:
            this.$router.replace("/configuracoes");
            break;

          case 7:
            this.doLogout();
            break;
          default:
            break;
        }
      },
    },
    mounted() {
      this.toogleLogin();
    },
  };
</script>

<style></style>
