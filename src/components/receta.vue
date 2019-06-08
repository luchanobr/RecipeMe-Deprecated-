<template>
  <div class="">
    <div class="card">
      <h3 class="card-header">{{ receta.titulo }}</h3>
      <div class="card-body">
        <h5 class="card-title">Creada por: {{ receta.autor }}</h5>
        <h6 class="card-subtitle text-muted">Rating</h6>
      </div>
      <img
        style="height: 200px; width: 100%; display: block;"
        :src="receta.img"
        alt="Card image"
      />
      <div class="card-body">
        <h5 class="card-title">Preparación</h5>
        <p class="card-text">{{ receta.preparacion }}</p>
      </div>
      <h5 class="card-title ml-3">Ingredientes:</h5>
      <ul class="list-group list-group-flush">
        <li
          class="list-group-item"
          v-for="ingrediente in receta.ingredientes"
          :key="ingrediente.id"
        >
          {{ ingrediente }}
        </li>
      </ul>
      <div class="card-footer text-muted">
        Tiempo: {{ receta.tiempo }} mins. Dificultad: {{ receta.dificultad }}.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["receta"]
};
</script>

<style scope>
.card-header {
  color: white;
  background-color: #333;
}
</style>
