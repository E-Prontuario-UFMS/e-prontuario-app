<template>
  <v-container>
    <e-title title="Permissões" route="/configuracoes" />

    <v-card class="my-5 pa-5"> <v-data-table></v-data-table> </v-card>
  </v-container>
</template>

<script>
  import { ETitle } from "@/shared/components";
  import { fetchAllUsers } from "../../../firebase/services/usuarios";
  export default {
    components: {
      ETitle,
    },
    async mounted() {
      const response = await fetchAllUsers();
      console.log(response);
    },
  };
</script>

<style></style>
