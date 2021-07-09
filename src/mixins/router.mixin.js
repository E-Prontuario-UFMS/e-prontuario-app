import router from "../router";
export default {
  computed: {
    getRouteId() {
      return this.$route.params.id;
    },
  },
  methods: {
    goTo(route) {
      router.push(route);
    },
    goBack() {
      router.back();
    },
  },
};
