<template>
  <div>
    <div class="row mt-5 pt-4">
      <div class="col-md-8 jumbotron p-4">
        <h1
          class="up col-6 offset-3 d-flex justify-content-center align-items-center"
        >
          Nueva Receta
        </h1>
        <form novalidate @submit.prevent="submit" class="mt-4">
          <div class="form-group row">
            <label for="colFormLabel" class="col-sm-2 col-form-label-lg"
              >Titulo</label
            >
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                v-model="receta.titulo"
                v-validate="'required|min:2'"
              />
            </div>
          </div>
          <div class="form-group row">
            <label for="colFormLabel" class="col-sm-2 col-form-label-lg"
              >Imagen URL</label
            >
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                v-model="receta.img"
                v-validate="{ url: { require_protocol: true }, required }"
              />
            </div>
          </div>

          <div class="form-group row">
            <label for="colFormLabel" class="col-sm-2 col-form-label-lg"
              >Preparación</label
            >
            <div class="col-sm-10">
              <textarea
                class="form-control"
                v-model="receta.preparacion"
                v-validate="'required|min:2'"
              />
            </div>
          </div>
          <div class="row form-group">
            <label for="colFormLabel" class="col-sm-2 col-form-label-lg"
              >ingredientes:</label
            >
            <ul class="list-group col bg-light mx-3">
              <div class="row d-flex justify-content-around my-3">
                <i
                  class="fa fa-plus-circle fa-2x"
                  aria-hidden="true"
                  @click="agregarIng"
                ></i>
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="quitarIng"
                >
                  <i class="fa fa-minus-circle" aria-hidden="true"></i>
                </button>
              </div>
              <li
                v-for="(ingrediente, index) in receta.ingredientes"
                class="list-group-item list-group-item-action"
                :key="ingrediente.id"
              >
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    v-model="receta.ingredientes[index]"
                    v-validate="'required|min:2'"
                  />
                  <div class="input-group-append">
                    <button
                      class="btn btn-primary"
                      type="button"
                      @click="receta.ingredientes.splice(index + 1, 0, '')"
                    >
                      <i class="fa fa-plus-circle" aria-hidden="true"></i>
                    </button>
                    <button
                      class="btn btn-outline-primary"
                      type="button"
                      @click="receta.ingredientes.splice(index, 1)"
                    >
                      <i class="fa fa-times-circle" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="form-group row">
            <label for="colFormLabel" class="col-sm-2 col-form-label-lg"
              >Dificultad</label
            >
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                v-model="receta.skill"
                v-validate="'required|max:20'"
              />
            </div>
          </div>
          <div class="form-group row">
            <label for="colFormLabel" class="col-sm-2 col-form-label-lg"
              >tiempo</label
            >
            <div class="col-sm-10">
              <div class="row ml-0">
                <input
                  type="text"
                  min="0"
                  class="form-control col-3"
                  v-model="receta.tiempo"
                  v-validate="'numeric|required'"
                />
                <input
                  type="range"
                  class="form-control-range col-8 mx-3"
                  min="1"
                  max="120"
                  v-model="receta.tiempo"
                />
              </div>
            </div>
          </div>
          <div class="form-group row">
            <button
              type="submit"
              class="btn btn-primary col-6 offset-3 text-center btn-block"
              :disabled="errors.any() || receta.titulo == ''"
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <div class="col-md-4">
        <receta :receta="receta"></receta>
      </div>
    </div>
  </div>
</template>

<script>
import receta from "../components/receta";
import { db } from "../db";
export default {
  props: {
    usuario: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      receta: {
        titulo: "",
        autor: "",
        img: "",
        dificultad: "",
        tiempo: 0,
        preparacion: "",
        ingredientes: [""]
      },
      userData: {}
    };
  },
  components: {
    receta
  },
  methods: {
    agregarIng: function() {
      this.receta.ingredientes.push("");
    },
    quitarIng: function() {
      if (this.receta.ingredientes.length > 1) {
        this.receta.ingredientes.pop();
      } else return;
    },
    submit: function() {
      db.collection("recetas")
        .doc()
        .set(this.receta)
        .then(() => {
          console.log("receta creada");
        });
    },
    getUser: function() {
      this.receta.autor = this.usuario;
    }
  },
  mounted() {
    this.getUser();
  }
};
</script>

<style lang="css" scoped>
.up {
  margin-top: -4rem;
  border: 2px solid #333;
  border-radius: 555px 25px 15px 25px/25px 5px 35px 555px;
  height: 5rem;
  color: white;
  background-color: #333;
}
input[type="range"]::-webkit-slider-thumb {
  background-color: black;

}
input[type="range"]::-moz-range-thumb {
  background-color: black;
  height: 1.3rem;
  width: 0.5rem;
}
input[type="range"]::-moz-range-track {
  background-color: grey;
}
</style>
