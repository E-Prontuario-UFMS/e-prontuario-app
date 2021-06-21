export default {
  methods: {
    throwError(message) {
      this.$toast.open({
        type: "error",
        message: message,
        position: "top-right",
      });
    },
  },
};
