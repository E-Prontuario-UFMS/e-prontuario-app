<template>
  <v-container>
    <e-title title="Sugestões" route="/home"></e-title>
    <v-card class="my-5 pa-5">
      <v-card-title>
        Feedback
      </v-card-title>
      <v-card-subtitle>
        Nos envie sua sugestão de como podemos melhorar esse sistema !
      </v-card-subtitle>

      <v-form @submit.prevent="handleFormSubmit" v-model="isFormValid">
        <v-row class="pa-5">
          <v-text-field
            label="Digite seu email"
            outlined
            type="email"
            hint="Ex: joaopiolho@gmail.com"
            v-model="email"
          >
          </v-text-field>
        </v-row>
        <v-row class="px-5">
          <v-textarea
            auto-grow
            outlined
            label="Em que podemos melhorar ?"
            v-model="feedback"
            :rules="[feedbackRules.required]"
          />
        </v-row>
        <v-row class="px-5 py-2" justify="end">
          <v-btn type="submit" color="success" :disabled="!isFormValid">
            Enviar
          </v-btn>
        </v-row>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
  import { mapGetters } from "vuex";
  import { sendFeedback } from "../../../firebase/services/feedback";
  import ETitle from "../../../shared/components/ETitle.vue";
  export default {
    components: { ETitle },
    data: () => ({
      isFormValid: false,
      feedbackRules: {
        required: value => !!value || "Não pode ser vazio.",
      },
      email: "",
      feedback: "",
    }),
    computed: {
      ...mapGetters("login", ["getEmail"]),
    },

    methods: {
      async handleFormSubmit() {
        const { email, feedback } = this;
        const createdAt = new Date();
        await sendFeedback({ email, feedback, createdAt });
      },
    },
    mounted() {
      this.email = this.getEmail;
    },
  };
</script>

<style></style>
