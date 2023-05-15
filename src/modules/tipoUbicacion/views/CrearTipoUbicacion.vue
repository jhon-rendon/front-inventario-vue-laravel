<template>
  <section class="tables">
    <div class="page-header">
      <h3 class="page-title">
        REGISTRO TIPO DE UBICACIÓN
      </h3>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0);">Tipo de Ubiación</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Registrar Tipo de Ubicación
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
                <label>Tipo</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Ingrese el Tipo"
                  v-model="tipoUbicacion.tipo"
                />
                <div class="is-invalid" v-if="errors.tipo">{{ errors.tipo[0] }}</div>
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
  name: "CrearTipoUbicacion",

  data() {
        return {
          tipoUbicacion :{
            tipo  : null,
          },
          message   : null,
          errors    : {}
        }
    },

    methods: {

        async registrar () {

            let tipo        = this.tipoUbicacion.tipo;
           
            this.message = ''
            this.error   = {}
            
            try {
                
                const { data: resp }  = await ApiPublic.post('/tipo-ubicacion',{ tipo  });
                const { message }     = resp;
                this.message  = message;

                this.limpiarCampos()
               
            } catch ( error ){

               this.message = error.response.data.message
               this.errors  = error.response.data.errors
            }
        },
        limpiarCampos(){
            this.tipoUbicacion = {
                tipo : null,
            }
            this.errors = {}
        },
       
    }
};
</script>

<style setup>
.is-invalid{
    color:brown
}

select{
  width: 300px !important;
}

</style>
