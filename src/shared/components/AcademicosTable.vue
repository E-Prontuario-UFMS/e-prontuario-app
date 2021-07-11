<template>
  <v-data-table
    :headers="headers"
    :options="options"
    :items="academicos"
  ></v-data-table>
</template>

<script>
  export default {
    props: {
      academicos: {
        type: Array,
        default: () => [],
      },
    },
    data: () => ({
      headers: [
        {
          text: "Nome",
          value: "nome",
        },
        { text: "RGA", value: "rga" },
      ],
      options: {},
    }),
  };
</script>

<style></style>
