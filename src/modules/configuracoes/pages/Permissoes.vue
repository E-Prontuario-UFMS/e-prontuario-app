<template>
  <v-container>
    <e-title title="Permissões" route="/configuracoes" />

    <v-card class="my-5 pa-5">
      <v-autocomplete
        :items="users"
        item-text="nome"
        dense
        clearable
        v-model="search"
        outlined
      />
      <v-data-table :items="users" :headers="headers" :search="search">
        <template v-slot:item.isAdmin="{ item }">
          <v-switch v-model="item.isAdmin" />
        </template>
        <template v-slot:item.isProfessor="{ item }">
          <v-switch
            v-model="item.isProfessor"
            @click.prevent="handleChangePermission(item)"
          />
        </template>
      </v-data-table>
    </v-card>
    <e-overlay :loading="loading" />
  </v-container>
</template>

<script>
  import { ETitle, EOverlay } from "@/shared/components";
  import {
    fetchAllUsers,
    updateUser,
  } from "../../../firebase/services/usuarios";
  import { loadingMixin, permissionsMixin } from "@/mixins";
  export default {
    mixins: [loadingMixin, permissionsMixin],
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
      search: "",
    }),
    methods: {
      async loadAllUsers() {
        this.startLoading();
        const users = await fetchAllUsers();
        this.users = users;
        this.stopLoading();
      },
      async handleChangePermission(item) {
        await updateUser(item);
      },
    },
    async mounted() {
      this.redirectIfHasNoPermission();
      this.loadAllUsers();
    },
  };
</script>
