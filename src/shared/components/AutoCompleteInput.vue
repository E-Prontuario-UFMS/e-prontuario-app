<template>
  <v-responsive max-width="300">
    <v-autocomplete
      v-model="select"
      :items="modelosDeDocumento"
      :search-input.sync="search"
      item-text="tituloDocumento"
      item-value="symbol"
      cache-items
      class="mx-4"
      hide-no-data
      hide-details
      dense
      flat
      label="Procedimentos"
      solo-inverted
    ></v-autocomplete>
  </v-responsive>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    data: () => ({
      search: "",
      select: null,
    }),
    computed: {
      ...mapState("documento", ["modelosDeDocumento"]),
    },
    watch: {
      select(val) {
        this.search = "";
        if (this.$route.path !== `/home/documento/${val}`) {
          this.$router.push(`/home/documento/${val}`);
        }
      },
    },
  };
</script>

<style></style>
