import toastMixin from "./toast.mixin";

export default {
  mixins: [toastMixin],
  computed: {
    hasAdminPermission() {
      return this.$store.state.login.user.isAdmin;
    },
    hasProfessorPermission() {
      return this.$store.state.login.user.isProfessor;
    },
  },
  methods: {
    redirectIfIsNotAdmin() {
      if (!this.hasAdminPermission) {
        this.throwError("Você não tem permissão para acessar essa pagina");
        this.$router.push("/home");
      }
    },
    redirectIfHasNoPermission() {
      if (!this.hasAdminPermission && !this.hasProfessorPermission) {
        this.throwError("Você não tem permissão para acessar essa pagina");
        this.$router.push("/home");
      }
    },
  },
};
