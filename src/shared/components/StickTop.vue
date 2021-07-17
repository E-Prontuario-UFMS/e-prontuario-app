<template>
  <div class="stick">
    <switch-theme />
    <e-title v-if="hasRoute" style="margin-left: 0px" :route="route" title="" />
  </div>
</template>

<script>
  import SwitchTheme from "./SwitchTheme.vue";
  import ETitle from "./ETitle.vue";
  export default {
    components: { SwitchTheme, ETitle },
    props: {
      route: {
        type: String,
      },
    },
    computed: {
      hasRoute() {
        return !!this.route;
      },
    },
  };
</script>

<style>
  .stick {
    float: left;
    position: absolute;
  }
</style>
