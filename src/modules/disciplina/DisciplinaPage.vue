<template>
  <disciplinas></disciplinas>
</template>

<script>
  import Disciplinas from "../configuracoes/pages/Disciplinas.vue";
  export default {
    components: { Disciplinas },
    name: "DisciplinaPage",
    data: () => ({
      disciplinas: [],
    }),
  };
</script>

<style scoped></style>
