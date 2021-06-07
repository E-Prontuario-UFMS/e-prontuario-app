<template>
  <v-container>
    <v-row align="center" class="pt-8 pb-8 ml-10">
      <v-btn icon class="mr-10" @click="goBack">
        <v-icon>
          mdi-arrow-left
        </v-icon>
      </v-btn>
      <h1>Novo Documento</h1></v-row
    >
    <v-card elevation="10" class="pa-2 ma-2">
      <v-data-table
        :headers="headers"
        :items="itemDocumentos"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar>
            <v-text-field
              dense
              outlined
              rounded
              placeholder="Ex: Admissão"
              label="Nome modelo"
              clearable
              hide-details
              v-model="tituloDocumento"
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px" persistent>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="success"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Novo Item
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.tituloItemDocumento"
                          label="Nome do Campo"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        Quantidade Maxima:
                        <b>{{ editedItem.qtdMaximaRegistros }}</b>
                        <v-slider
                          v-model="editedItem.qtdMaximaRegistros"
                          max="20"
                          step="1"
                          :thumb-size="24"
                          thumb-label
                          append-icon="mdi-plus"
                          prepend-icon="mdi-minus"
                        ></v-slider>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <label for="">É Obrigatório</label>
                        <v-switch
                          v-model="editedItem.isItemDocumentoObrigatorio"
                        ></v-switch>
                      </v-col>
                      <v-row align="center"
                        ><v-col cols="12" sm="6" md="4">
                          <v-radio-group
                            v-model="editedItem.tipoCampo"
                            label="Tipo do Campo"
                          >
                            <v-radio label="Texto" value="Texto"></v-radio>
                            <v-radio
                              label="Data-Hora"
                              value="Data e Hora"
                            ></v-radio>
                            <v-radio
                              label="Verdadeiro ou Falso"
                              value="Sim ou Não"
                            ></v-radio>
                            <v-radio label="Número" value="Número"></v-radio>
                            <v-radio label="Decimal" value="Decimal"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="8" md="8">
                          <v-text-field
                            label="Descrição"
                            v-model="editedItem.descricao"
                          >
                          </v-text-field>
                        </v-col>
                      </v-row>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline"
                  >Você quer excluir esse item ?
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>
          Sem itens
        </template>
      </v-data-table>
      <v-btn block color="success" @click="validarESalvarModelo">Salvar</v-btn>
    </v-card>
  </v-container>
</template>
<script>
  import { formToApi } from "../services/formToApi";

  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      tituloDocumento: "",
      headers: [
        {
          text: "Nome do Campo",
          value: "tituloItemDocumento",
          align: "start",
        },
        {
          text: "Tipo",
          value: "tipoCampo",
          align: "start",
          sortable: false,
        },
        {
          text: "Obrigatório ?",
          sortable: false,
          value: "isItemDocumentoObrigatorio",
          align: "start",
        },
        {
          text: "Quantidade Maxima",
          sortable: false,
          value: "qtdMaximaRegistros",
          align: "start",
        },
        {
          text: "Descrição",
          value: "descricao",
          align: "start",
        },
        { text: "Ações", value: "actions", sortable: false },
      ],
      itemDocumentos: [],
      editedIndex: -1,
      editedItem: {
        tituloItemDocumento: "",
        isItemDocumentoObrigatorio: false,
        qtdMaximaRegistros: 1,
        tipoCampo: 0,
      },
      defaultItem: {
        tituloItemDocumento: "",
        isItemDocumentoObrigatorio: false,
        qtdMaximaRegistros: 1,
        tipoCampo: 0,
      },
    }),

    computed: {
      formTitle() {
        return this.editedIndex === -1 ? "Novo Item" : "Editar Item";
      },
    },

    watch: {
      dialog(val) {
        val || this.close();
      },
      dialogDelete(val) {
        val || this.closeDelete();
      },
    },

    methods: {
      goBack() {
        this.$router.go(-1);
      },

      editItem(item) {
        this.editedIndex = this.itemDocumentos.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true;
      },

      deleteItem(item) {
        this.editedIndex = this.itemDocumentos.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialogDelete = true;
      },

      deleteItemConfirm() {
        this.itemDocumentos.splice(this.editedIndex, 1);
        this.closeDelete();
      },

      close() {
        this.dialog = false;
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        });
      },

      closeDelete() {
        this.dialogDelete = false;
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        });
      },

      save() {
        if (this.editedIndex > -1) {
          Object.assign(this.itemDocumentos[this.editedIndex], this.editedItem);
        } else {
          this.itemDocumentos.push(this.editedItem);
        }
        this.close();
      },

      validarESalvarModelo() {
        const modeloDocumento = {
          tituloDocumento: this.tituloDocumento,
          itemDocumentos: this.itemDocumentos,
        };
        formToApi(modeloDocumento);
      },
    },
  };
</script>

<style></style>
