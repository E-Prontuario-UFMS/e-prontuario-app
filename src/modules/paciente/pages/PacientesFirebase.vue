<template>
  <v-container>
    <e-title title="Pacientes" route="/home"></e-title>
    <v-row justify="end" class="mr-4">
      <v-btn color="success" @click="goTo('/home/paciente/novo-paciente')">
        Adicionar Novo
      </v-btn>
    </v-row>
    <v-card class="my-5">
      <v-data-table :items="pacientes" :headers="header">
        <template v-slot:item.acoes="{ item }">
          <v-btn class="ml-2" @click="goTo(`paciente/${item.id}`)" icon>
            <v-icon class="ml-2" small>
              mdi-arrow-right
            </v-icon>
          </v-btn>
          <v-btn
            class="ml-2"
            icon
            @click="goTo(`paciente/editar-paciente/${item.id}`)"
          >
            <v-icon small>
              mdi-pencil
            </v-icon>
          </v-btn>
          <v-btn class="ml-2" icon @click="handleDeletePaciente(item)">
            <v-icon small>
              mdi-delete
            </v-icon>
            <v-dialog v-model="dialog" width="500" height="400">
              <v-card>
                <v-card-title>
                  Desejar Realmente Remover o paciente ?
                </v-card-title>
                <v-card-actions>
                  <v-btn @click="dialog = false">
                    Cancelar
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn @click="deletePaciente(item)">
                    Confirmar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
  import { db } from "../../../firebase";
  import { routerMixin, efireMixin } from "@/mixins";
  import ETitle from "../../../shared/components/ETitle.vue";
  import { PACIENTES } from "../../../constants";
  export default {
    components: { ETitle },
    mixins: [routerMixin, efireMixin],
    firestore: {
      pacientes: db.collection("pacientes"),
    },
    methods: {
      handleDeletePaciente() {
        this.dialog = true;
      },
      async deletePaciente(paciente) {
        await db
          .collection(PACIENTES)
          .doc(paciente.id)
          .delete();
        this.dialog = false;
      },
    },
    data: () => ({
      dialog: false,
      header: [
        {
          text: "Nome",
          value: "nome",
        },
        {
          text: "Genero",
          value: "genero",
        },
        { text: "Cpf", value: "cpf" },
        {
          text: "Ações",
          value: "acoes",
        },
      ],
    }),
  };
</script>

<style></style>
