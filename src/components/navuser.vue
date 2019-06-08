<template>
  <div>
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <router-link
          :to="`/user/${usuario}`"
          exact
          active-class="nav-item-active active"
          class="nav-link"
          data-toggle="tab"
          >Mi Perfil</router-link
        >
      </li>
      <li class="nav-item">
        <router-link
          :to="`/user/${usuario}/myrecipes`"
          class="nav-link"
          data-toggle="tab"
          exact
          active-class="nav-item-active active"
          >Mis Recetas</router-link
        >
      </li>
      <li class="nav-item">
        <router-link
          :to="`/user/${usuario}/newrecipe`"
          class="nav-link"
          data-toggle="tab"
          exact
          active-class="nav-item-active active"
          >Nueva receta</router-link
        >
      </li>
      <li class="nav-item dropdown disable">
        <a
          class="nav-link dropdown-toggle"
          data-toggle="dropdown"
          href="#"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
          >Settings</a
        >
        <div class="dropdown-menu">
          <a class="dropdown-item">Action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item">Another action</a>
          <div class="dropdown-divider"></div>
          <button type="button" class="dropdown-item" @click="logout">
            <i class="fa fa-user-times" aria-hidden="true"></i> Logout
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  props: ["usuario"],
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("/login");
        });
    }
  }
};
</script>

<style lang="ss" scoped></style>
