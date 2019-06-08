<template>
  <div class="mt-5">
    <div class="row">
      <receta
        class="col-4"
        :usuario="usuario"
        v-for="receta in recetas"
        :receta="receta"
        :key="receta.id"
      ></receta>
    </div>
  </div>
</template>

<script>
import { db } from "../db";
import receta from "../components/receta";
export default {
  props: {
    usuario: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      recetas: []
    };
  },
  methods: {
    getRecipes: function() {
      this.$bind(
        "recetas",
        db.collection("recetas").where("autor", "==", this.usuario)
      );
    }
  },
  mounted() {
    this.getRecipes();
  },

  components: {
    receta
  }
};
</script>

<style lang="css" scoped></style>
