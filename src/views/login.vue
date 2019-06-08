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
          <p class="text-muted ml-1 mt-1" @click="showModal = true">
            Olvidaste tu password ?
          </p>
        </div>
        <div class="modal d-inline" v-if="showModal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Recupera tu password</h5>
                <button type="button" class="close" @click="showModal = false">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form novalidate @submit.prevet="submitModal">
                <div class="modal-body">
                  <label>Mail</label>
                  <input type="email" class="form-control" v-model="recpass" />
                </div>
                <div class="modal-footer">
                  <button type="submit" class="btn btn-primary">Enviar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div
          class="alert alert-danger alert-dismissible position-fixed centro"
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
import { setTimeout } from "timers";
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
      error: "",
      showModal: false,
      recpass: ""
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
          (this.alertPass = true),
          setTimeout(() => (this.alertPass = false), 3000)
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
            setTimeout(() => (this.alertPass = false), 3000);
          });
      }
    },
    checkUser: function() {
      let a = this.usuarios.find(user => user.id == this.user);
      if (a == undefined) {
        this.alertUser = true;
        setTimeout(() => (this.alertUser = false), 3000);
        this.user = "";
      }
    },
    checkMail: function() {
      let a = this.usuarios.find(user => user.mail == this.mail);
      if (a == undefined) {
        this.alertMail = true;
        setTimeout(() => (this.alertMail = false), 3000);
        this.mail = "";
      }
    },
    submitModal: function() {
      let actionCodeSettings = {
        url: "http://localhost:8080/#/login",
        handleCodeInApp: false
      };
      firebase.auth().sendPasswordResetEmail(this.recpass, actionCodeSettings);
      this.showModal = false;
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
.centro {
  left: 0;
  right: 0;
  z-index: 2;
  top: 50%;
  margin: auto;

  width: 500px;
  height: 50px;
}
</style>
