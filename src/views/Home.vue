<template>
  <div class="container">
    <div class="jumbotron mt-5">
      <h1 class="display-3">RecipeMe</h1>
      <p class="lead">Tu app para guardar y compartir todas tus recetas.</p>
      <hr class="my-4" />
      <p>
        Comenza ya en RecipeMe y subi todas tus recetas y compartir con tus
        amigos.
      </p>
      <p class="lead">
        <router-link class="btn btn-primary btn-lg" to="/login" role="button"
          >Start Now !</router-link
        >
      </p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "";

export default {
  name: "home",
  components: {}
};
</script>
