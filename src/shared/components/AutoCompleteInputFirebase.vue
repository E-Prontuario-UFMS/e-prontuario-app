<template>
  <v-responsive max-width="300">
    <v-autocomplete
      v-model="select"
      :items="documentos"
      :search-input.sync="search"
      item-text="titulo"
      item-value="symbol"
      cache-items
      class="mx-4"
      hide-no-data
      hide-details
      dense
      flat
      label="Procedimentos"
      solo-inverted
      return-object
    ></v-autocomplete>
  </v-responsive>
</template>

<script>
  import { db } from "../../firebase";
  export default {
    data: () => ({
      search: "",
      select: null,
      documentos: [],
    }),
    watch: {
      select(val) {
        this.search = "";
        if (this.$route.path !== `/home/documento/${val.id}`) {
          this.$router.push(`/home/documento/${val.id}`);
        }
      },
    },
    firestore: {
      documentos: db.collection("modelos"),
    },
  };
</script>

<style></style>
