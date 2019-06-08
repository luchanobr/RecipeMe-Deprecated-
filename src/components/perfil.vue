<template>
  <div class="jumbotron mt-5">
    <navuser :usuario="usuario" />
    <router-view></router-view>

  </div>
</template>

<script>
import navuser from "../components/navuser";
import firebase from "firebase";
import { db } from "../db";
import { nearer } from "q";

export default {
  props: ["usuario"],
  components: {
    navuser
  },
  beforeRouteEnter(to, from, next) {
    let name = to.params.usuario;
    let user = firebase.auth().currentUser;
    let email = user.email;
    db.collection("usuarios")
      .where("mail", "==", email)
      .get()
      .then(qsnap => {
        qsnap.forEach(doc => {
          let usuario = doc.id;
          if (usuario !== name) {
            next("/login");
          } else next();
        });
      });
  },
  beforeRouteUpdate (to, from, next) {
    let name = to.params.usuario;
    let user = firebase.auth().currentUser;
    let email = user.email;
    db.collection("usuarios")
      .where("mail", "==", email)
      .get()
      .then(qsnap => {
        qsnap.forEach(doc => {
          let usuario = doc.id;
          if (usuario !== name) {
            next("/login");
          } else next();
        });
      });
  }
};
</script>

<style lang="scss" scoped></style>
