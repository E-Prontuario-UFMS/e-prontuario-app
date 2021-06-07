import router from "../router";
export default {
  methods: {
    goTo(route) {
      router.push(route);
    },
    goBack() {
      router.back();
    },
  },
};
