<template>
  <div v-if="!isLogin">
    <v-app-bar app clipped-right flat height="72" color="primary" dark>
      <v-btn icon @click="toggleDrawer" app>
        <v-icon>
          mdi-menu
        </v-icon>
      </v-btn>
      <v-spacer />

      <auto-complete-input-firebase />
      <switch-theme />
    </v-app-bar>

    <v-navigation-drawer
      app
      width="300"
      :value="drawerState"
      @input="ActionToggleDrawer"
    >
      <v-card height="128" width="100%">
        <v-avatar size="48">
          <img
            v-if="user.photoUrl"
            :src="user.photoUrl"
            alt="Profile do Usuario"
          />
          <v-icon v-else>mdi-account-circle</v-icon>
        </v-avatar>
        <v-card-title>{{ user && user.displayName }} </v-card-title>
        <v-card-subtitle>{{ user && user.email }}</v-card-subtitle>
      </v-card>

      <v-list shaped>
        <v-list-item-group v-model="selectedItem">
          <v-list-item value="HOME">
            <v-list-item-title>
              Home
            </v-list-item-title>
          </v-list-item>
          <v-list-item value="DOCUMENTOS">
            <v-list-item-title>
              Documento
            </v-list-item-title>
          </v-list-item>
          <v-list-item value="PACIENTES">
            <v-list-item-title>Pacientes</v-list-item-title>
          </v-list-item>
          <v-list-item value="DISCIPLINAS">
            <v-list-item-title>
              Disciplinas
            </v-list-item-title>
          </v-list-item>
          <v-list-item v-if="isProfessor" v-show="false" value="MATRICULAS">
            <v-list-item-title>
              Matriculas
            </v-list-item-title>
          </v-list-item>
          <v-list-item value="SUGESTOES">
            <v-list-item-title>
              Sugestões
            </v-list-item-title>
          </v-list-item>
          <v-list-item v-if="isProfessor" value="CONFIGURACOES">
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
  import { mapActions, mapGetters, mapState } from "vuex";
  import AutoCompleteInputFirebase from "./AutoCompleteInputFirebase.vue";

  export default {
    components: {
      SwitchTheme,
      AutoCompleteInputFirebase,
    },
    data: () => ({
      isLogin: true,
      selectedItem: "HOME",
    }),
    computed: {
      ...mapState("shared", ["drawerState"]),
      ...mapState("login", ["user"]),
      ...mapGetters("login", ["isProfessor"]),
    },
    methods: {
      ...mapActions("login", ["ActionDeleteGlobalUser"]),
      ...mapActions("documento", ["ActionSetDocumento"]),
      ...mapActions("shared", ["ActionToggleDrawer"]),
      doLogout() {
        this.ActionDeleteGlobalUser();
        this.ActionSetDocumento({});
        this.$router.push("/");
      },
      toggleDrawer() {
        this.ActionToggleDrawer(!this.drawerState);
      },
      toogleLogin() {
        this.isLogin = this.$router.currentRoute.fullPath === "/";
      },
      routing(value) {
        const ROUTES = {
          HOME: "/home",
          DOCUMENTOS: "/home/documento",
          PACIENTES: "/home/pacientes",
          DISCIPLINAS: "/home/disciplinas",
          CONFIGURACOES: "/configuracoes",
          SUGESTOES: "/home/feedback",
        };

        this.$router.replace(ROUTES[value]);
      },
    },
    watch: {
      $route() {
        this.toogleLogin();
      },
      selectedItem(val) {
        this.routing(val);
      },
    },
    mounted() {
      this.toogleLogin();
    },
  };
</script>
