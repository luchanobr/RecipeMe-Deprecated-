<template>
  <div class="container">
    <div class="jumbotron rec mt-5">
      <h1
        class="up col-4 offset-4 d-flex justify-content-center align-items-center"
      >
        Registrarse
      </h1>

      <form @submit.prevent="submit" novalidate>
        <div class="form-row">
          <div class="form-group col-6">
            <label for>Usuario</label>
            <input
              type="text"
              class="form-control"
              placeholder="ejemplo1234"
              v-validate="'required|alpha_dash'"
              name="userInput"
              v-model="newUser.name"
              @blur="checkUsuer"
            />
            <div
              class="alert alert-danger alert-dismissible fade show"
              v-if="alertUser"
            >
              Usuario ya registrado !
              <button
                type="button"
                class="close"
                @click="alertUser = !alertUser"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <small
              id="helpId"
              class="form-text text-danger"
              v-for="error in errors.collect('userInput')"
              >{{ error }}</small
            >
          </div>
          <div class="form-group col-6">
            <label for>Email</label>
            <input
              type="email"
              class="form-control"
              placeholder="ejem@ejem.com"
              v-validate="'required|email'"
              name="mailInput"
              v-model="newUser.mail"
              @blur="checkMail"
            />
            <div
              class="alert alert-danger alert-dismissible fade show"
              v-if="alertMail"
            >
              Mail ya registrado !
              <button
                type="button"
                class="close"
                @click="alertMail = !alertMail"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <small
              id="emailHelpId"
              class="form-text text-danger"
              v-for="error in errors.collect('mailInput')"
              >{{ error }}</small
            >
          </div>
        </div>

        <div class="form-row">
          <div class="form-group col-6">
            <label for>Password</label>
            <input
              type="password"
              class="form-control"
              name="passwordInput"
              v-validate="'confirmed:checkPassword|required'"
              v-model="newUser.password"
              ref="password"
            />
            <small
              id="emailHelpId"
              class="form-text text-danger"
              v-for="error in errors.collect('passwordInput')"
              >{{ error }}</small
            >
          </div>

          <div class="form-group col-6">
            <label for>Confirmar password</label>
            <input
              type="password"
              class="form-control"
              name="checkPasswordInput"
              v-validate="'confirmed:password|required'"
              ref="checkPassword"
            />
            <small
              id="emailHelpId"
              class="form-text text-danger"
              v-for="error in errors.collect('checkPasswordInput')"
              >{{ error }}</small
            >
          </div>
        </div>
        <div class="form-row">
          <label class="form-check-label ml-3 mb-3">
            <input
              class="form-check-input"
              type="checkbox"
              v-model="condiciones"
            />
            acepto terminos y condiciones.
          </label>
        </div>

        <div class="form-row">
          <button
            type="submit"
            class="btn btn-primary btn-lg ml-3"
            :class="{ disabled: !condiciones }"
            :disabled="errors.any() && !condiciones"
          >
            Registrarse
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { db } from "../db";
// eslint-disable-next-line no-unused-vars
import firebase from "firebase";

export default {
  name: "registro",

  data() {
    return {
      newUser: {
        name: "",
        mail: "",
        password: ""
      },
      condiciones: false,
      usuarios: [],
      alertUser: false,
      alertMail: false
    };
  },

  firestore: {
    usuarios: db.collection("usuarios")
  },

  methods: {
    checkUsuer: function() {
      this.usuarios.find(user => {
        if (user.id == this.newUser.name) {
          this.newUser.name = "";
          console.log("usuario registrado");
          this.alertUser = true;
        }
      });
    },

    checkMail: function() {
      this.usuarios.find(user => {
        if (user.mail == this.newUser.mail) {
          (this.newUser.mail = ""), console.log("Mail ya registrado");
          this.alertMail = true;
        }
      });
    },

    submit: function() {
      db.collection("usuarios")
        .doc(this.newUser.name)
        .set({
          mail: this.newUser.mail
        });
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.newUser.mail,
          this.newUser.password
        )
        .then(cred => {
          this.$router.push({
            name: "perfil",
            params: { usuario: this.newUser.name }
          });
        })
        .catch(err => {
          alert(err.message);
        });
    }
  }
};
</script>

<style scoped>
.up {
  margin-top: -7rem;
  border: 2px solid #333;
  border-radius: 555px 25px 15px 25px/25px 5px 35px 555px;
  height: 5rem;
  color: white;
  background-color: #333;
}
.rec {
  margin-top: 7rem !important;
}
</style>
