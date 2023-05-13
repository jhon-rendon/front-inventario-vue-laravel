<template>
  <section class="tables">
    <div class="page-header">
      <h3 class="page-title">
        REGISTRO DE MARCA
      </h3>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0);">Marcas</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Registrar Marca
          </li>
        </ol>
      </nav>
    </div>
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <!---<h4 class="card-title">Registro de Marca</h4>-->
            <form @submit.prevent="registrar">
              <div class="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Ingrese el Nombre"
                  v-model="marcas.nombre"
                />
                <div class="is-invalid" v-if="errors.nombre">{{ errors.nombre[0] }}</div>
              </div>

              <div class="form-group">
                <label>Descripción</label>
                <textarea class="form-control" 
                          placeholder="Ingrese la descripcion"
                          v-model="marcas.descripcion"></textarea>
                <div class="is-invalid" v-if="errors.descripcion"> {{ errors.descripcion[0] }}</div>
              </div>
              
              <button type="submit" class="btn btn-primary">Crear</button>
            </form>

            <div v-if="message">
                    {{ message }}
            </div>
          
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
 
//import ApiPrivate from '@/api/ApiPrivate'
import ApiPublic from '@/api/ApiPublic'

export default {
  name: "CrearMarca",

  data() {
        return {
            marcas :{
                nombre      : null,
                descripcion : null
            },
            message : null,
            errors  : {}
        }
    },

    methods: {

        async registrar () {

            let nombre      = this.marcas.nombre;
            let descripcion = this.marcas.descripcion;

            this.message = ''
            this.error   = {}
            
            try {
                
                const { data: resp }  = await ApiPublic.post('/marcas',{ nombre, descripcion });
                const { message }     = resp;
                this.message  = message;

                this.limpiarCampos()
               
            } catch ( error ){

               this.message = error.response.data.message
               this.errors  = error.response.data.errors
              console.log( this.errors.nombre[0]);
            }
        },
        limpiarCampos(){
            this.marcas = {
                nombre: null,
                descripcion:null
            },
            this.errors = {}
        }
       
    }
};
</script>

<style setup>
.is-invalid{
    color:brown
}
</style>
