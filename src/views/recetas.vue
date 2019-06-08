<template>
  <div>
    <div class="row mt-5">
      <receta
        v-for="receta in recetas"
        :receta="receta"
        :key="receta.id"
        class="col-4"
      ></receta>
    </div>
  </div>
</template>

<script>
import receta from "../components/receta.vue";
import { db } from "../db";

export default {
  components: { receta },
  data() {
    return {
      recetas: []
    };
  },
  firestore: {
    recetas: db.collection("recetas")
  }
};
</script>

<style></style>
