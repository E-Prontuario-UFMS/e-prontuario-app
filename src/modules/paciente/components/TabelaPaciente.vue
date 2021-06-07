<template>
  <v-container>
    <v-alert v-if="alert.active" color="red darken-1" dismissible
      >{{ alert.message }}
    </v-alert>
    <v-alert :value="deletePacienteAlert" color="red darken-1" dismissible>
      Não foi possivel remover o paciente
    </v-alert>
    <v-card class="pa-5" elevation="10">
      <v-card-title>Pacientes</v-card-title>
      <div class="row">
        <div class="col-md-12 pb-0">
          <v-text-field
            dense
            label="Buscar Paciente..."
            outlined
            append-icon="mdi-magnify"
            v-model="search"
          >
          </v-text-field>
        </div>
      </div>

      <div class="row mb-3">
        <div class="col-md-12 pt-0">
          <v-btn
            color="success"
            style="text-decoration:none; float: right;"
            to="paciente/novo-paciente"
          >
            <v-icon>
              mdi-plus
            </v-icon>
            Adicionar
          </v-btn>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div
            style="border-bottom: 2px solid #1e4ffa;border-top: 2px solid #1e4ffa;"
          >
            <v-data-table
              no-data-text="Nada para mostrar"
              :headers="headers"
              :options="options"
              :items="pacientesPagination.content"
              class="elevation-1"
              hide-default-footer
              :items-per-page="limit"
              :page="page"
              :search="search"
            >
              <template v-slot:item.cpf="{ item }">
                {{ getFormattedCpf(item.cpf) }}
              </template>

              <template v-slot:item.actions="{ item }">
                <v-icon class="mr-2" small>
                  mdi-arrow-right
                </v-icon>
                <v-icon class="mr-2" small @click="acessarPaciente(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small class="mr-2" @click="deleteItem(item)">
                  mdi-delete
                </v-icon>
              </template>
              <template v-slot:no-data>
                Sem itens
              </template>
            </v-data-table>
            <v-pagination
              v-model="paginationSelect"
              :length="pacientesPagination.totalPages"
            ></v-pagination>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline">
                  Você quer excluir esse item ?
                </v-card-title>
                <v-card-actions>
                  <v-spacer />
                  <v-btn color="blue darken-1" text @click="closeDelete()">
                    Cancelar
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="deleteItemConfirm()"
                  >
                    OK
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </div>
      </div>
    </v-card>
  </v-container>
</template>

<script>
  import { mapActions, mapState } from "vuex";
  import { removePaciente } from "@/modules/paciente/services";

  export default {
    data: () => ({
      alert: {
        active: false,
        message: "",
      },
      deletePacienteAlert: false,
      loading: false,
      dialog: false,
      dialogDelete: false,
      search: "",
      pacientesResponse: {},
      paginationSelect: 1,
      options: {},
      error: "",
      defaultItem: {
        id: 0,
        cpf: "",
        nome: "",
        genero: "",
      },
      editedItem: {
        id: 0,
        cpf: "",
        nome: "",
        genero: "",
      },
      headers: [
        {
          text: "Nome",
          value: "nome",
        },
        { text: "CPF", value: "cpf" },
        {
          text: "Genero",
          value: "genero",
        },
        { text: "Ações", value: "actions", sortable: false },
      ],
    }),
    computed: {
      ...mapState("paciente", ["page", "limit", "pacientesPagination"]),
    },
    methods: {
      ...mapActions("paciente", [
        "ActionSetPage",
        "ActionSetLimit",
        "ActionDeletePaciente",
        "ActionGetPacientesFromApi",
      ]),
      acessarPaciente(item) {
        this.$router.push({ name: "EditarPaciente", params: { id: item.id } });
      },
      alertTrigger() {
        this.deletePacienteAlert = true;
        setTimeout(() => {
          this.deletePacienteAlert = false;
        }, 5000);
      },

      getFormattedCpf(cpf) {
        return `${cpf.substring(0, 3)}.${cpf.substring(3, 6)}.${cpf.substring(
          6,
          9
        )}.${cpf.substring(9, 11)}`;
      },

      deleteItem(item) {
        this.editedIndex = this.pacientesPagination.content.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialogDelete = true;
      },

      closeDelete() {
        this.dialogDelete = false;
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        });
      },

      async deleteItemConfirm() {
        removePaciente(this.editedItem.id)
          .then(data => {
            if (data.status === 200) {
              this.closeDelete();
              this.ActionGetPacientesFromApi({
                page: this.page,
                limit: this.limit,
              });
            } else {
              this.closeDelete();
            }
          })
          .catch(err => {
            console.log(err);
          });

        /**.then(() => {
          this.closeDelete();
          this.ActionGetPacientesFromApi();
        })
       .catch(() => {
          this.alert.active = true;
          this.alert.message = "Não foi possivel remover o paciente";
        }); */
      },
    },
    watch: {
      paginationSelect(val) {
        this.ActionSetPage(val - 1);
      },
    },
  };
</script>

<style></style>
