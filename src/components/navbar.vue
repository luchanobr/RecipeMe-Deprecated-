<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <router-link to="/" class="navbar-brand">
        <i class="fa fa-lemon-o"></i> RecipeMe
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor01"
        aria-controls="navbarColor01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav mr-auto d-flex justify-content-center flex-grow-1">
          <li class="nav-item">
            <router-link to="/" exact active-class="nav-item-active" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" exact active-class="nav-item-active" class="nav-link">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/registro"
              exact
              active-class="nav-item-active"
              class="nav-link"
            >Registrarse</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/allrecipes" exact active-class="nav-item-active" class="nav-link">Recetas</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" exact active-class="nav-item-active" class="nav-link">Nosotros</router-link>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="text" placeholder="Search">
          <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>