<template>
  <v-container>
    <v-row class="pt-8 pb-8 ml-10">
      <v-btn icon class="mr-10" @click="goBack">
        <v-icon>
          mdi-arrow-left
        </v-icon>
      </v-btn>
      <h5>Novo Modelo de Documento Firebase</h5>
    </v-row>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1" editable>
          Nome e Descrição
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2">
          Campos para Preenchimento
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3">
          Conferencia e Finalização
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card class="mb-12">
            <v-text-field
              class="pa-4"
              dense
              outlined
              placeholder="Ex: Admissão"
              label="Nome do modelo"
              clearable
              hide-details
              v-model="tituloDocumento"
            />
            <v-textarea
              class="pa-4"
              dense
              outlined
              placeholder="Ex: Descorra sobre o Exemplo"
              label="Descrição do Modelo"
              clearable
              hide-details
              v-model="descricaoDocumento"
            />
          </v-card>

          <v-btn
            color="primary"
            @click="goToStepThree"
            :disabled="!(tituloDocumento && descricaoDocumento)"
          >
            Continuar
          </v-btn>

          <v-btn text>
            Cancelar
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card class="mb-12">
            <v-data-table
              locale="pt-BR"
              :headers="headers"
              :items="itensDocumentos"
              class="elevation-1"
            >
              <template v-slot:item.tipo="{ item }">
                {{ getTipoCampoString(item) }}
              </template>
              <template v-slot:top>
                <v-toolbar>
                  <v-dialog
                    v-model="dialog"
                    fullscreen
                    hide-overlay
                    transition="dialog-bottom-transition"
                    persistent
                    eager
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-row>
                        <v-col>
                          <v-btn
                            color="success"
                            dark
                            class="mb-2"
                            v-bind="attrs"
                            v-on="on"
                          >
                            <v-icon>
                              mdi-plus
                            </v-icon>
                            Novo Item
                          </v-btn>
                        </v-col>
                      </v-row>
                    </template>
                    <v-row justify="center">
                      <v-dialog
                        v-model="dialog"
                        fullscreen
                        hide-overlay
                        transition="dialog-bottom-transition"
                      >
                        <v-card>
                          <v-toolbar dark color="primary">
                            <v-btn icon dark @click="close()">
                              <v-icon>mdi-close</v-icon>
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-toolbar-items>
                              <v-btn dark text @click="saveAndContinue()">
                                Salvar e Continuar
                              </v-btn>
                              <v-btn dark text @click="save()">
                                Salvar
                              </v-btn>
                            </v-toolbar-items>
                          </v-toolbar>

                          <v-container>
                            <v-row class="pl-3 pt-4">
                              <h4>Novo Item</h4>
                            </v-row>
                          </v-container>
                          <v-container>
                            <v-row class="mt-2">
                              <v-col class="col-12 ">
                                <v-text-field
                                  v-model="editedItem.tituloItemDocumento"
                                  label="Nome do Campo"
                                  outlined
                                >
                                </v-text-field>
                              </v-col>
                            </v-row>

                            <v-snackbar v-model="snackbar" color="success">
                              Item Adicionado
                              <template v-slot:action="{}">
                                <v-btn
                                  color="black"
                                  text
                                  @click="snackbar = false"
                                >
                                  X
                                </v-btn>
                              </template>
                            </v-snackbar>
                            <v-row>
                              <v-col class="col-12 ">
                                <v-textarea
                                  dense
                                  outlined
                                  label="Descrição"
                                  clearable
                                  hide-details
                                  v-model="editedItem.descricao"
                                />
                              </v-col>
                            </v-row>

                            <v-row>
                              <v-col
                                class="col-xl-12 col-sm-6 col-md-9 col-lg-9"
                              >
                                <v-row>
                                  <v-col cols="12">
                                    <v-container fluid>
                                      <v-switch
                                        class="float-md-left"
                                        v-model="editedItem.isObrigatorio"
                                        color="success"
                                        label="Item é obrigatório"
                                        hide-details
                                      ></v-switch>
                                    </v-container>
                                  </v-col>
                                </v-row>
                              </v-col>
                              <v-col
                                class="col-xl-12 col-sm-6 col-md-3 col-lg-3"
                              >
                                <v-radio-group
                                  v-model="editedItem.tipo"
                                  label="Tipo do Campo"
                                >
                                  <v-radio
                                    label="Texto"
                                    value="STRING"
                                  ></v-radio>
                                  <v-radio
                                    label="Data-Hora"
                                    value="DATETIME"
                                  ></v-radio>
                                  <v-radio
                                    label="Verdadeiro ou Falso"
                                    value="BOOLEAN"
                                  ></v-radio>
                                  <v-radio
                                    label="Número"
                                    value="NUMBER"
                                  ></v-radio>
                                </v-radio-group>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card>
                      </v-dialog>
                    </v-row>
                  </v-dialog>
                  <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                      <v-card-title class="headline"
                        >Você quer excluir esse item ?
                      </v-card-title>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDelete()"
                          >Cancelar
                        </v-btn>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="deleteItemConfirm"
                          >Confirmar
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

              <template v-slot:item.isObrigatorio="{ item }">
                {{ item.isObrigatorio ? "Sim" : "Não" }}
              </template>

              <template v-slot:no-data>
                Sem itens
              </template>
            </v-data-table>
            <v-spacer />
          </v-card>

          <v-btn color="primary" @click="e1 = 3">
            Continuar
          </v-btn>
          <v-btn text @click="e1 = 1">
            Voltar
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card class="mb-12 pa-2">
            <h4 class="pa-2">{{ tituloDocumento }}</h4>
            <v-textarea
              class="pa-2"
              :value="descricaoDocumento"
              disabled
            ></v-textarea>
            <v-data-table
              :headers="headers"
              :items="itensDocumentos"
              class="elevation-1"
            >
              <template v-slot:item.tipo="{ item }">
                {{ getTipoCampoString(item) }}
              </template>
              <template v-slot:item.isObrigatorio="{ item }">
                {{ item.isObrigatorio ? "Sim" : "Não" }}
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
          </v-card>
          <v-btn color="success" @click="validarESalvarModelo()">
            Finalizar e Salvar
          </v-btn>
          <v-btn text @click="e1 = 2">
            Voltar
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>
<script>
  import { mapActions } from "vuex";
  // import { formToApi } from "../services/formToApi";
  // import { createModeloDocumento } from "../services";
  import { loadingMixin } from "@/mixins";
  import { db } from "../../../firebase";
  import slugify from "slugify";
  import { TEXT_TABLE } from "../../../constants";
  export default {
    mixins: [loadingMixin],
    data: () => ({
      dialog: false,
      e1: 1,
      snackbar: false,
      dialogDelete: false,
      tituloDocumento: "",
      descricaoDocumento: "",
      headers: [
        {
          text: "Nome do Campo",
          value: "tituloItemDocumento",
          align: "start",
        },
        {
          text: "Tipo",
          value: "tipo",
          align: "start",
          sortable: false,
        },
        {
          text: "Obrigatório ?",
          sortable: false,
          value: "isObrigatorio",
          align: "start",
        },
        {
          text: "Descrição",
          value: "descricao",
          align: "start",
        },
        { text: "Ações", value: "actions", sortable: false },
      ],
      itensDocumentos: [],
      editedIndex: -1,
      editedItem: {
        tituloItemDocumento: "",
        isObrigatorio: false,
        tipo: 0,
        descricao: "",
      },
      defaultItem: {
        tituloItemDocumento: "",
        isObrigatorio: false,
        tipo: 0,
        descricao: "",
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
      ...mapActions("documento", ["ActionGetModelosDeDocumentoDaApi"]),
      goBack() {
        this.$router.go(-1);
      },
      getTipoCampoString(item) {
        return TEXT_TABLE[item.tipo];
      },

      editItem(item) {
        this.editedIndex = this.itensDocumentos.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true;
      },

      deleteItem(item) {
        this.editedIndex = this.itensDocumentos.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialogDelete = true;
      },

      deleteItemConfirm() {
        this.itensDocumentos.splice(this.editedIndex, 1);
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
          Object.assign(
            this.itensDocumentos[this.editedIndex],
            this.editedItem,
          );
        } else {
          this.itensDocumentos.push(this.editedItem);
        }
        this.snackbar = true;
        this.close();
      },
      saveAndContinue() {
        if (this.editedIndex > -1) {
          Object.assign(
            this.itensDocumentos[this.editedIndex],
            this.editedItem,
          );
        } else {
          this.itensDocumentos.push(this.editedItem);
        }
        this.snackbar = true;
        this.editedItem = {
          tituloItemDocumento: "",
          isObrigatorio: false,
          tipo: 0,
          descricao: "",
        };
      },

      async goToStepThree() {
        try {
          await this.handleCreateModeloDocumento();
        } catch (e) {
          this.snackbar = true;
          return;
        }
        this.e1 = 2;
      },

      async handleCreateModeloDocumento() {
        const { tituloDocumento: titulo, descricaoDocumento: descricao } = this;
        this.startLoading();
        // await createModeloDocumento({ titulo, descricao });
        // await db.collection("modelos").add({
        //   titulo,
        //   descricao,
        // });
        db.collection("modelos")
          .doc(slugify(titulo, { lower: true }))
          .set({
            titulo,
            descricao,
          });
        this.stopLoading();
      },

      async validarESalvarModelo() {
        const modeloDocumento = {
          titulo: this.tituloDocumento,
          descricao: this.descricaoDocumento,
          itensDocumentos: this.itensDocumentos,
        };

        db.collection("modelos")
          .doc(slugify(modeloDocumento.titulo, { lower: true }))
          .set({
            ...modeloDocumento,
          });
        this.$router.push("/home/documento");
        // await formToApi(modeloDocumento);
        // this.ActionGetModelosDeDocumentoDaApi();
        // this.$router.push("/home/documento");
      },
    },
    firestore: {
      documentos: db.collection("modelos"),
    },
  };
</script>

<style></style>
