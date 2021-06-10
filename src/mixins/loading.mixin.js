export default {
  data: () => ({
    loading: false,
  }),
  methods: {
    startLoading() {
      this.loading = true;
    },
    stopLoading() {
      this.loading = false;
    },
  },
};
