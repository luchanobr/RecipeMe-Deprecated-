<template>
  <div>
    <div class="jumbotron margin-top">
      <h1
        class="up col-4 offset-4 d-flex justify-content-center align-items-center"
      >
        Login
      </h1>
      <form novalidate @submit.prevent="submit">
        <div class="form-group">
          <label for>Usuario</label>
          <input
            type="text"
            class="form-control"
            v-model="user"
            @blur="checkUser"
          />
        </div>
        <div
          class="alert alert-danger alert-dismissible fade show"
          v-if="alertUser"
        >
          Usuario no registrados !
          <button
            type="button"
            class="close"
            @click="alertUser = !alertUser"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="form-group">
          <label for>Mail</label>
          <input
            type="email"
            class="form-control"
            v-model="mail"
            @blur="checkMail"
          />
        </div>
        <div
          class="alert alert-danger alert-dismissible fade show"
          v-if="alertMail"
        >
          Mail no registrado !
          <button
            type="button"
            class="close"
            @click="alertMail = !alertMail"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="form-group">
          <label for>Password</label>
          <input type="password" class="form-control" v-model="password" />
        </div>
        <div
          class="alert alert-danger alert-dismissible fade show"
          v-if="alertPass"
        >
          {{ error }}
          <button
            type="button"
            class="close"
            @click="alertPass = !alertPass"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="row">
          <div class="col-4 offset-3">
            <button type="submit" class="btn btn-primary btn-lg">
              Ingresar
            </button>
          </div>
          <div class="col-4">
            <router-link to="/registro" class="btn btn-lg btn-outline-primary"
              >Registrarse</router-link
            >
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { db } from "../db";
import firebase from "firebase";
export default {
  name: "login",
  data() {
    return {
      user: "",
      password: "",
      mail: "",
      usuarios: Array,
      alertUser: false,
      alertMail: false,
      alertPass: false,
      error: ""
    };
  },
  firestore: {
    usuarios: db.collection("usuarios")
  },
  methods: {
    submit: function() {
      let y = this.usuarios.find(
        user => user.id == this.user && user.mail == this.mail
      );
      if (y == undefined) {
        return (
          (this.error = "El usuario no corresponde al mail registrado"),
          (this.alertPass = true)
        );
      } else {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.mail, this.password)
          .then(cre => {
            this.$router.push({
              name: "perfil",
              params: { usuario: this.user }
            });
          })
          .catch(err => {
            console.log(err);
            this.error = err.message;
            this.alertPass = true;
          });
      }
    },
    checkUser: function() {
      let a = this.usuarios.find(user => user.id == this.user);
      if (a == undefined) {
        this.alertUser = true;
        this.user = "";
      }
    },
    checkMail: function() {
      let a = this.usuarios.find(user => user.mail == this.mail);
      if (a == undefined) {
        this.alertMail = true;
        this.mail = "";
      }
    }
  }
};
</script>

<style scoped>
.up {
  margin-top: -6rem;
  border: 2px solid #333;
  border-radius: 555px 25px 15px 25px/25px 5px 35px 555px;
  height: 5rem;
  color: white;
  background-color: #333;
}
.margin-top {
  margin-top: 6rem;
}
</style>
