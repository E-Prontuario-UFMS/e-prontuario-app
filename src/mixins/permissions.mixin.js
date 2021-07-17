export default {
  methods: {
    hasAdminPermission() {
      return this.$store.permissions.admin;
    },
  },
};
