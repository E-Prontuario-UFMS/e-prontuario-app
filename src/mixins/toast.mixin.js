export default {
  methods: {
    throwError(message, options = {}) {
      this.$toast.open({
        type: "error",
        message,
        position: "top-right",
        duration: 5000,
        ...options,
      });
    },
    throwSuccess(message, options = {}) {
      this.$toast.open({
        type: "success",
        message,
        position: "top-right",
        duration: 5000,
        ...options,
      });
    },
    throwWarning(message, options = {}) {
      this.$toast.warning({
        message,
        position: "top-right",
        duration: 5000,
        ...options,
      });
    },
  },
};
