<template>
  <v-container>
    <e-title title="Permissões" route="/configuracoes" />

    <v-card class="my-5 pa-5">
      <v-data-table :items="users" :headers="headers">
        <template v-slot:item.isAdmin="{ item }">
          <v-switch :value="item.isAdmin" />
        </template>
        <template v-slot:item.isProfessor="{ item }">
          <v-switch :value="item.isAdmin" />
        </template>
      </v-data-table>
    </v-card>
    <e-overlay :loading="loading"></e-overlay>
  </v-container>
</template>

<script>
  import { ETitle, EOverlay } from "@/shared/components";
  import { fetchAllUsers } from "../../../firebase/services/usuarios";
  import { loadingMixin } from "../../../mixins";
  export default {
    mixins: [loadingMixin],
    components: {
      ETitle,
      EOverlay,
    },
    computed: {
      headers() {
        return [
          {
            text: "Usuario",
            value: "nome",
          },
          {
            text: "RGA",
            value: "rga",
          },
          {
            text: "Admin",
            value: "isAdmin",
          },
          {
            text: "Professor",
            value: "isProfessor",
          },
        ];
      },
    },
    data: () => ({
      users: [],
      loading: false,
    }),
    methods: {
      async loadAllUsers() {
        this.startLoading();
        const users = await fetchAllUsers();
        console.log(users);
        this.users = users;
        this.stopLoading();
      },
    },
    async mounted() {
      this.loadAllUsers();
    },
  };
</script>

<style></style>
